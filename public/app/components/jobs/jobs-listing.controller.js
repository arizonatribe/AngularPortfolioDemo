(function() {
  'use strict';
  angular.module('folio.jobs')
      .controller('JobsListingController', ['jobsService', JobsListingController]);

  /**
   * JobsListingController Javascript class constructor sets default values for certain members and injects dependencies into the constructed instance
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
