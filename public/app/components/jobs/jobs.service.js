(function() {
  'use strict';
  angular.module('folio.jobs')
      .factory('jobsService', ['$q', '_', 'localConfig', 'authStore', '$http', 'errorHandlingService', JobsService]);

  /**
   * JobsService interacts with the `/jobs` API endpoint to retrieve the listed jobs
   * @name folio.jobs.JobsService
   * @class
   * @param {object} $q angular $q service
   * @param {object} _ underscore js library with our custom mixins
   * @param {object} localConfig manages import settings from local config.json
   * @param {object} authStore manages the auth token
   * @param {object} $http angular $http service
   * @param {object} errorHandlingService error handling service
   * @constructor
   */
  function JobsService($q, _, localConfig, authStore, $http, errorHandlingService) {

    /**
     * Attempts to retrieve all jobs
     * @method folio.jobs.JobsService#get
     * @returns {deferred.promise|{then, always}} a list of jobs
     */
    var getJobs = function() {
        var $this = this,
          authModel,
          request = null,
          promise = null,
          apiResponse = {},
          deferred = $q.defer(),
          deferredAbort = $q.defer();

        localConfig.getConfigSettings().then(function(config) {
          authModel = authStore.buildAuthModel('protected_resource', config.clientId);
          request = $http({
            method: 'GET',
            url: config.getQueryStringAPI('jobs'),
            headers: {Authorization: 'Bearer ' + _.objectToURI(authModel)},
            timeout: deferredAbort.promise
          });

          promise = request.then(function(response) {
            if (response.data && response.data.Jobs && response.data.Jobs.length) {
              // Send back any warnings
              if (_.isString(response.data.warning)) {
                apiResponse.WarningField = response.data.warning;
              } else if (_.isArray(response.data.warning) && _.some(response.data.warning, _.isString)) {
                apiResponse.WarningField = _.filter(response.data.warning, _.isString).join('. ');
              }
            }
            angular.extend(apiResponse, {
              Finished: true,
              Jobs: _.isArray(response.data.Jobs) ? response.data.Jobs : []
            });
            $this.jobs = apiResponse.Jobs;
            deferred.resolve(apiResponse);
          }).catch(function(error) {
            if (error) {
              if (_.isNumber(error.status) && error.status === 0) {
                deferred.reject(errorHandlingService.formatErrorMessage({ErrorField: 'Please contact your system administrator as the jobs endpoint does not appear to be listening.'}));
              } else {
                deferred.reject(errorHandlingService.extractMessageFromErrorPromise(error.data, error.status, error.headers));
              }
            } else {
              deferred.reject({ErrorField: 'An error occurred. Please try again, if the problem persists, contact your system administrator as the jobs endpoint may be down.'});
            }
          });
        });

        deferred.promise.abort = function() {
          deferredAbort.resolve();
          deferred.resolve();
        };
        deferred.promise.finally(function() {
          deferred.promise.abort = angular.noop;
          deferredAbort = request = promise = null;
        });

        return deferred.promise;
      },
      /**
       * Empties the current list of jobs
       * @method folio.jobs.JobsService#clear
       */
      clear = function() {
        this.jobs = [];
      };

    return {
      jobs: [],
      getJobs: getJobs,
      clear: clear
    };
  }
})();
