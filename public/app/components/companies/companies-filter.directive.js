(function() {
  'use strict';
  angular.module('folio.companies')
  .directive('companiesFilter', [CompaniesFilterDirective]);

  /**
   * Directive which renders the companies filter links
   * @name folio.jobs.CompaniesFilterDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function CompaniesFilterDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/companies/templates/companies-filter.template.html',
      controller: 'CompaniesFilterController',
      controllerAs: 'ctrlCompaniesFilter',
      bindToController: true
    };
  }
})();
