(function() {
  'use strict';
  var directiveName = 'errorMessage';
  angular.module('folio.error')
      .directive(directiveName, ['directiveFactory', ErrorMessageDirective]);

  /**
   * Formats and places the errors or warnings into the DOM
   * @name folio.shared.ErrorMessageHandlerDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @returns {{restrict: string, templateUrl: string, controllerAs: string, controller: string, bindToController: boolean}}
   * @constructor
   */
  function ErrorMessageDirective(directiveFactory) {
    return directiveFactory(directiveName, 'error');
  }
})();
