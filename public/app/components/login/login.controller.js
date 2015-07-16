(function() {
    'use strict';
    angular.module('folio.login')
      .controller('LoginController', ['authService', 'errorHandlingService', 'validationService', 'urlService', 'apiCallHandlerService', '$state', '_', '$rootScope', 'localConfig', '$location', LoginController]);

    /**
     * LoginController Javascript class constructor sets default values for certain members and injects dependencies into the constructed instance
     * @name folio.login.LoginController
     * @class
     * @param {object} authService manages user authentication request to auth API
     * @param {object} errorHandlingService error handling service
     * @param {object} validationService input validation service
     * @param {object} urlService URL parsing and validation service
     * @param {object} apiCallHandlerService manages API calls and throttling of multiple calls
     * @param {object} $state angular $state service from which to obtain 'routing' parameters for ui-router
     * @param {object} _ underscore js library with our custom mixins
     * @param {object} $rootScope angular $rootScope service
     * @param {object} localConfig manages import settings from local config.json
     * @param {object} $location angular window.location wrapper service
     * @constructor
     */
    function LoginController(authService, errorHandlingService, validationService, urlService, apiCallHandlerService, $state, _, $rootScope, localConfig, $location) {

        /**
         * local config file management service
         * @property {object}
         * @name folio.login.LoginController#localConfig
         */
        this.localConfig = localConfig;
        /**
         * user authentication and realms retrieval service
         * @property {object}
         * @name folio.login.LoginController#authService
         */
        this.authService = authService;
        /**
         * underscore js library with our custom mixins
         * @property {object}
         * @name folio.login.LoginController#_
         */
        this._ = _;
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
         * url formatting and validation service
         * @property {object}
         * @name folio.login.LoginController#urlService
         */
        this.urlService = urlService;
        /**
         * api call handling service
         * @property {object}
         * @name folio.login.LoginController#apiCallHandlerService
         */
        this.apiCallHandlerService = apiCallHandlerService;
        /**
         * angular root scope service
         * @property {object}
         * @name folio.login.LoginController#$rootScope
         */
        this.$rootScope = $rootScope;
        /**
         * angular window.location wrapper service
         * @property {object}
         * @name folio.login.LoginController#$location
         */
        this.$location = $location;

        var $this = this;
        /**
         * Parameters obtained from the query string on being "routed" here
         * @name folio.login.LoginController#urlOptions
         * @property {object}
         * @type {object}
         */
        this.urlOptions = $state && $state.params ? _.pick($state.params, 'redirectUrl', 'realm', 'appDisplayName', 'clientId') : {};

        /**
         * If the user provided a client id, use that one for the authentication calls later
         */
        if ($this.urlOptions.clientId) {
            localConfig.setClientId($this.urlOptions.clientId);
        }

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