(function() {
  'use strict';
  var directiveName = 'navToggleButton';
  angular.module('folio.navigation')
    .directive(directiveName, ['directiveFactory', NavToggleButtonDirective]);

  /**
   * Directive which renders the nav menu toggle button component
   * @name folio.navigation.NavToggleButtonDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @constructor
   * @returns {{restrict: string, templateUrl: string, scope: {navMenuToggle: string}, controller: string, controllerAs: string, bindToController: boolean}}
   */
  function NavToggleButtonDirective(directiveFactory) {
    return angular.extend(directiveFactory(directiveName, 'navigation'), {
      scope: {
        navMenuToggle: '=ngModel'
      }
    });
  }
})();
