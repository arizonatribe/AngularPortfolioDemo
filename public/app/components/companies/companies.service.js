(function() {
  'use strict';
  angular.module('folio.companies')
  .factory('companiesService', ['$q', '_', 'localConfig', 'authStore', '$http', 'errorHandlingService', CompaniesService]);

  /**
  	 * CompaniesService interacts with the `/companies` API endpoint to retrive the listed companies
  	 * @name folio.companies.CompaniesService
  	 * @class
  	 * @param {object} $q angular $q service
  	 * @param {object} _ underscore js library with our custom mixins
  	 * @param {object} localConfig manages import settings from local config.json
  	 * @param {object} authStore manages the auth token
  	 * @param {object} $http angular $http service
  	 * @param {object} errorHandlingService error handling service
  	 * @constructor
  	 */
  function CompaniesService($q, _, localConfig, authStore, $http, errorHandlingService) {

    /**
     * Attempts to retrieve all companies
     * @method folio.companies.CompaniesService#get
     * @returns {deferred.promise|{then, always}} a list of companies
     */
    var getCompanies = function() {
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
            url: config.getQueryStringAPI('companies'),
            headers: { Authorization: 'Bearer ' + _.objectToURI(authModel) },
            timeout: deferredAbort.promise
          });

          promise = request.then(function(response) {
            if (response.data && response.data.Companies && response.data.Companies.length) {
              // Send back any warnings
              if (_.isString(response.data.warning)) {
                apiResponse.WarningField = response.data.warning;
              } else if (_.isArray(response.data.warning) && _.some(response.data.warning, _.isString)) {
                apiResponse.WarningField = _.filter(response.data.warning, _.isString).join('. ');
              }
            }
            angular.extend(apiResponse, {
              Finished: true,
              Companies: _.isArray(response.data.Companies) ? response.data.Companies : []
            });
            $this.companies = apiResponse.Companies;
            deferred.resolve(apiResponse);
          }).catch(function(error) {
            if (error) {
              if (_.isNumber(error.status) && error.status === 0) {
                deferred.reject(errorHandlingService.formatErrorMessage({ErrorField: 'Please contact your system administrator as the companies endpoint does not appear to be listening.'}));
              } else {
                deferred.reject(errorHandlingService.extractMessageFromErrorPromise(error.data, error.status, error.headers));
              }
            } else {
              deferred.reject({ErrorField: 'An error occurred. Please try again, if the problem persists, contact your system administrator as the companies endpoint may be down.'});
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
       * Empties the current list of companies
       * @method folio.companies.CompaniesService#clear
       */
      clear = function() {
        this.companies = [];
      };

    return {
      companies: [],
      getCompanies: getCompanies,
      clear: clear
    };
  }
})();
