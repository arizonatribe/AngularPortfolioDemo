(function() {
  'use strict';
  angular.module('folio.unit-testing.apiCallHandlerService', ['folio.unit-testing.fakeData'])
      .service('apiCallHandlerService', ['fakeData', '$q', ApiCallHandlerService]);

  function ApiCallHandlerService(fakeData, $q) {

    // External dependencies
    this.fakeData = fakeData;
    this.$q = $q;

    // ---------------------

    this.requestCall = {};
  }

  ApiCallHandlerService.prototype = {
    constructor: ApiCallHandlerService,
    init: function(timeouts, calls) { },
    addNewCall: function(callName) {
      var $this = this;
      this.requestCall = {
        RequestId: $this.fakeData.generateUUID(),
        DeferredRequest: $this.$q.defer(),
        ApiRequest: null,
        Finished: false,
        RequestedAt: (new Date()).valueOf()

      };
      return this.requestCall.RequestId;
    },
    abortUnresolvedRequests: function() {

    },
    resolveDeferred: function(message, resolveLast, callName, requestId) {
      if (angular.isString(requestId) && this.requestCall.RequestId === requestId && angular.isString(callName) && callName === 'Realm') {
        this.requestCall.Finished = true;
        this.requestCall.DeferredRequest.resolve(message);
      }
    },
    rejectDeferred: function(message, resolveLast, callName, requestId) {
      if (angular.isString(requestId) && this.requestCall.RequestId === requestId && angular.isString(callName) && callName === 'Realm') {
        this.requestCall.Finished = true;
        this.requestCall.DeferredRequest.reject(message);
      }
    },
    queuedCall: function(getLastCall, callName, requestId) {
      if (angular.isString(requestId) && this.requestCall.RequestId === requestId && angular.isString(callName) && callName === 'Realm') {
        return this.requestCall;
      } else {
        return {};
      }
    }
  };
})();
