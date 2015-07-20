(function() {
  'use strict';
  angular.module('folio.auth')
    .factory('authService', ['$q', '_', 'localConfig', 'authStore', '$http', 'errorHandlingService', 'validationService', AuthService]);

  /**
   * AuthService which attempts to authenticate the user and update the {@link folio.auth.authStore|authStore} if
   * successful
   * @name folio.auth.AuthService
   * @class
   * @param {object} $q angular $q service
   * @param {object} _ underscore js library with our custom mixins
   * @param {object} localConfig manages import settings from local config.json
   * @param {object} authStore manages the auth token
   * @param {object} $http angular $http service
   * @param {object} errorHandlingService error handling service
   * @param {object} validationService input validation service
   * @constructor
   */
  function AuthService($q, _, localConfig, authStore, $http, errorHandlingService, validationService) {

    /**
     * Angular $http service
     * @property {object}
     * @name folio.auth.AuthService#$http
     */
    this.$http = $http;
    /**
     * Angular $q service
     * @property {object}
     * @name folio.auth.AuthService#$q
     */
    this.$q = $q;
    /**
     * auth token management service
     * @property {object}
     * @name folio.auth.AuthService#authStore
     */
    this.authStore = authStore;
    /**
     * underscore js library with our custom mixins
     * @property {object}
     * @name folio.auth.AuthService#_
     */
    this._ = _;
    /**
     * local config file management service
     * @property {object}
     * @name folio.auth.AuthService#localConfig
     */
    this.localConfig = localConfig;
    /**
     * error handling service
     * @property {object}
     * @name folio.auth.AuthService#errorHandlingService
     */
    this.errorHandlingService = errorHandlingService;
    /**
     * basic form input validation service
     * @property {object}
     * @name folio.auth.AuthService#validationService
     */
    this.validationService = validationService;

    var $this = this,
      /**
       * Attempts to authenticate a user by username and password
       * @method folio.auth.AuthService#authenticateUser
       * @param {string} username a string value representing an existing username
       * @param {string} password a string value matching the password value stored in the existing record for this user
       * @returns {deferred.promise|{then, always}} a list of claims associated with this now authenticated user
       */
       authenticateUser = function(username, password) {
            var authModel,
              request = null,
              promise = null,
              apiResponse = {},
              deferred = $this.$q.defer(),
              deferredAbort = $this.$q.defer();

            if (!$this._.every([
                    { name: 'username', value: username },
                    { name: 'password', value: password }
                ],
                  function(field) {
                    return $this.validationService.isValid(field.name, field.value, true, field.rules);
                  })) {

              deferred.reject();
            } else {
              $this.localConfig.getConfigSettings().then(function(config) {
                authModel = $this.authStore.buildAuthModel('password', config.clientId, {
                  username: username,
                  password: password
                });
                request = $this.$http({
                  method: 'POST',
                  url: config.authServerUrl,
                  headers: {
                    Authorization: 'Basic ' + $this._.objectToURI(authModel),
                    'Content-Type': 'application/json'
                  },
                  timeout: deferredAbort.promise
                });

                // Send the Authentication username and password, propagating any error or updating the locally stored token if successful
                promise = request.then(function(response) {
                  if (response.data && response.data.access_token && response.data.refresh_token) {
                    if ($this.authStore.setAuthToken({
                      jwtToken: response.data.access_token,
                      refreshToken: response.data.refresh_token,
                      timeOfAuthentication: $this._.currentMilliseconds(),
                      refreshTokenTimeout: response.data.refresh_token_expires_in,
                      tokenTimeout: response.data.expires_in
                    })) {
                      // Send back any warnings
                      if (response.data.warning) {
                        if ($this._.isString(response.data.warning)) {
                          apiResponse.WarningField = response.data.warning;
                        } else if ($this._.isArray(response.data.warning) && $this._.some(response.data.warning, $this._.isString)) {
                          apiResponse.WarningField = $this._.filter(response.data.warning, $this._.isString).join('. ');
                        }
                      }
                      apiResponse.Finished = true;
                      deferred.resolve(apiResponse);
                    } else {
                      deferred.reject({ErrorField: 'No tokens have been received back from the authentication service. Please contact your system administrator as there may be a problem with the authentication server.'});
                    }
                  } else {
                    if (response.data && response.data.token_type !== 'Bearer') {
                      response.data.ErrorField = 'Authentication Failed';
                      deferred.reject($this.errorHandlingService.formatErrorMessage(response.data));
                    } else {
                      deferred.reject($this.errorHandlingService.extractMessageFromErrorPromise(response.data, response.status, response.headers));
                    }
                  }
                }).catch(function(error) {
                  if (error) {
                    if ($this._.isNumber(error.status) && error.status === 0) {
                      deferred.reject($this.errorHandlingService.formatErrorMessage({ErrorField: 'Please contact your system administrator as the authentication server seems to be down.'}));
                    } else {
                      deferred.reject($this.errorHandlingService.extractMessageFromErrorPromise(error.data, error.status, error.headers));
                    }
                  } else {
                    deferred.reject({ErrorField: 'An error occurred. Please try again, if the problem persists and you believe your credentials are correct contact your system administrator as the authentication server may be down.'});
                  }
                });
              });

              deferred.promise.abort = function() {
                deferredAbort.resolve();
                deferred.resolve();
              };
              deferred.promise.finally(function() {
                deferred.promise.abort = angular.noop;
                deferredAbort = request = promise = null;
              });
            }

            return deferred.promise;
          };

    return {
      authenticateUser: authenticateUser
    };
  }
})();
