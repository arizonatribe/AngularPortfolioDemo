(function() {
  'use strict';
  var directiveName = 'sideMenu';
  angular.module('folio.navigation')
	.directive(directiveName, ['directiveFactory', SideMenuDirective]);

  /**
   * Directive which renders the side menu navigation pane
   * @name folio.navigation.SideMenuDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @constructor
   * @returns {{restrict: string, templateUrl: string, controller: string, controllerAs: string, bindToController: boolean}}
   */
  function SideMenuDirective(directiveFactory) {
    return directiveFactory(directiveName, 'navigation');
  }
})();
