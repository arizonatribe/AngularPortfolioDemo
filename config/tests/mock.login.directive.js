(function() {
  'use strict';
  angular.module('folio.unit-testing.testUiView', [])
        .directive('testUiView', [function() {
          return {
            restrict: 'E',
            templateUrl: 'components/login/templates/content.template.html',
            controllerAs: 'loginCtrl',
            controller: 'LoginController',
            bindToController: true
          };
        }]);
})();
