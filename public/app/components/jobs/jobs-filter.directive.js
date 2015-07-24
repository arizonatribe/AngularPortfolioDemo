(function() {
  'use strict';
  angular.module('folio.jobs')
      .directive('jobsFilter', [JobsFilterDirective]);

  /**
   * Directive which renders the jobs filter links
   * @name folio.jobs.JobsFilterDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function JobsFilterDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/jobs/templates/jobs-filter.template.html',
      controller: 'JobsFilterController',
      controllerAs: 'ctrlJobsFilter',
      bindToController: true
    };
  }
})();
