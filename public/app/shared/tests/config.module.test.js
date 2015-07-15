(function() {
  'use strict';

  describe('[Config module]', function() {
    var configModule;

    beforeEach(function() {
      configModule = angular.module('folio');
    });

    it('Should be registered', function() {
      expect(configModule).toBeDefined();
    });
  });
})();
