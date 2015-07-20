(function() {
  'use strict';
  angular.module('folio.shared')
      .factory('promiseHandlerService', ['_', 'apiCallHandlerService', 'errorHandlingService', PromiseHandlerService]);

  /**
   * PromiseHandlerService sits on top of the {@link folio.shared.errorHandlingService|errorHandlingService} and the
   * {@link folio.shared.apiCallHandlerService|apiCallHandlerService} to further simplify the interaction with API
   * endpoints through promise-returning services and any associated error handling.
   * @name folio.shared.PromiseHandlerService
   * @class
   * @param {object} _ underscore js library with our custom mixins
   * @param {object} apiCallHandlerService manages API calls and throttling of multiple calls
   * @param {object} errorHandlingService error handling service
   * @constructor
   */
  function PromiseHandlerService(_, apiCallHandlerService, errorHandlingService) {

    /**
     * underscore js library with our custom mixins
     * @property {object}
     * @name folio.shared.PromiseHandlerService#_
     */
    this._ = _;
    /**
     * error handling service
     * @property {object}
     * @name folio.login.PromiseHandlerService#errorHandlingService
     */
    this.errorHandlingService = errorHandlingService;
    /**
     * api call handling service
     * @property {object}
     * @name folio.login.PromiseHandlerService#apiCallHandlerService
     */
    this.apiCallHandlerService = apiCallHandlerService;

    var $this = this,
        /**
         * Resets the error handler and api call handler and additionally executes any resetting/cleanup local to the
         * caller
         * @method folio.shared.promiseHandlerService#reset
         * @param {boolean} [loading] A boolean variable local to the caller which indicates the current status of the
         * promise (which is set by the {@link folio.shared.promiseHandlerService#callApi} method)
         * @param {function} [callback] A callback function that performs cleanup or resetting of variables local to the
         * caller
         */
        reset = function(loading, callback) {
          if (!loading) {
            if ($this._.isFunction(callback)) {
              callback();
            }
            $this.errorHandlingService.clearErrors();
            $this.errorHandlingService.clearWarning();
          }
          $this.apiCallHandlerService.cancelAll();
        },
        /**
         * Abstracts away some of the API call management and error handling performed by the
         * {@link folio.shared.apiCallHandlerService} and {@link folio.error.errorHandlingService}
         * @method folio.shared.promiseHandlerService#callApi
         * @param {string} name The name of the cached call collection managed by the
         * {@link folio.shared.apiCallHandlerService}
         * @param {boolean} [loading] A boolean variable local to the caller which will be marked when the promise is
         * waiting to resolve/reject and set to false when resolved/rejected completed.
         * @param {function} functionReturningPromise A required callback function which represents a method from one
         * of this project's services which resolves to a promise
         */
        callApi = function(name, loading, functionReturningPromise) {
          if (!$this._.isFunction(functionReturningPromise)) {
            throw new Error('must pass a promise-returning function to the promise handler');
          }

          var requestId = $this.apiCallHandlerService.addNewCall(name),
              requestCall = function() {
                loading = true;
                ($this.apiCallHandlerService.queuedCall(true, name, requestId).ApiRequest = functionReturningPromise()).then(function(data) {
                  if ($this.apiCallHandlerService.anyUnresolvedRequests(name)) {
                    if (data) {
                      if (data.WarningField) {
                        $this.errorHandlingService.handleWarning(data.WarningField);
                      }
                      $this.apiCallHandlerService.resolveDeferred({Code: 200}, true, name, requestId);
                    } else {
                      $this.errorHandlingService.handleErrors({Message: 'An unknown error occurred during the API call'});
                      $this.apiCallHandlerService.resolveDeferred({Code: 204}, true, 'Auth', requestId);
                    }
                  } else {
                    $this.apiCallHandlerService.rejectDeferred({Code: 204}, true, name, requestId);
                  }
                }).catch(function(data) {
                  $this.errorHandlingService.handleErrors(data);
                  $this.apiCallHandlerService.rejectDeferred({Code: 501}, true, name, requestId);
                }).finally(function() {
                  loading = false;
                });
              };

          $this.errorHandlingService.clearErrors();

          // If a timeout is active, cancel it (that way only the last one will execute, preventing a bottleneck)
          $this.apiCallHandlerService.callMethodAfterTimeoutPlusCancel(300, name.toLowerCase(), name, requestCall, requestId);
        };

    return {
      callApi: callApi,
      reset: reset
    };
  }
})();
