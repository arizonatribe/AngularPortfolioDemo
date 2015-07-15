(function() {
  'use strict';
  angular.module('folio.unit-testing.authService', [])
      .service('authService', ['$q', AuthService]);

  function AuthService($q) {

    this.deferred = $q.defer();
  }

  AuthService.prototype.authenticateUser = angular.noop;
})();
