(function() {
  'use strict';
  var directiveName = 'companiesListing';
  angular.module('folio.companies')
  .directive(directiveName, ['directiveFactory', CompaniesListingDirective]);

  /**
   * Directive which renders the listed companies
   * @name folio.companies.CompaniesListingDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function CompaniesListingDirective(directiveFactory) {
    return directiveFactory(directiveName, 'companies');
  }
})();
