(function() {
  'use strict';

  describe('Testing Login Controller functionality', function() {
    var _, _s, $timeout, $scope, authService, authStore, errorHandlingService, urlService, $q, $rootScope, $location, $window, createController, controller, fakeData, $httpBackend, validationService, apiCallHandlerService, authToken;

    beforeEach(function() {
      module('components/login/templates/content.template.html');
      module('components/error/templates/error.template.html');
      module('folio.unit-testing.fakeData');
      module('folio.shared');
      module('folio.auth');
      module('folio.login');
      module('folio.unit-testing.localConfig');
    });

    beforeEach(inject(function(_errorHandlingService_, $injector, _$timeout_, _$window_, _authService_, _urlService_, _authStore_, _urlOptions_, _$rootScope_, _$location_, _$compile_, _$q_, localConfig, _fakeData_, _$httpBackend_, $controller, _validationService_, _apiCallHandlerService_, _identityProviders_) {
      $timeout = _$timeout_;
      authService = _authService_;
      authStore = _authStore_;
      fakeData = _fakeData_;
      $httpBackend = _$httpBackend_;
      $q = _$q_;
      errorHandlingService = _errorHandlingService_;
      apiCallHandlerService = _apiCallHandlerService_;
      validationService = _validationService_;
      $window = _$window_;

      urlService = _urlService_;
      $rootScope = _$rootScope_;
      $location = _$location_;

      _ = $injector.get('_');
      _s = $injector.get('_s');

      $scope = _$rootScope_.$new();

      createController = function(providers, options) {
        return $controller('LoginController', {
          $scope: $scope,
          authService: authService,
          errorHandlingService: errorHandlingService,
          authStore: authStore,
          apiCallHandlerService: apiCallHandlerService,
          validationService: validationService,
          $state: { params: options || _urlOptions_ },
          urlService: urlService,
          _: _,
          $rootScope: $rootScope,
          localConfig: localConfig,
          $location: $location
        });
      };

      authToken = {
        access_token: _.randomString(320, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-'),
        refresh_token: _.generateUUID(),
        refresh_token_expires_in: 900,
        token_type: 'Bearer'
      };

      $httpBackend.whenPOST(fakeData.fakeConfigJson.authServerUrl).respond(authToken);
    }));

    describe('[basic setup]', function() {
      it('Should have several methods', function() {
        controller = createController();
        expect(controller.signIn).toBeDefined();
        expect(controller.resetModel).toBeDefined();
        expect(_.isFunction(controller.signIn)).toBeTruthy();
        expect(_.isFunction(controller.resetModel)).toBeTruthy();
      });

      it('Should have necessary external dependencies', function() {
        controller = createController();
        expect(controller.authService).toBeDefined();
        expect(controller.errorHandlingService).toBeDefined();
        expect(controller.validationService).toBeDefined();
        expect(controller.urlService).toBeDefined();
        expect(controller.apiCallHandlerService).toBeDefined();
        expect(controller._).toBeDefined();
        expect(controller.$rootScope).toBeDefined();
        expect(controller.localConfig).toBeDefined();
        expect(controller.$location).toBeDefined();
        expect(controller.urlOptions).toBeDefined();
      });

      it('Should have additional members', function() {
        controller = createController();
        expect(controller.model).toBeDefined();
        expect(controller.model.username.value).toBeNull();
        expect(controller.model.password.value).toBeNull();
      });
    });

    it('Should reset the login controller model', function() {
      controller = createController();
      spyOn(controller.errorHandlingService, 'clearErrors');
      spyOn(controller.errorHandlingService, 'clearWarning');
      spyOn(controller.apiCallHandlerService, 'cancelAll');

      controller.selectedRealm = { property: 'prop' };
      controller.model = {
        username: {
          value: 'a'
        },
        password: {
          value: 'Amazon1'
        }
      };

      controller.resetModel();

      expect(controller.model.username.value).toBeNull();
      expect(controller.model.password.value).toBeNull();
      expect(controller.errorHandlingService.clearErrors).toHaveBeenCalled();
      expect(controller.errorHandlingService.clearWarning).toHaveBeenCalled();
      expect(controller.apiCallHandlerService.cancelAll).toHaveBeenCalled();
    });

    describe('validation', function() {
      it('Should catch a missing username on sign-in', function() {
        controller = createController();
        expect(controller.errorHandlingService.getErrors()).toEqual([]);
        controller.signIn();
        $timeout.flush();
        expect(_.pluck(controller.errorHandlingService.getErrors(), 'Message')).toEqual(['User Name is missing or blank']);
        controller.model.username.value = '';
        controller.signIn();
        $timeout.flush();
        expect(_.pluck(controller.errorHandlingService.getErrors(), 'Message')).toEqual(['User Name is missing or blank']);
        controller.model.username.value = 101;
        controller.signIn();
        $timeout.flush();
        expect(_.pluck(controller.errorHandlingService.getErrors(), 'Message')).toEqual(['User Name must be alpha-numeric (along with some optional symbols)']);
      });

      it('Should catch a missing password on sign-in', function() {
        controller = createController();
        expect(controller.errorHandlingService.getErrors()).toEqual([]);
        controller.model.username.value = 'me';
        controller.signIn();
        $timeout.flush();
        expect(_.pluck(controller.errorHandlingService.getErrors(), 'Message')).toEqual(['Password is missing or blank']);
        controller.model.password.value = '';
        controller.signIn();
        $timeout.flush();
        expect(_.pluck(controller.errorHandlingService.getErrors(), 'Message')).toEqual(['Password is missing or blank']);
        controller.model.password.value = 101;
        controller.signIn();
        $timeout.flush();
        expect(_.pluck(controller.errorHandlingService.getErrors(), 'Message')).toEqual(['Password must be at least 4 characters long.']);
      });
    });

    describe('sign-in tests', function() {
      it('Should be able to signIn', function() {
        controller = createController();
        controller.model.username.value = 'hardWorker@email.com';
        controller.model.password.value = 'P@ssw0rd';

        controller.signIn();

        $timeout.flush();

        expect(controller.loginLoading).toBe(true);
        expect(controller.errorHandlingService.getErrors()).toEqual([]);
        $httpBackend.flush();
      });

      it('Should be able to signIn and also handle a warning', function() {
        var warningMessage = 'This is a warning',
            controller = createController();

        spyOn(authService, 'authenticateUser').and.callFake(function(user, pass) {
          var deferred = $q.defer();
          deferred.resolve({
            Finished: true,
            WarningField: warningMessage
          });
          return deferred.promise;
        });

        controller.model.username.value = 'not-a-user';
        controller.model.password.value = 'P@ssw04d';

        controller.signIn();

        expect(controller.errorHandlingService.getWarning()).not.toEqual(warningMessage);

        $timeout.flush();

        expect(controller.errorHandlingService.getWarning()).toEqual(warningMessage);
      });

      it('Should throttle calls to signIn', function() {
        controller = createController();
        controller.model.username.value = 'hardWorker@email.com';
        controller.model.password.value = 'P@ssw0rd';

        controller.signIn();
        controller.signIn();

        expect(apiCallHandlerService.anyUnresolvedRequests('Auth')).toBeTruthy();

        $timeout.flush();

        expect(controller.loginLoading).toBe(true);
        expect(controller.errorHandlingService.getErrors()).toEqual([]);
        $httpBackend.flush();
        expect(apiCallHandlerService.anyUnresolvedRequests('Auth')).toBeFalsy();
      });

      it('Should fail to signIn', function() {
        controller = createController();
        controller.model.username.value = 'hardWorker@email.com';
        controller.model.password.value = 'Password';

        spyOn(authService, 'authenticateUser').and.callFake(function(user, password) {
          return $q.reject('Invalid Password');
        });

        controller.signIn();
        $timeout.flush();
        expect(apiCallHandlerService.anyUnresolvedRequests('Auth')).toBeFalsy();
        expect(controller.loginLoading).toBeDefined();
        expect(controller.loginLoading).toBeFalsy();
        expect(controller.errorHandlingService.getErrors()).not.toEqual([]);
      });
    });
  });
})();
