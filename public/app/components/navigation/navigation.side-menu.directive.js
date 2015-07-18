(function() {
  'use strict';
  angular.module('folio.navigation')
    .controller('SideMenuController', ['errorHandlingService', 'authStore', '_', SideMenuController])
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
        controllerAs: 'navbar',
        bindToController: true
      };
  }

  /**
   * Controller which manages the navigation menus on the side nav pane and can receive a sign out command from the user
   * @name folio.navigation.SideMenuController
   * @class
   * @constructor
   * @param {object} errorHandlingService error handling service
   * @param {object} authStore manages the auth token
   * @param {object} _ underscore js library with our custom mixins
   */
  function SideMenuController(errorHandlingService, authStore, _) {
    /**
     * error handling service
     * @property {object}
     * @name folio.navigation.SideMenuController#errorHandlingService
     */
    this.errorHandlingService = errorHandlingService;
    /**
     * auth token management service
     * @property {object}
     * @name folio.navigation.SideMenuController#authStore
     */
    this.authStore = authStore;
    /**
     * underscore js library with our custom mixins
     * @property {object}
     * @name folio.navigation.SideMenuController#_
     */
    this._ = _;
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
     */
    toggleGroup: function(group) {
      if (this.showOptionGroup(group)) {
        this.visibleGroup = null;
      } else {
        this.visibleGroup = group;
      }
    },
    /**
     * Performs several housekeeping tasks when the user intentionally signs out, such as clearing the tokens from
     * session, clearing errors/warnings
     * @method folio.navigation.SideMenuController#signOut
     */
    signOut: function() {
      this.authStore.signOff();
      this.errorHandlingService.clearErrors();
      this.errorHandlingService.clearWarning();
    }
  };
})();
