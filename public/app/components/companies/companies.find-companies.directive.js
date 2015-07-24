(function() {
  'use strict';
  var directiveName = 'findCompanies';
  angular.module('folio.companies')
  .directive(directiveName, ['directiveFactory', FindCompaniesDirective]);

  /**
   * Directive which renders the companies filter links
   * @name folio.companies.FindCompaniesDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function FindCompaniesDirective(directiveFactory) {
    return directiveFactory(directiveName, 'companies');
  }
})();
