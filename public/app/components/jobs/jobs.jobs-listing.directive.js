(function() {
  'use strict';
  var directiveName = 'jobsListing';
  angular.module('folio.jobs')
      .directive(directiveName, ['directiveFactory', JobsListingDirective]);

  /**
   * Directive which renders the listed jobs
   * @name folio.jobs.JobsListingDirective
   * @class
   * @param {function} directiveFactory Service that reduces repetitive code in the directive object creation
   * @returns {{restrict: string, controller: string, controllerAs: string, templateUrl: string}}
   * @constructor
   */
  function JobsListingDirective(directiveFactory) {
    return directiveFactory(directiveName, 'jobs');
  }
})();
