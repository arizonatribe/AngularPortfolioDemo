(function() {
  'use strict';
  var directiveName = 'login';
  angular.module('folio.login')
      .directive(directiveName, ['directiveFactory', LoginDirective]);

  /**
   * Directive which renders the login/logout controls
   * @name folio.login.LoginDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function LoginDirective(directiveFactory) {
    return directiveFactory(directiveName, 'login');
  }
})();
