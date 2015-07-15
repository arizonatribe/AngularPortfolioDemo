(function() {
    'use strict';
    angular.module('folio.config', ['ui.router'])
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