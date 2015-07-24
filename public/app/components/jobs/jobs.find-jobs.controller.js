(function() {
  'use strict';
  angular.module('folio.jobs')
      .controller('FindJobsController', ['jobsService', 'authStore', 'promiseHandlerService', '_', FindJobsController]);

  /**
   * JobsFilterController supports the {@link folio.jobs.FindJobsDirective|FindJobsDirective} and responds to
   * interactivity by the user related to retrieving jobs or resetting the list of jobs
   * @name folio.jobs.FindJobsController
   * @class
   * @param {object} jobsService manages job requests to jobsService API
   * @param {object} authStore manages the auth token
   * @param {object} promiseHandlerService manages promise returning calls
   * @param {object} _ underscore js library with our custom mixins
   * @constructor
   */
  function FindJobsController(jobsService, authStore, promiseHandlerService, _) {

    /**
     * jobs retrieval service
     * @property {object}
     * @name folio.jobs.FindJobsController#jobsService
     */
    this.jobsService = _.bindAll(jobsService, 'clear', 'getJobs');
    /**
     * auth token management service
     * @property {object}
     * @name folio.login.FindJobsController#authStore
     */
    this.authStore = authStore;
    /**
     * promise handling service
     * @property {object}
     * @name folio.login.FindJobsController#promiseHandlerService
     */
    this.promiseHandlerService = _.bindAll(promiseHandlerService, 'callApi', 'reset');
    /**
     * Basic indicator value used to toggle UI-related functionality based on the status of jobs listing lookup
     * @property {boolean}
     * @name folio.jobs.FindJobsController#jobsLoading
     */
    this.jobsLoading = false;
  }

  FindJobsController.prototype = {
    constructor: FindJobsController,
    /**
     * Clears all authentication form fields and resets the drop down list for the realms
     * @method folio.login.FindJobsController#resetModel
     */
    resetModel: function() {
      this.promiseHandlerService.reset(this.jobsLoading, this.jobsService.clear);
    },
    /**
     * Attempts to authenticate the user against the selected realm and redirects them back to the application
     * (after placing the tokens in session) if successful
     * @method folio.jobs.FindJobsController#fetchJobs
     */
    fetchJobs: function() {
      this.promiseHandlerService.callApi('Jobs', this.jobsLoading, this.jobsService.getJobs);
    }
  };

})();
