(function() {
  'use strict';
  var directiveName = 'findJobs';
  angular.module('folio.jobs')
      .directive(directiveName, ['directiveFactory', FindJobsDirective]);

  /**
   * Directive which renders the jobs filter links
   * @name folio.jobs.FindJobsDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function FindJobsDirective(directiveFactory) {
    return directiveFactory(directiveName, 'jobs');
  }
})();
