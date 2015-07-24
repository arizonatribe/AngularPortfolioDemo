(function() {
  'use strict';
  angular.module('folio.companies')
  .controller('FindCompaniesController', ['companiesService', 'authStore', 'promiseHandlerService', '_', FindCompaniesController]);

  /**
   * CompaniesFilterController supports the {@link folio.companies.FindCompaniesDirective|FindCompaniesDirective}
   * and responds to interactivity by the user
   * related to retrieving companies or resetting the list of companies
   * @name folio.companies.FindCompaniesController
   * @class
   * @param {object} companiesService manages company requests to companiesService API
   * @param {object} authStore manages the auth token
   * @param {object} promiseHandlerService manages promise returning calls
   * @param {object} _ underscore js library with our custom mixins
   * @constructor
   */
  function FindCompaniesController(companiesService, authStore, promiseHandlerService, _) {

    /**
     * companies retrieval service
     * @property {object}
     * @name folio.companies.FindCompaniesController#companiesService
     */
    this.companiesService = _.bindAll(companiesService, 'clear', 'getCompanies');
    /**
     * auth token management service
     * @property {object}
     * @name folio.login.FindCompaniesController#authStore
     */
    this.authStore = authStore;
    /**
     * promise handling service
     * @property {object}
     * @name folio.login.FindCompaniesController#promiseHandlerService
     */
    this.promiseHandlerService = _.bindAll(promiseHandlerService, 'callApi', 'reset');
    /**
     * Basic indicator value used to toggle UI-related functionality based on the status of companies listing lookup
     * @property {boolean}
     * @name folio.companies.FindCompaniesController#companiesLoading
     */
    this.companiesLoading = false;
  }

  FindCompaniesController.prototype = {
    constructor: FindCompaniesController,
    /**
     * Clears all authentication form fields and resets the drop down list for the realms
     * @method folio.login.FindCompaniesController#resetModel
     */
    resetModel: function() {
      this.promiseHandlerService.reset(this.companiesLoading, this.companiesService.clear);
    },
    /**
     * Attempts to authenticate the user against the selected realm and redirects them back to the application
     * (after placing the tokens in session) if successful
     * @method folio.companies.FindCompaniesController#fetchCompanies
     */
    fetchCompanies: function() {
      this.promiseHandlerService.callApi('Companies', this.companiesLoading, this.companiesService.getCompanies);
    }
  };
})();
