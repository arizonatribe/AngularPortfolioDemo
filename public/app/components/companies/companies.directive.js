(function() {
  'use strict';
  angular.module('folio.companies')
  .directive('companiesFilter', [CompaniesDirective]);

  /**
   * Directive which renders the companies filter links
   * @name folio.jobs.CompaniesDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function CompaniesDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/companies/templates/companies.template.html',
      controller: 'CompaniesController',
      controllerAs: 'compCtrl',
      bindToController: true
    };
  }
})();
