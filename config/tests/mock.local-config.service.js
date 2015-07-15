(function() {
  'use strict';
  angular.module('folio.unit-testing.localConfig', ['folio.unit-testing.fakeData'])
      .service('localConfig', ['$q', 'fakeData', LocalConfig]);

  function LocalConfig($q, fakeData) {
    this.fakeData = fakeData;

    this.apiBaseUrl = null;
    this.clientId = null;
    this.authServerUrl = null;
    this.logging = null;

    this.deferred = $q.defer();
  }

  LocalConfig.prototype = {
    constructor: LocalConfig,
    getConfigSettings: function() {
      var $this = this;

      this.deferred.resolve({
        clientId: $this.fakeData.fakeConfigJson.clientId,
        authServerUrl: $this.fakeData.fakeConfigJson.authServerUrl,
        apiBaseUrl: $this.fakeData.fakeConfigJson.apiBaseUrl,
        getQueryStringAPI: function(appendToPath) {
          return this.apiBaseUrl + (appendToPath ? appendToPath : '');
        }
      });

      return this.deferred.promise;
    },
    setClientId: function(id) {
      this.clientId = id;
    }
  };
})();
