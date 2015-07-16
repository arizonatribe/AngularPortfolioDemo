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
          $urlRouterProvider.otherwise('/login');

          $stateProvider.state('login', {
              url: '/login',
              views: {
                  content: {
                      templateUrl: 'components/login/templates/content.template.html',
                      controller: 'LoginController',
                      controllerAs: 'loginCtrl'
                  }
              }
          });
      }]);
})();