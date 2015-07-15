(function() {
  'use strict';
  angular.module('folio.unit-testing.configFile', [])
        .value('configFile', {
          clientId: '2ECA58ED-4CA2-4AD5-BCAA-3A29834CC3C3',
          authServerUrl: 'http://localhost:3030/auth/oauth2/token',
          apiBaseUrl: 'http://localhost:3030/',
          logging: true,
          getQueryStringAPI: function(appendToPath) {
            return this.apiBaseUrl + (appendToPath ? appendToPath : '');
          }
        });
})();
