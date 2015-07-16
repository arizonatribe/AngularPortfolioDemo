(function() {
  'use strict';
  angular.module('folio.auth')
  /**
   * Auth Token Key used to place into and retrieve token from storage (cookies/localStorage/sessionStorage)
   * @constant
   * @name folio.auth.authTokenKey
   * @type {string}
   */
    .constant('authTokenKey', 'AuthInformation')
    .factory('authStore', ['_', 'storageService', '_s', '$crypto', 'authTokenKey', AuthStore]);

  /**
   * AuthStore Javascript class constructor sets default values for certain members and injects dependencies into the constructed instance
   * @name folio.auth.AuthStore
   * @class
   * @param {object} _ underscore js library with our custom mixins
   * @param {object} storageService wrapper for the angular-local-storage service, meant to make cookie usage more simple
   * @param {object} _s underscore.string library
   * @param {object} $crypto wrapper for the global JSCrypto object
   * @param {string} authTokenKey a constant string value used to retrieve the auth token from storage
   * @returns {{getAuthToken: Function, setAuthToken: Function, getJwtToken: Function, getRefreshToken: Function, isAuthenticated: Function, isTimeLeft: Function, howMuchTimeLeft: Function, resetTokenToDefaults: Function, signOff: Function, buildAuthModel: Function, getAuthTypeFromRequestHeader: Function, getAuthorizationFromRequestHeader: Function, getUpdatedAuthorizationHeader: Function}}
   * @constructor
   */
  function AuthStore(_, storageService, _s, $crypto, authTokenKey) {

    /**
     * wrapper for the angular-local-storage service, meant to make cookie usage more simple
     * @property {object}
     * @name folio.auth.AuthStore#storageService
     */
    this.storageService = storageService;
    /**
     * underscore js library with our custom mixins
     * @property {object}
     * @name folio.auth.AuthStore#_
     */
    this._ = _;
    /**
     * underscore.string library
     * @property {object}
     * @name folio.auth.AuthStore#_s
     */
    this._s = _s;
    /**
     * wrapper for the CryptoJS library
     * @property {object}
     * @name folio.auth.AuthStore#$crypto
     */
    this.$crypto = $crypto;
    /**
     * auth token storage key constant
     * @constant
     * @name folio.auth.AuthStore#authTokenKey
     */
    this.authTokenKey = authTokenKey;

    // ---------------------

    var $this = this,
      /**
       * Default values used to instantiate the auth token managed as a private object by this service
       * @defaults { jwtToken: null, refreshToken: null, timeOfAuthentication: 0, refreshTokenTimeout: 0, tokenTimeout: 0}
       * @type {{jwtToken: null, refreshToken: null, timeOfAuthentication: number, refreshTokenTimeout: number, tokenTimeout: number}}
       * @private
       */
       tokenDefaults = {
            jwtToken: null,
            refreshToken: null,
            timeOfAuthentication: 0,
            refreshTokenTimeout: 0,
            tokenTimeout: 0
          },
          /**
           * The auth token private object managed by this service and synchronizes with the copy of the token placed in storage
           * @type {{}}
           * @private
           */
          authToken = {},
          /**
           * Retrieves local authToken object
           * @method folio.auth.AuthStore#getAuthToken
           * @returns {object} the copy of the auth token managed locally in this singleton service
           */
          getAuthToken = function() {
            return authToken;
          },
          /**
           * Commits an auth token to Local Storage for a given user (call this after having received the token and authentication response back from the authentication API)
           * @method folio.auth.AuthStore#setAuthToken
           * @param {object} tokenObject an object containing the jwtToken, refreshToken and other expected values to be placed into the locally managed copy of the auth token
           * @param {string} [encryptionString] a string value to be used in encrypting the token before placing into storage
           * @param {boolean} [useCookies] a boolean value indicating whether or not to place the token into cookies
           * @returns {boolean} a boolean value indicating whether or not the token passed in has an access and refresh token defined
           */
          setAuthToken = function(tokenObject, encryptionString, useCookies) {
            authToken = angular.copy(tokenObject);
            if ($this._.isBoolean(useCookies) || $this._.isString(encryptionString)) {
              $this.storageService.setItem($this.authTokenKey, authToken, encryptionString, useCookies);
            }
            return !!(tokenObject.jwtToken && tokenObject.refreshToken);
          },
          /**
           * Retrieves the jwtToken
           * @method folio.auth.AuthStore#getJwtToken
           * @returns {null|*|string}
           */
          getJwtToken = function() {
            return authToken.jwtToken;
          },
          /**
           * Retrieves the refreshToken
           * @method folio.auth.AuthStore#getRefreshToken
           * @returns {null|*|string}
           */
          getRefreshToken = function() {
            return authToken.refreshToken;
          },
          /**
           * Checks to see if the user is still authenticated, determining if they have a token and if the expiration on that token has expired yet.
           * The API will make the true determination, rejecting any expired token on subsequent requests, but this is used for the purpose of re-attempting authentication automatically or sending the user back to the login page
           * @method folio.auth.AuthStore#isAuthenticated
           * @param {object} [token=localAuthToke] an auth token on which to check if the user is authenticated (will use the local auth token by default)
           * @param {boolean} [checkAccessTokenInstead] a boolean value indicating whether or not to check time off the access token instead of the refresh token (which is the default)
           * @returns {boolean} a boolean value indicating whether or not the user is authenticated
           */
          isAuthenticated = function(token, checkAccessTokenInstead) {
            if (!token) { token = angular.copy(authToken); }
            return !$this._.isNullOrUndefined(token.jwtToken) &&
              !$this._.isNullOrUndefined(token.refreshToken) &&
              howMuchTimeLeft(token, checkAccessTokenInstead) > 0;
          },
          /**
           * Checks to see if the user's authentication token has passed the time of expiration
           * @method folio.auth.AuthStore#isTimeLeft
           * @param {object} [token=localAuthToke] an auth token on which to check if time is left (will use the local auth token by default)
           * @param {boolean} [checkAccessTokenInstead] a boolean value indicating whether or not to check time off the access token instead of the refresh token (which is the default)
           * @returns {boolean} a boolean value indicating if time is left before the token expires
           */
          isTimeLeft = function(token, checkAccessTokenInstead) {
            return howMuchTimeLeft(token, checkAccessTokenInstead) > 0;
          },
          /**
           * Checks to see how much time is left before the user's token expires
           * @method folio.auth.AuthStore#howMuchTimeLeft
           * @param {object} [token=localAuthToken] an auth token on which to check the time limit (will use the local auth token by default)
           * @param {boolean} [checkAccessTokenInstead] a boolean value indicating whether or not to check time off the access token instead of the refresh token (which is the default)
           * @returns {number} a numeric value indicating how much time is left (in milliseconds) before the given token expires
           */
          howMuchTimeLeft = function(token, checkAccessTokenInstead) {
            if (!token) { token = angular.copy(authToken); }
            if (parseInt(token.timeOfAuthentication, 10) > 0) {
              if (parseInt(token.refreshTokenTimeout, 10) > 0 && !checkAccessTokenInstead) {
                return parseInt(token.refreshTokenTimeout, 10) - ($this._.currentMilliseconds() - parseInt(token.timeOfAuthentication, 10));
              } else if (parseInt(token.tokenTimeout, 10) > 0) {
                return parseInt(token.tokenTimeout, 10) - ($this._.currentMilliseconds() - parseInt(token.timeOfAuthentication, 10));
              }
            }

            return 0;
          },
          /**
           * Sets authToken local object to default values
           * @method folio.auth.AuthStore#resetTokenToDefaults
           */
          resetTokenToDefaults = function() {
            authToken = angular.copy(tokenDefaults);
          },
          /**
           * Flushes out the user's authentication information, removing the token from storage and setting the locally-managed copy of the token to default values
           * @method folio.auth.AuthStore#signOff
           */
          signOff = function() {
            $this.storageService.removeItem($this.authTokenKey);
            resetTokenToDefaults();
          },
          /**
           * Builds an object needed by the API for any service calls, including auth credentials and is driven by the type of grant type value being specified (ie: password, refresh_token, or protected_resource)
           * @method folio.auth.AuthStore#buildAuthModel
           * @param {string} grantType a string value indicating the type of communication desired with the API (ie, "refresh_token", "protected_resource", "password", etc.)
           * @param {string} clientId a string value in GUID format specifically assigned to this client for communication with the API
           * @param {object} [options] additional values to extend the authorization model with, such as username, password, etc. (only required for certain types of communication)
           * @returns {object} an object filled with the values demanded by the API for the specific type of communication with it
           */
          buildAuthModel = function(grantType, clientId, options) {
            var authModel = { };

            if ($this._.isString(grantType) && !$this._s.isBlank(grantType) &&
              $this._.isString(clientId) && clientId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {

              $this._.extend(authModel, {
                grant_type: $this._s.trim(grantType).replace(/ /g, '_').toLowerCase(),
                client_id: clientId.toUpperCase(),
                timestamp: $this._.currentMilliseconds(),
                nonce: $this._.randomString(10, null)
              });

              switch (authModel.grant_type) {
                case 'refresh_token':
                  $this._.extend(authModel, {
                    refresh_token: getRefreshToken()
                  });
                  break;
                case 'protected_resource':
                  $this._.extend(authModel, {
                    access_token: getJwtToken()
                  });
                  break;
              }

              if ($this._.isRealObject(options)) {
                $this._.extend(authModel, options);
              }
            }

            return authModel;
          },
          /**
           * Retrieves the authorization type from an Authorization request header (Basic, Bearer, etc.)
           * @method folio.auth.AuthStore#getAuthTypeFromRequestHeader
           * @param {object} req an HTTP request object from which to find the auth type
           * @returns {string} a string value representing the authorization type (ie, bearer, basic, etc.)
           */
          getAuthTypeFromRequestHeader = function(req) {
            var authorization = req && req.headers && req.headers.Authorization ? $this._s.trim(req.headers.Authorization).split(' ') : '';
            return $this._.isArray(authorization) ? authorization[0] : authorization;
          },
          /**
           * De-Serializes an Authorization header object from an encoded URI into JSON
           * @method folio.auth.AuthStore#getAuthorizationFromRequestHeader
           * @param {object} req an HTTP request object from which to find a deserialized auth header object
           * @returns {object} an authorization header object, deserialized from the request's corresponding header string
           */
          getAuthorizationFromRequestHeader = function(req) {
            var authorization = req && req.headers && req.headers.Authorization ? $this._s.trim(req.headers.Authorization).split(' ') : '',
              authValues = $this._.isArray(authorization) && authorization.length > 1 ? authorization[1].split('&') : [],
              propertyNameAndValue,
              authorizationObject = {};

            authValues.forEach(function(value) {
              propertyNameAndValue = value.split('=');

              if ($this._.isArray(propertyNameAndValue) && propertyNameAndValue.length === 2) {
                if ((!$this._.isNaN(parseInt(propertyNameAndValue[1], 10)) && '' + parseInt(propertyNameAndValue[1], 10) + '' === propertyNameAndValue[1]) ||
                  (!$this._.isNaN(parseFloat(propertyNameAndValue[1] !== 0)) && '' + parseFloat(propertyNameAndValue[1]) + '' === propertyNameAndValue[1])) {
                  if (propertyNameAndValue[1] % 1 === 0) {
                    authorizationObject[propertyNameAndValue[0]] = parseInt(propertyNameAndValue[1], 10);
                  } else {
                    authorizationObject[propertyNameAndValue[0]] = parseFloat(propertyNameAndValue[1]);
                  }
                } else {
                  authorizationObject[propertyNameAndValue[0]] = propertyNameAndValue[1];
                }
              }
            });
            return authorizationObject;
          },
          /**
           * Refreshes the timestamp, nonce, and re-inserts the token values on an http request's Authorization header
           * @method folio.auth.AuthStore#getUpdatedAuthorizationHeader
           * @param {object} requestConfig an HTTP request object from which to parse the auth header
           * @returns {string} a string value representing the serialized authorization header
           */
          getUpdatedAuthorizationHeader = function(requestConfig) {
            var authModel = getAuthorizationFromRequestHeader(requestConfig);

            $this._.extend(authModel, {
              timestamp: $this._.currentMilliseconds(),
              nonce: $this._.randomString(10, null)
            });

            switch (authModel.grant_type) {
              case 'refresh_token':
                $this._.extend(authModel, {
                  refresh_token: getRefreshToken()
                });
                break;
              case 'protected_resource':
                $this._.extend(authModel, {
                  access_token: getJwtToken()
                });
                break;
            }

            return getAuthTypeFromRequestHeader(requestConfig) + ' ' + $this._.objectToURI(authModel);
          };

    /**
     * Instantiates the auth token managed as a private object by this service
     */
    resetTokenToDefaults();

    return {
      getAuthToken: getAuthToken,
      setAuthToken: setAuthToken,
      getJwtToken: getJwtToken,
      getRefreshToken: getRefreshToken,
      isAuthenticated: isAuthenticated,
      isTimeLeft: isTimeLeft,
      howMuchTimeLeft: howMuchTimeLeft,
      resetTokenToDefaults: resetTokenToDefaults,
      signOff: signOff,
      buildAuthModel: buildAuthModel,
      getAuthTypeFromRequestHeader: getAuthTypeFromRequestHeader,
      getAuthorizationFromRequestHeader: getAuthorizationFromRequestHeader,
      getUpdatedAuthorizationHeader: getUpdatedAuthorizationHeader
    };
  }
})();
