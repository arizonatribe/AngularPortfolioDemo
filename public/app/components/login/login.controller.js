(function() {
  'use strict';
  angular.module('folio.login')
    .controller('LoginController', ['authService', 'authStore', 'errorHandlingService', 'validationService', 'apiCallHandlerService', LoginController]);

  /**
   * LoginController Javascript class constructor sets default values for certain members and injects dependencies into the constructed instance
   * @name folio.login.LoginController
   * @class
   * @param {object} authService manages user authentication request to auth API
   * @param {object} authStore manages the auth token
   * @param {object} errorHandlingService error handling service
   * @param {object} validationService input validation service
   * @param {object} apiCallHandlerService manages API calls and throttling of multiple calls
   * @constructor
   */
  function LoginController(authService, authStore, errorHandlingService, validationService, apiCallHandlerService) {

    /**
     * user authentication and realms retrieval service
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
     * error handling service
     * @property {object}
     * @name folio.login.LoginController#errorHandlingService
     */
    this.errorHandlingService = errorHandlingService;
    /**
     * basic form input validation service
     * @property {object}
     * @name folio.login.LoginController#validationService
     */
    this.validationService = validationService;
    /**
     * api call handling service
     * @property {object}
     * @name folio.login.LoginController#apiCallHandlerService
     */
    this.apiCallHandlerService = apiCallHandlerService;

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
  }

  LoginController.prototype = {
    constructor: LoginController,
    /**
     * Clears all authentication form fields and resets the drop down list for the realms
     * @method folio.login.LoginController#resetModel
     */
    resetModel: function() {
      if (!this.loginLoading) {
        this.model.username.value = null;
        this.model.password.value = null;
        this.errorHandlingService.clearErrors();
        this.errorHandlingService.clearWarning();
      }
      this.apiCallHandlerService.cancelAll();
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
     * Attempts to authenticate the user against the selected realm and redirects them back to the application (after placing the tokens in session) if successful
     * @method folio.login.LoginController#signIn
     */
    signIn: function() {
      var $this = this,
        requestId = this.apiCallHandlerService.addNewCall('Auth'),
              authRequestCall = function() {
                $this.loginLoading = true;
                ($this.apiCallHandlerService.queuedCall(true, 'Auth', requestId).ApiRequest = $this.authService.authenticateUser($this.model.username.value, $this.model.password.value)).then(function(data) {
                  if ($this.apiCallHandlerService.anyUnresolvedRequests('Auth')) {
                    if (data) {
                      if (data.WarningField) {
                        $this.errorHandlingService.handleWarning(data.WarningField);
                      }
                      $this.apiCallHandlerService.resolveDeferred({Code: 200}, true, 'Auth', requestId);

                    } else {
                      $this.errorHandlingService.handleErrors({Message: 'An unknown error occurred during authentication.'});
                      $this.apiCallHandlerService.resolveDeferred({Code: 204}, true, 'Auth', requestId);
                    }
                  } else {
                    $this.apiCallHandlerService.rejectDeferred({Code: 204}, true, 'Auth', requestId);
                  }
                }).catch(function(data) {
                  $this.errorHandlingService.handleErrors(data);
                  $this.apiCallHandlerService.rejectDeferred({Code: 501}, true, 'Auth', requestId);
                }).finally(function() {
                  $this.loginLoading = false;
                });
              };

      this.errorHandlingService.clearErrors();

      // If a timeout is active, cancel it (that way only the last one will execute, preventing a bottleneck)
      this.apiCallHandlerService.callMethodAfterTimeoutPlusCancel(300, 'auth', 'Auth', authRequestCall, requestId);
    }
  };

})();
