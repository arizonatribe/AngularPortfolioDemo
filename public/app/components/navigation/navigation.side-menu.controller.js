(function() {
  'use strict';
  angular.module('folio.navigation')
      .controller('SideMenuController', [SideMenuController]);

  /**
   * Controller which manages the navigation menus on the side nav pane
   * @name folio.navigation.SideMenuController
   * @class
   * @constructor
   */
  function SideMenuController() {
    /**
     * indication of which group is currently visible (null if none)
     * @property {string|null}
     * @name folio.navigation.SideMenuController#visibleGroup
     */
    this.visibleGroup = null;
  }

  SideMenuController.prototype = {
    constructor: SideMenuController,
    /**
     * Determines if a given filtering/paging/sorting option section on the sidebar menu is visible
     * @method folio.navigation.SideMenuController#showOptionGroup
     * @param {string} group A string value representing the nav menu group to be shown
     * @returns {boolean}
     */
    showOptionGroup: function(group) {
      return this.visibleGroup === group;
    },
    /**
     * Shows or hides a filtering/paging/sorting option section on the sidebar menu
     * @method folio.navigation.SideMenuController#toggleGroup
     * @param {string} group A string value representing the nav menu group to be shown/hidden
     * @returns {boolean} A value indicating whether a given group is now active
     */
    toggleGroup: function(group) {
      if (this.showOptionGroup(group)) {
        this.visibleGroup = null;
      } else {
        this.visibleGroup = group;
      }
      return !!this.visibleGroup;
    }
  };
})();
