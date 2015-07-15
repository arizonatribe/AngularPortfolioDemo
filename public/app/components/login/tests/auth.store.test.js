(function() {
  'use strict';

  describe('[Auth Store]', function() {

    var authStore, _, storageService, $rootScope, fakeData;

    beforeEach(module('folio.unit-testing.fakeData'));
    beforeEach(module('folio.unit-testing.localStorageService'));
    beforeEach(module('folio.auth'));

    beforeEach(inject(function(_authStore_, $injector, _$rootScope_, _storageService_, _fakeData_) {
      authStore = _authStore_;
      $rootScope = _$rootScope_;
      _ = $injector.get('_');
      fakeData = _fakeData_;
      storageService = _storageService_;

      fakeData.fakeToken.timeOfAuthentication = Math.floor((new Date()).valueOf() / 1000);
      authStore.setAuthToken(fakeData.fakeToken);
    }));

    describe('[basic setup]', function() {
      it('Should be defined', function() {
        expect(authStore).toBeDefined();
      });

      it('Should include several methods', function() {
        expect(authStore.getAuthToken).toBeDefined();
        expect(authStore.setAuthToken).toBeDefined();
        expect(authStore.getJwtToken).toBeDefined();
        expect(authStore.getRefreshToken).toBeDefined();
        expect(authStore.isAuthenticated).toBeDefined();
        expect(authStore.isTimeLeft).toBeDefined();
        expect(authStore.howMuchTimeLeft).toBeDefined();
        expect(authStore.resetTokenToDefaults).toBeDefined();
        expect(authStore.signOff).toBeDefined();
        expect(authStore.buildAuthModel).toBeDefined();
        expect(authStore.getAuthTypeFromRequestHeader).toBeDefined();
        expect(authStore.getAuthorizationFromRequestHeader).toBeDefined();
        expect(authStore.getUpdatedAuthorizationHeader).toBeDefined();

        expect(_.isFunction(authStore.getAuthToken)).toBeTruthy();
        expect(_.isFunction(authStore.setAuthToken)).toBeTruthy();
        expect(_.isFunction(authStore.getJwtToken)).toBeTruthy();
        expect(_.isFunction(authStore.getRefreshToken)).toBeTruthy();
        expect(_.isFunction(authStore.isAuthenticated)).toBeTruthy();
        expect(_.isFunction(authStore.isTimeLeft)).toBeTruthy();
        expect(_.isFunction(authStore.howMuchTimeLeft)).toBeTruthy();
        expect(_.isFunction(authStore.resetTokenToDefaults)).toBeTruthy();
        expect(_.isFunction(authStore.signOff)).toBeTruthy();
        expect(_.isFunction(authStore.buildAuthModel)).toBeTruthy();
        expect(_.isFunction(authStore.getAuthTypeFromRequestHeader)).toBeTruthy();
        expect(_.isFunction(authStore.getAuthorizationFromRequestHeader)).toBeTruthy();
        expect(_.isFunction(authStore.getUpdatedAuthorizationHeader)).toBeTruthy();
      });
    });

    it('Should make sure the token default object defines certain properties', function() {
      var tokenDefaults = {
        jwtToken: null,
        refreshToken: null,
        timeOfAuthentication: 0,
        refreshTokenTimeout: 0,
        tokenTimeout: 0
      };

      authStore.resetTokenToDefaults();

      expect(authStore.getAuthToken()).toEqual(tokenDefaults);
    });

    it('should store an auth token and retrieve it successfully', function() {
      // Retrieves the token from mocked local storage
      expect(authStore.getJwtToken()).toEqual(fakeData.fakeToken.jwtToken);
      expect(authStore.getRefreshToken()).toEqual(fakeData.fakeToken.refreshToken);
    });

    it('should stay valid until the timeout expires', function() {
      var token = _.fullClone(authStore.getAuthToken());

      token.refreshTokenTimeout = 900;
      authStore.setAuthToken(token);

      // Verifies the user is authenticated (token hasn't timed out yet)
      expect(authStore.isAuthenticated()).toBeTruthy();
      expect(authStore.isTimeLeft()).toBeTruthy();

      token.refreshTokenTimeout = 0;
      token.tokenTimeout = 0;
      authStore.setAuthToken(token);

      expect(authStore.isAuthenticated()).toBeFalsy();
    });

    it('should build an authentication model', function() {
      var usernamepassword = {username: 'a', password: 'Amazon1'},
      rightNow = Math.floor((new Date()).valueOf() / 1000),
      authModel = authStore.buildAuthModel('password', fakeData.fakeConfigJson.clientId, usernamepassword);

      expect(authModel.timestamp).toBeDefined();
      expect(authModel.nonce).toBeDefined();
      expect(authModel.client_id).toBeDefined();
      expect(authModel.grant_type).toBeDefined();
      expect(authModel.username).toBeDefined();
      expect(authModel.password).toBeDefined();

      expect(authModel.nonce).not.toEqual('');
      expect(/^[0-9a-z]{10}$/i.test(authModel.nonce)).toBeTruthy();

      expect(authModel.client_id).toEqual(fakeData.fakeConfigJson.clientId);
      expect(authModel.grant_type).toEqual('password');
      expect(authModel.username).toEqual(usernamepassword.username);
      expect(authModel.password).toEqual(usernamepassword.password);

      expect(authModel.timestamp).toEqual(rightNow);
    });

    it('should build a refresh token model', function() {
      var rightNow = Math.floor((new Date()).valueOf() / 1000),
      refreshModel = authStore.buildAuthModel('refresh_token', fakeData.fakeConfigJson.clientId);

      expect(refreshModel.timestamp).toBeDefined();
      expect(refreshModel.nonce).toBeDefined();
      expect(refreshModel.client_id).toBeDefined();
      expect(refreshModel.grant_type).toBeDefined();
      expect(refreshModel.refresh_token).toBeDefined();

      expect(refreshModel.nonce).not.toEqual('');
      expect(/^[0-9a-z]{10}$/i.test(refreshModel.nonce)).toBeTruthy();

      expect(refreshModel.client_id).toEqual(fakeData.fakeConfigJson.clientId);
      expect(refreshModel.grant_type).toEqual('refresh_token');

      expect(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(refreshModel.refresh_token)).toBeTruthy();

      expect(refreshModel.timestamp).toEqual(rightNow);
    });

    it('should build a refresh token model', function() {
      var rightNow = Math.floor((new Date()).valueOf() / 1000),
      protectedResourceModel = authStore.buildAuthModel('protected_resource', fakeData.fakeConfigJson.clientId);

      expect(protectedResourceModel.timestamp).toBeDefined();
      expect(protectedResourceModel.nonce).toBeDefined();
      expect(protectedResourceModel.client_id).toBeDefined();
      expect(protectedResourceModel.grant_type).toBeDefined();
      expect(protectedResourceModel.access_token).toBeDefined();

      expect(protectedResourceModel.nonce).not.toEqual('');
      expect(/^[0-9a-z]{10}$/i.test(protectedResourceModel.nonce)).toBeTruthy();

      expect(protectedResourceModel.client_id).toEqual(fakeData.fakeConfigJson.clientId);
      expect(protectedResourceModel.grant_type).toEqual('protected_resource');

      expect(protectedResourceModel.access_token).toEqual(fakeData.fakeToken.jwtToken);

      expect(protectedResourceModel.timestamp).toEqual(rightNow);
    });

    it('should retrieve the auth type from the Authorization header', function() {
      var req = {
        headers: {
          Authorization: 'Bearer querystring=stuff&querystring2=morestuff'
        }
      };

      expect(authStore.getAuthTypeFromRequestHeader(req)).toEqual('Bearer');

      // Fails on empty Authorization headers
      req.headers.Authorization = ' ';
      expect(authStore.getAuthTypeFromRequestHeader(req)).toEqual('');

      // Fails when Authorization header is missing
      delete req.headers.Authorization;
      expect(authStore.getAuthTypeFromRequestHeader(req)).toEqual('');

      // Fails if the request has no headers object
      delete req.headers;
      expect(authStore.getAuthTypeFromRequestHeader(req)).toEqual('');

      // Fails if the request itself is null
      expect(authStore.getAuthTypeFromRequestHeader(null)).toEqual('');
    });

    it('Should de-serialize the authorization header', function() {
      var resourceModel = authStore.buildAuthModel('protected_resource', fakeData.fakeConfigJson.clientId),
				requestConfig = {
  headers: {
            Authorization: 'Basic ' + _.objectToURI(resourceModel),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
				},
				authHeaderObj = authStore.getAuthorizationFromRequestHeader(requestConfig);

      expect(authHeaderObj).not.toBeNull();
      expect(authHeaderObj).toEqual(resourceModel);

      // Assume we are missing the token type if the Authorization header is not space delimited
      requestConfig.headers.Authorization = requestConfig.headers.Authorization.replace(/ /g, '');
      expect(authStore.getAuthorizationFromRequestHeader(requestConfig)).toEqual({});

      // This will not work either because the space is not delimiting two sections of text
      requestConfig.headers.Authorization = 'Basic ';
      expect(authStore.getAuthorizationFromRequestHeader(requestConfig)).toEqual({});

      // Fails on empty Authorization headers
      requestConfig.headers.Authorization = ' ';
      expect(authStore.getAuthorizationFromRequestHeader(requestConfig)).toEqual({});

      // Fails when Authorization header is missing
      delete requestConfig.headers.Authorization;
      expect(authStore.getAuthorizationFromRequestHeader(requestConfig)).toEqual({});

      // Fails if the request has no headers object
      delete requestConfig.headers;
      expect(authStore.getAuthorizationFromRequestHeader(requestConfig)).toEqual({});

      // Fails if the request itself is null
      expect(authStore.getAuthorizationFromRequestHeader(null)).toEqual({});
    });

    it('Should update the authorization header with a fresh timestamp, nonce, and token', function() {
      var refreshModel = authStore.buildAuthModel('refresh_token', fakeData.fakeConfigJson.clientId),
      authHeaderObj,
				requestConfig = {
  headers: {
            Authorization: 'Bearer ' + _.objectToURI(refreshModel)
          }
				};

      // Let a second elapse and update the nonce, timestamp and generate a new refresh_token
      setTimeout(function() {
        requestConfig.headers.Authorization = authStore.getUpdatedAuthorizationHeader(requestConfig);
        authHeaderObj = authStore.getAuthorizationFromRequestHeader(requestConfig);

        expect(authHeaderObj).toBeDefined();
        expect(authHeaderObj).not.toBeNull();

        // Make sure the nonce, timestamp and refresh token are different than on the object that seeded the original request config
        expect(authHeaderObj.timestamp).toBeDefined();
        expect(authHeaderObj.timestamp).not.toEqual(refreshModel.timestamp);
        expect(authHeaderObj.nonce).toBeDefined();
        expect(authHeaderObj.nonce).not.toEqual('');
        expect(authHeaderObj.nonce).not.toEqual(refreshModel.nonce);
        expect(/^[0-9a-z]{10}$/i.test(authHeaderObj.nonce)).toBeTruthy();
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(refreshModel.refresh_token)).toBeTruthy();
        expect(authHeaderObj.timestamp).not.toEqual(refreshModel.timestamp);
        expect(authHeaderObj.timestamp).toBeGreaterThan(refreshModel.timestamp);
      }, 1000);
    });

    afterEach(function() {
      authStore.signOff();
    });
  });
})();
