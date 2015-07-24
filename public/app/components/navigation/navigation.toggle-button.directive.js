(function() {
  'use strict';
  angular.module('folio.navigation')
    .directive('navToggleButton', [NavToggleButtonDirective]);

  /**
   * Directive which renders the nav menu toggle button component
   * @name folio.navigation.NavToggleButtonDirective
   * @class
   * @constructor
   * @returns {{restrict: string, templateUrl: string, scope: {navMenuToggle: string}, controller: string, controllerAs: string, bindToController: boolean}}
   */
  function NavToggleButtonDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/navigation/templates/toggle-button.template.html',
      scope: {
        navMenuToggle: '=ngModel'
      },
      controller: 'NavToggleButtonController',
      controllerAs: 'ctrlNavToggleButton',
      bindToController: true
    };
  }
})();
