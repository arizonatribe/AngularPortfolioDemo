(function() {
  'use strict';
  angular.module('folio.login')
    .controller('LoginController', ['authService', 'authStore', 'validationService', 'promiseHandlerService', LoginController]);

  /**
   * LoginController supports the {@link folio.login.LoginDirective|LoginDirective} and responds to user interactivity
   * related to signing in and out
   * @name folio.login.LoginController
   * @class
   * @param {object} authService manages user authentication request to auth API
   * @param {object} authStore manages the auth token
   * @param {object} validationService input validation service
   * @param {object} promiseHandlerService manages promise returning calls
   * @constructor
   */
  function LoginController(authService, authStore, validationService, promiseHandlerService) {

    /**
     * user authentication retrieval service
     * @property {object}
     * @name folio.login.LoginController#authService
     */
    this.authService = authService;
    /**
     * auth token management service
     * @property {object}
     * @name folio.login.LoginController#authStore
     */
    this.authStore = authStore;
    /**
     * basic form input validation service
     * @property {object}
     * @name folio.login.LoginController#validationService
     */
    this.validationService = validationService;
    /**
     * promise handling service
     * @property {object}
     * @name folio.login.LoginController#promiseHandlerService
     */
    this.promiseHandlerService = promiseHandlerService;

    /**
     * Puts the controller model back to default values (is immediately invoked in the controller's constructor)
     * @method folio.login.LoginController#initializeModel
     */
    this.initializeModel = function() {
      /**
       * Holds the authentication credentials entered by the user (username, password, realm) as well as operational methods like individual field validation and display formatting
       * @name folio.login.LoginController#model
       * @default { username: { value: '' }, password: { value: '' }, realm: { value: '' }}
       * @property {object}
       * @type {object}
       */
      this.model = {
        username: {
          value: null,
          validations: validationService.getValidations('username')
        },
        password: {
          value: null,
          validations: validationService.getValidations('password')
        }
      };
    };
    this.initializeModel();
  }

  LoginController.prototype = {
    constructor: LoginController,
    /**
     * Clears all authentication form fields
     * @method folio.login.LoginController#resetModel
     */
    resetModel: function() {
      this.promiseHandlerService.reset.call(this.promiseHandlerService, this.loginLoading, this.initializeModel.bind(this));
    },
    /**
     * Signs the user out if they are currently signed in
     * @method folio.login.LoginController#signOutIfSignedIn
     * @returns {boolean} Returns true if a signed-in user was successfully signed out
     */
    signOutIfSignedIn: function() {
      return !!this.authStore.isAuthenticated() && this.authStore.signOff() && this.resetModel();
    },
    /**
     * Attempts to authenticate the user against the selected realm and redirects them back to the application
     * (after placing the tokens in session) if successful
     * @method folio.login.LoginController#signIn
     */
    signIn: function() {
      var authUser = this.authService.authenticateUser.bind(
          this.authService, this.model.username.value, this.model.password.value);

      this.promiseHandlerService.callApi('Auth', this.loginLoading, authUser);
    }
  };
})();
