(function() {
  'use strict';
  angular.module('folio.jobs')
      .directive('listedJobs', [JobsListingDirective]);

  /**
   * Directive which renders the login/logout controls
   * @name folio.jobs.JobsListingDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function JobsListingDirective() {
    return {
      restrict: 'E',
      controller: 'JobsListingController',
      controllerAs: 'jobsLCtrl',
      bindToController: true,
      templateUrl: 'components/jobs/templates/jobs-listing.template.html'
    };
  }
})();
