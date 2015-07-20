(function() {
  'use strict';
  angular.module('folio.navigation')
      .controller('NavToggleButtonController', [NavToggleButtonController]);

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
