(function() {
  'use strict';
  angular.module('folio.jobs')
      .controller('JobsListingController', ['jobsService', JobsListingController]);

  /**
   * JobsListingController which supports the {@link folio.jobs.JobsListingDirective|JobsListingDirective} and provides
   * it with the {@link folio.jobs.JobsService|JobsService}
   * @name folio.jobs.JobsController
   * @class
   * @param {object} jobsService manages job requests to jobsService API
   * @constructor
   */
  function JobsListingController(jobsService) {
    /**
     * jobs retrieval service
     * @property {object}
     * @name folio.jobs.JobsListingController#jobsService
     */
    this.jobsService = jobsService;
  }
})();
