(function() {
  'use strict';
  angular.module('folio.navigation')
    .controller('NavToggleButtonController', [NavToggleButtonController])
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
      controllerAs: 'navToggleCtrl',
      bindToController: true
    };
  }

  /**
   * Controller used by the {@link folio.navigation.NavToggleButtonDirective|NavToggleButtonDirective} to toggle the
   * side menu show/hide indicator
   * @name folio.navigation.NavToggleButtonController
   * @class
   * @constructor
   */
  function NavToggleButtonController() { }

  /**
   *  Toggles the watched boolean value and broadcasts to masonry to re-position the bricks on the page
   *  @method folio.navigation.NavToggleButtonController#showHideNavMenu
   */
  NavToggleButtonController.prototype.showHideNavMenu = function() {
    this.navMenuToggle = !this.navMenuToggle;
  };
})();
