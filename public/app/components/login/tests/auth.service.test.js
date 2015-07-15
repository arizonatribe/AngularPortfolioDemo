(function() {
  'use strict';

  describe('[Auth Service]', function() {
    var authService, authStore, localConfig, validationService, errorHandlingService, $timeout, $httpBackend, $http, $q, _, _s, $postMessage, fakeData, $rootScope;

    beforeEach(function() {
      module('folio.unit-testing.fakeData');
      module('folio.shared');
      module('folio.auth');
      module('folio.unit-testing.localConfig');
      module('folio.unit-testing.localStorageService');
      module('folio.unit-testing.errorHandlingService');
      module('folio.unit-testing.authStore');
    });

    beforeEach(inject(function(_authService_, $injector, _$q_, _errorHandlingService_, _$timeout_, _$httpBackend_, _$http_, _localConfig_, _fakeData_, _validationService_, _authStore_, _$rootScope_) {
      authService = _authService_;
      $q = _$q_;
      errorHandlingService = _errorHandlingService_;
      $timeout = _$timeout_;
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      localConfig = _localConfig_;
      validationService = _validationService_;
      authStore = _authStore_;
      fakeData = _fakeData_;
      $rootScope = _$rootScope_;
      _ = $injector.get('_');
      _s = $injector.get('_s');

      authStore.init();
    }));

    describe('[basic setup]', function() {
      it('Should be defined', function() {
        expect(authService).toBeDefined();
      });

      it('Should include several methods', function() {
        expect(authService.authenticateUser).toBeDefined();
        expect(_.isFunction(authService.authenticateUser)).toBeTruthy();
      });
    });

    describe('[authenticateUser()]', function() {
      it('Should confirm the claims are returned when successfully authenticated a user', function() {
        var claims = [];

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(authStore.tokenResponse);

        authService.authenticateUser('a', 'Amazon1', 'www.blackboard.com').then(function(response) {
          claims = response;
        }).catch(function(error) {
          console.error(error);
          expect('promise should not error').toEqual('but return the claims instead');
        });

        $httpBackend.flush();

        expect(claims.ClaimsField).toEqual(_.pluck(fakeData.getItems('claims'), 'Type'));
      });

      it('Should confirm authentication fails when password is missing', function() {
        authService.authenticateUser('hardWorker@email.com').then(function() {
          expect('promise should not succeed').toEqual('but error out instead');
        }).catch(function(error) {
          expect(error).toBeUndefined();
          expect(errorHandlingService.errors.length).toEqual(1);
          expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('Password is missing or blank');
        });
        $timeout.flush();
      });

      it('Should confirm authentication fails when username is missing', function() {
        authService.authenticateUser().then(function() {
          expect('promise should not succeed').toEqual('but error out instead');
        }).catch(function(error) {
          expect(error).toBeUndefined();
          expect(errorHandlingService.errors.length).toEqual(1);
          expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('User Name is missing or blank');
        });
        $timeout.flush();
      });

      it('Should confirm authentication fails when password is too long', function() {
        authService.authenticateUser('hardWorker@email.com', _.randomString(300)).then(function() {
          expect('promise should not succeed').toEqual('but error out instead');
        }).catch(function(error) {
          expect(error).toBeUndefined();
          expect(errorHandlingService.errors.length).toEqual(1);
          expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('Password must be no more than 256 characters long.');
        });
        $timeout.flush();
      });

      it('Should confirm authentication fails when password is too short', function() {
        authService.authenticateUser('hardWorker@email.com', _.randomString(2)).then(function() {
          expect('promise should not succeed').toEqual('but error out instead');
        }).catch(function(error) {
          expect(error).toBeUndefined();
          expect(errorHandlingService.errors.length).toEqual(1);
          expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('Password must be at least 4 characters long.');
        });
        $timeout.flush();
      });

      it('Should confirm authentication fails when username is too long', function() {
        authService.authenticateUser(_.randomString(300), 'P@ssw0rd').then(function() {
          expect('promise should not succeed').toEqual('but error out instead');
        }).catch(function(error) {
          expect(error).toBeUndefined();
          expect(errorHandlingService.errors.length).toEqual(1);
          expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('User Name must be no more than 256 characters long.');
        });
        $timeout.flush();
      });

      it('Should confirm authentication fails when password is invalid', function() {
        authService.authenticateUser('hardWorker@email.com', 'a1@').then(function() {
          expect('promise should not succeed').toEqual('but error out instead');
        }).catch(function(error) {
          expect(error).toBeUndefined();
          expect(errorHandlingService.errors.length).toEqual(1);
          expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('Password must be at least 4 characters long.');
        });
        $timeout.flush();
      });

      it('Should confirm authentication fails when username is invalid', function() {
        authService.authenticateUser('u s e r n a m e',
                    'P@ssw0rd').then(function() {
                      expect('promise should not succeed').toEqual('but error out instead');
                    }).catch(function(error) {
                      expect(error).toBeUndefined();
                      expect(errorHandlingService.errors.length).toEqual(1);
                      expect(_.pluck(errorHandlingService.errors, 'Message')).toContain('User Name must be alpha-numeric (along with some optional symbols)');
                    });
        $timeout.flush();
      });

      it('Should be able to abort a request to authenticate a user', function() {
        var request;

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(authStore.tokenResponse);
        (request = authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd')).then(function(response) {
          expect(response).toBeUndefined();
          expect('promise aborted, which means resolved before needing an $httpBackend.flush()').toEqual('promise aborted, which means resolved before needing an $http.flush()');
        }).catch(function(error) {
          console.error(error);
          expect('promise should not error out').toEqual('but abort instead');
        });

        request.abort();

        expect(request.$$state.status).toEqual(1);
      });

      it('Should fail to authenticate a user if API errors out', function() {
        var failedAuth;

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(500, 'Error on the API authenticating the user');

        authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd').then(function(response) {
                }).catch(function(error) {
                  failedAuth = error;
                }).finally(function() {
                  expect(failedAuth).toBeDefined();
                  expect(failedAuth).not.toBeNull();
                  expect(failedAuth.ErrorField).toBeDefined();
                  expect(failedAuth.ErrorField).not.toBeFalsy();
                });

        $httpBackend.flush();
      });

      it('Should confirm API authentication warnings are handled', function() {
        var claims = [],
            warningMessage = 'She called out a warning',
            claimsWithWarning = _.fullClone(authStore.tokenResponse);

        claimsWithWarning.warning = warningMessage;

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(claimsWithWarning);

        authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd').then(function(response) {
          claims = response;
        }).catch(function(error) {
          console.error(error);
          expect('promise should not error').toEqual('but return the claims instead');
        });

        $httpBackend.flush();

        expect(claims.WarningField).toBeDefined();
        expect(claims.WarningField).toEqual(warningMessage);
      });

      it('Should confirm an array of API authentication warnings are handled', function() {
        var claims = [],
            warningMessage = 'She called out a warning',
            warningMessage2 = 'Dont ever let your life pass you by',
            claimsWithWarning = _.fullClone(authStore.tokenResponse);

        claimsWithWarning.warning = [warningMessage, 19, {prop: 'not a warning'}, warningMessage2];

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(claimsWithWarning);

        authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd').then(function(response) {
          claims = response;
        }).catch(function(error) {
          console.error(error);
          expect('promise should not error').toEqual('but return the claims instead');
        });

        $httpBackend.flush();

        expect(claims.WarningField).toBeDefined();
        expect(claims.WarningField).toEqual(warningMessage + '. ' + warningMessage2);
      });

      it('Should confirm API authentication warnings are not handled when in improper format', function() {
        var claims = [],
            warningMessage = 'called out a warning',
            claimsWithBadWarning = _.fullClone(authStore.tokenResponse);

        claimsWithBadWarning.warning = {Warning: warningMessage};

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(claimsWithBadWarning);

        authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd').then(function(response) {
          claims = response;
        }).catch(function(error) {
          expect('promise should not error').toEqual('but return the claims instead');
        });

        $httpBackend.flush();

        expect(claims.WarningField).toBeUndefined();
      });

      it('Should confirm missing tokens causes the authentication call to be rejected', function() {
        var responseWithoutTokens = _.fullClone(authStore.tokenResponse);

        delete responseWithoutTokens.access_token;
        delete responseWithoutTokens.refresh_token;
        delete responseWithoutTokens.token_type;

        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(responseWithoutTokens);

        authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd').then(function() {
          expect('promise should not resolve').toEqual('but be rejected instead');
        }).catch(function(error) {
          expect(error).toBeDefined();
          expect(error.Message).toBeDefined();
        });

        $httpBackend.flush();

      });

      it('Should confirm the auth tokens are stored after successfully authenticating a user', function() {
        $httpBackend.expectPOST(fakeData.fakeConfigJson.authServerUrl).respond(authStore.tokenResponse);

        authStore.signOff();

        authService.authenticateUser('hardWorker@email.com', 'P@ssw0rd').then(function() {
          expect(authStore.getJwtToken()).toEqual(authStore.tokenResponse.access_token);
        }).catch(function(error) {
          console.error(error);
          expect('promise should not error').toEqual('but return the claims instead');
        });

        expect(authStore.getJwtToken()).toBeNull();

        $httpBackend.flush();
      });
    });
  });
})();
