(function() {
  'use strict';
  angular.module('folio.jobs')
      .service('jobsService', ['$q', '_', 'localConfig', 'authStore', '$http', 'errorHandlingService', JobsService]);

  /**
   * JobsService interacts with the `/jobs` API endpoint to retrive the listed jobs
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
     * Angular $http service
     * @property {object}
     * @name folio.jobs.JobsService#$http
     */
    this.$http = $http;
    /**
     * Angular $q service
     * @property {object}
     * @name folio.jobs.JobsService#$q
     */
    this.$q = $q;
    /**
     * auth token management service
     * @property {object}
     * @name folio.jobs.JobsService#authStore
     */
    this.authStore = authStore;
    /**
     * underscore js library with our custom mixins
     * @property {object}
     * @name folio.jobs.JobsService#_
     */
    this._ = _;
    /**
     * local config file management service
     * @property {object}
     * @name folio.jobs.JobsService#localConfig
     */
    this.localConfig = localConfig;
    /**
     * error handling service
     * @property {object}
     * @name folio.jobs.JobsService#errorHandlingService
     */
    this.errorHandlingService = errorHandlingService;
    /**
     * Holds the list of jobs returned from the most recent API call
     * @name folio.jobs.jobsService#jobs
     * @default []
     * @property {array}
     * @type {array}
     */
    this.jobs = [];
  }

  JobsService.prototype = {
    constructor: JobsService,
    /**
     * Attempts to retrieve all jobs
     * @method folio.jobs.JobsService#get
     * @returns {deferred.promise|{then, always}} a list of jobs
     */
    getJobs: function() {
      var $this = this,
          authModel,
          request = null,
          promise = null,
          apiResponse = {},
          deferred = $this.$q.defer(),
          deferredAbort = $this.$q.defer();

      $this.localConfig.getConfigSettings().then(function(config) {
        authModel = $this.authStore.buildAuthModel('protected_resource', config.clientId);
        request = $this.$http({
          method: 'GET',
          url: config.getQueryStringAPI('jobs'),
          headers: { Authorization: 'Bearer ' + $this._.objectToURI(authModel) },
          timeout: deferredAbort.promise
        });

        promise = request.then(function(response) {
          if (response.data && response.data.Jobs && response.data.Jobs.length) {
            // Send back any warnings
            if ($this._.isString(response.data.warning)) {
              apiResponse.WarningField = response.data.warning;
            } else if ($this._.isArray(response.data.warning) && $this._.some(response.data.warning, $this._.isString)) {
              apiResponse.WarningField = $this._.filter(response.data.warning, $this._.isString).join('. ');
            }
          }
          angular.extend(apiResponse, {
            Finished: true,
            Jobs: $this._.isArray(response.data.Jobs) ? response.data.Jobs : []
          });
          $this.jobs = apiResponse.Jobs;
          deferred.resolve(apiResponse);
        }).catch(function(error) {
          if (error) {
            if ($this._.isNumber(error.status) && error.status === 0) {
              deferred.reject($this.errorHandlingService.formatErrorMessage({ErrorField: 'Please contact your system administrator as the jobs endpoint does not appear to be listening.'}));
            } else {
              deferred.reject($this.errorHandlingService.extractMessageFromErrorPromise(error.data, error.status, error.headers));
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
    clear: function() {
      this.jobs = [];
    }
  };
})();
