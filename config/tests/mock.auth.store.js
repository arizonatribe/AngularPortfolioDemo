(function() {
  'use strict';
  angular.module('folio.unit-testing.authStore', ['folio.unit-testing.localStorageService', 'folio.unit-testing.fakeData'])
    .constant('authTokenKey', 'AuthInformation')
    .service('authStore', ['$window', 'localStorageService', 'fakeData', 'authTokenKey', AuthStore]);

  function AuthStore($window, localStorageService, fakeData, authTokenKey) {

    // External dependencies
    this.localStorageService = localStorageService;
    this.fakeData = fakeData;
    this._ = $window._;
    this._s = $window._.str;

    // ---------------------

    this.tokenDefaults = {
      jwtToken: null,
      refreshToken: null,
      timeOfAuthentication: 0,
      refreshTokenTimeout: 0,
      tokenTimeout: 0
    };

    this.authTokenKey = authTokenKey;
    this.authToken = localStorageService.getItem(this.authTokenKey) || angular.copy(this.tokenDefaults);

    this.tokenResponse = {};
    this.accessToken = '';
    this.authToken = {};
  }

  AuthStore.prototype = {
    constructor: AuthStore,
    init: function() {
      var $this = this;

      this.accessToken = this.fakeData.generateRandomString(320, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-');;
      this.authToken = {
        timestamp: Math.floor((new Date()).valueOf() / 1000),
        nonce: $this.fakeData.generateRandomString(10),
        access_token: $this.accessToken
      };

      this.tokenResponse = {
        access_token: $this.accessToken,
        refresh_token: $this.fakeData.generateUUID(),
        refresh_token_expires_in: 900,
        token_type: 'Bearer',
        claims: $this._.map($this.fakeData.getItems('claims'), function(claim) {
          if ($this._s.isBlank(claim.Value)) {
            claim.Value = 'a';
          }
          return claim;
        })
      };
    },
    getJwtToken: function() {
      return this.authToken.jwtToken;
    },
    signOff: function() {
      this.authToken = angular.copy(this.tokenDefaults);
    },
    setAuthToken: function(tokenObject) {
      this.authToken = tokenObject;
      this.localStorageService.setItem(this.authTokenKey, this.authToken);
      return !!(tokenObject.jwtToken && tokenObject.refreshToken);
    },
    getAuthToken: function() {
      return this.authToken;
    },
    buildAuthModel: function(grantType, clientId, options) {
      var $this = this;
      return $this._.extend(
        $this._.extend($this.authToken, {
          grant_type: grantType,
          client_id: clientId
        }), options);
    }
  };
})();
