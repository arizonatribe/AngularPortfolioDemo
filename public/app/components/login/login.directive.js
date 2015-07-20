(function() {
  'use strict';
  angular.module('folio.login')
      .directive('loginLogout', [LoginDirective]);

  /**
   * Directive which renders the login/logout controls
   * @name folio.login.LoginDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function LoginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/login/templates/login.template.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      bindToController: true
    };
  }
})();
