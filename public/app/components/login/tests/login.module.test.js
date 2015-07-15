(function() {
  'use strict';

  describe('Testing Auth module exists', function() {
    var authModule;

    beforeEach(function() {
      authModule = angular.module('folio.auth');
    });

    it('Should be registered', function() {
      expect(authModule).toBeDefined();
    });
  });

  describe('Testing Login module exists', function() {
    var loginModule;

    beforeEach(function() {
      loginModule = angular.module('folio.login');
    });

    it('Should be registered', function() {
      expect(loginModule).toBeDefined();
    });
  });
})();
