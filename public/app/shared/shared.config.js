(function() {
  'use strict';
  /**
   * Module which performs route configuration
   * @namespace folio.config
   */
  angular.module('folio.config', ['ui.router'])
  /**
   * Sets up state-based routes
   * @method folio.config#config
   */
   .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('/', {
            url: '/',
            views: {
              layout: {
                templateUrl: 'components/navigation/templates/layout.template.html'
              }
            }
          });
      }]);
})();
