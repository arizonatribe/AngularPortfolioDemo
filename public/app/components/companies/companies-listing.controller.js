(function() {
  'use strict';
  angular.module('folio.companies')
  .controller('CompaniesListingController', ['companiesService', CompaniesListingController]);

  /**
   * CompaniesListingController which supports the {@link folio.companies.CompaniesListingDirective|CompaniesListingDirective} and provides
   * it with the {@link folio.companies.CompaniesService|CompaniesService}
   * @name folio.companies.CompaniesController
   * @class
   * @param {object} companiesService manages job requests to companiesService API
   * @constructor
   */
  function CompaniesListingController(companiesService) {
    /**
     * companies retrieval service
     * @property {object}
     * @name folio.companies.CompaniesListingController#companiesService
     */
    this.companiesService = companiesService;
  }
})();
