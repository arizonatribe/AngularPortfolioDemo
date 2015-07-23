(function() {
  'use strict';
  angular.module('folio.companies')
  .directive('listedCompanies', [CompaniesListingDirective]);

  /**
   * Directive which renders the listed companies
   * @name folio.companies.CompaniesListingDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function CompaniesListingDirective() {
    return {
      restrict: 'E',
      controller: 'CompaniesListingController',
      controllerAs: 'compLCtrl',
      bindToController: true,
      templateUrl: 'components/companies/templates/companies-listing.template.html'
    };
  }
})();
