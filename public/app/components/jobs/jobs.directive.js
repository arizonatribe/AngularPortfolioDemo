(function() {
  'use strict';
  angular.module('folio.jobs')
      .directive('jobsFilter', [JobsDirective]);

  /**
   * Directive which renders the login/logout controls
   * @name folio.jobs.JobsDirective
   * @class
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function JobsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/jobs/templates/jobs.template.html',
      controller: 'JobsController',
      controllerAs: 'jobsCtrl',
      bindToController: true
    };
  }
})();
