(function() {
  'use strict';
  angular.module('folio.navigation')
	.directive('sideMenu', [SideMenuDirective]);

  /**
   * Directive which renders the side menu navigation pane
   * @name folio.navigation.SideMenuDirective
   * @class
   * @constructor
   * @returns {{restrict: string, templateUrl: string, controller: string, controllerAs: string, bindToController: boolean}}
   */
  function SideMenuDirective() {
    return {
        restrict: 'E',
        templateUrl: 'components/navigation/templates/side-menu.template.html',
        controller: 'SideMenuController',
        controllerAs: 'ctrlSideMenu',
        bindToController: true
      };
  }
})();
