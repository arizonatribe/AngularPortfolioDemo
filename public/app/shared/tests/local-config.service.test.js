(function() {
  'use strict';

  describe('[Local Config Service]', function() {
    var $httpBackend, localConfig, fakeData, _, $rootScope;

    beforeEach(module('folio.unit-testing.fakeData'));
    beforeEach(module('folio.shared'));

    beforeEach(module(function($provide) {
      $provide.value('configPath', 'temp.config.json');
    }));

    beforeEach(inject(function($injector, _$httpBackend_, _localConfig_, _fakeData_, _configPath_, _$rootScope_) {
      $httpBackend = _$httpBackend_;
      localConfig = _localConfig_;
      fakeData = _fakeData_;
      $rootScope = _$rootScope_;
      _ = $injector.get('_');
      $httpBackend.whenGET(_configPath_).respond(fakeData.fakeConfigJson);
    }));

    describe('[basic setup]', function() {
      it('Should be defined', function() {
        expect(localConfig).toBeDefined();
      });

      it('Should include getConfigSettings method', function() {
        expect(localConfig.getConfigSettings).toBeDefined();
        expect(localConfig.setClientId).toBeDefined();
        expect(_.isFunction(localConfig.getConfigSettings)).toBeTruthy();
        expect(_.isFunction(localConfig.setClientId)).toBeTruthy();
      });
    });

    it('Should get the config json file', function() {
      localConfig.getConfigSettings().then(function(config) {
        expect(config.clientId).toEqual(fakeData.fakeConfigJson.clientId);
        expect(config.authServerUrl).toEqual(fakeData.fakeConfigJson.authServerUrl);
        expect(config.apiBaseUrl).toEqual(fakeData.fakeConfigJson.apiBaseUrl);
      }).catch(function(error) {
        expect('should not error out').toEqual('but retrieve config settings instead');
      });

      $httpBackend.flush();
    });

    it('Should change the client id', function() {
      var fakeId = fakeData.generateUUID();

      localConfig.getConfigSettings();

      $httpBackend.flush();

      localConfig.setClientId(fakeId);
      localConfig.getConfigSettings().then(function(config) {
        expect(config.clientId).toEqual(fakeId);
      }).catch(function(error) {
        expect('should not error out').toEqual('but retrieve client id instead');
      });
    });

    afterEach(function() {
      $rootScope.$apply();
    });
  });
})();
