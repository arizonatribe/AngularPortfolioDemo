(function() {
  'use strict';
  angular.module('folio.companies')
  .controller('CompaniesController', ['companiesService', 'authStore', 'promiseHandlerService', '_', CompaniesController]);

  /**
   * CompaniesController supports the {@link folio.companies.CompaniesDirective|CompaniesDirective} and responds to interactivity by the user
   * related to retrieving companies or resetting the list of companies
   * @name folio.companies.CompaniesController
   * @class
   * @param {object} companiesService manages company requests to companiesService API
   * @param {object} authStore manages the auth token
   * @param {object} promiseHandlerService manages promise returning calls
   * @param {object} _ underscore js library with our custom mixins
   * @constructor
   */
  function CompaniesController(companiesService, authStore, promiseHandlerService, _) {

    /**
     * companies retrieval service
     * @property {object}
     * @name folio.companies.CompaniesController#companiesService
     */
    this.companiesService = _.bindAll(companiesService, 'clear', 'getCompanies');
    /**
     * auth token management service
     * @property {object}
     * @name folio.login.CompaniesController#authStore
     */
    this.authStore = authStore;
    /**
     * promise handling service
     * @property {object}
     * @name folio.login.CompaniesController#promiseHandlerService
     */
    this.promiseHandlerService = _.bindAll(promiseHandlerService, 'callApi', 'reset');
    /**
     * Basic indicator value used to toggle UI-related functionality based on the status of companies listing lookup
     * @property {boolean}
     * @name folio.companies.CompaniesController#companiesLoading
     */
    this.companiesLoading = false;
  }

  CompaniesController.prototype = {
    constructor: CompaniesController,
    /**
     * Clears all authentication form fields and resets the drop down list for the realms
     * @method folio.login.CompaniesController#resetModel
     */
    resetModel: function() {
      this.promiseHandlerService.reset(this.companiesLoading, this.companiesService.clear);
    },
    /**
     * Attempts to authenticate the user against the selected realm and redirects them back to the application (after placing the tokens in session) if successful
     * @method folio.companies.CompaniesController#fetchCompanies
     */
    fetchCompanies: function() {
      this.promiseHandlerService.callApi('Companies', this.companiesLoading, this.companiesService.getCompanies);
    }
  };
})();
