(function() {
  'use strict';
  angular.module('folio.error')
      .directive('errorMessageHandler', [ErrorMessageHandlerDirective]);

  /**
   * Formats and places the errors or warnings into the DOM
   * @name folio.shared.ErrorMessageHandlerDirective
   * @class
   * @returns {{restrict: string, templateUrl: string, controllerAs: string, controller: string, bindToController: boolean}}
   * @constructor
   */
  function ErrorMessageHandlerDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/error/templates/error.template.html',
      controllerAs: 'errorCtrl',
      controller: 'ErrorController',
      bindToController: true
    };
  }
})();
