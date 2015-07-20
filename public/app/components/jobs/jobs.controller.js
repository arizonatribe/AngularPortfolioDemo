(function() {
  'use strict';
  angular.module('folio.jobs')
      .controller('JobsController', ['jobsService', 'authStore', 'promiseHandlerService', JobsController]);

  /**
   * JobsController supports the {@link folio.jobs.JobsDirective|JobsDirective} and responds to interactivity by the user
   * related to retrieving jobs or resetting the list of jobs
   * @name folio.jobs.JobsController
   * @class
   * @param {object} jobsService manages job requests to jobsService API
   * @param {object} authStore manages the auth token
   * @param {object} promiseHandlerService manages promise returning calls
   * @constructor
   */
  function JobsController(jobsService, authStore, promiseHandlerService) {

    /**
     * jobs retrieval service
     * @property {object}
     * @name folio.jobs.JobsController#jobsService
     */
    this.jobsService = jobsService;
    /**
     * auth token management service
     * @property {object}
     * @name folio.login.JobsController#authStore
     */
    this.authStore = authStore;
    /**
     * promise handling service
     * @property {object}
     * @name folio.login.JobsController#promiseHandlerService
     */
    this.promiseHandlerService = promiseHandlerService;
  }

  JobsController.prototype = {
    constructor: JobsController,
    /**
     * Clears all authentication form fields and resets the drop down list for the realms
     * @method folio.login.JobsController#resetModel
     */
    resetModel: function() {
      this.promiseHandlerService.reset.call(null, this.jobsLoading, this.jobsService.clear.bind(this.jobsService));
    },
    /**
     * Attempts to authenticate the user against the selected realm and redirects them back to the application (after placing the tokens in session) if successful
     * @method folio.jobs.JobsController#fetchJobs
     */
    fetchJobs: function() {
      this.promiseHandlerService.callApi('Jobs', this.jobsLoading, this.jobsService.getJobs.bind(this.jobsService));
    }
  };

})();
