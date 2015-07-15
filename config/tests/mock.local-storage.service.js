(function() {
  'use strict';
  angular.module('folio.unit-testing.localStorageService', ['folio.unit-testing.storage'])
      .service('localStorageService', ['sessionStoreMock', LocalStorageService]);

  function LocalStorageService(sessionStoreMock) {
    this.sessionStoreMock = sessionStoreMock;
  }

  LocalStorageService.prototype = {
    constructor: LocalStorageService,
    setItem: function(key, payload, encryptionString, useCookies) {
      this.sessionStoreMock.setItem(key, angular.toJson(payload));
    },
    removeItem: function(key) {
      this.sessionStoreMock.removeItem(key);
    },
    getItem: function(key, encryptionString, useCookies) {
      var payload = this.sessionStoreMock.getItem(key);
      if (!payload) {
        return null;
      }
      return angular.fromJson(payload);
    }
  };
})();
