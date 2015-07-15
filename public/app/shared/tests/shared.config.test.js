(function() {
  'use strict';

  describe('[Login Config]', function() {
    var $urlRouterProvider, $stateProvider, $injector, $rootScope, $httpBackend, $state;

    beforeEach(function() {
      module('components/login/templates/content.template.html');
      module('ui.router', function(_$stateProvider_, _$urlRouterProvider_) {
        $stateProvider = _$stateProvider_;
        $urlRouterProvider = _$urlRouterProvider_;
        spyOn($stateProvider, 'state').and.callThrough();
        spyOn($urlRouterProvider, 'otherwise').and.callThrough();
      });
      module('folio.login');
      module('folio.unit-testing.localConfig');
    });

    beforeEach(function() {
      inject(function(_$state_, _$injector_, _$rootScope_, _$httpBackend_) {
        $injector = _$injector_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
      });
    });

    describe('[url route provider]', function() {
      it('Should have registered a route for \'/\'', function() {
        expect($urlRouterProvider.otherwise).toHaveBeenCalled();
      });

      it('Should have registered a route for login', function() {
        expect($stateProvider.state).toHaveBeenCalled();
      });
    });

    describe('[state transitions]', function() {
      it('should respond to URL', function() {
        expect($state.href('login')).toEqual('#/login');
      });

      it('should transition successfully', function() {
        $state.go('login');
        $rootScope.$apply();
        expect($state.current.name).toEqual('login');
      });
    });
  });
})();
