(function() {
  'use strict';
  angular.module('folio.unit-testing.errorHandlingService', ['folio.unit-testing.fakeData'])
      .service('errorHandlingService', ['fakeData', ErrorHandlingService]);

  function ErrorHandlingService(fakeData) {
    this.fakeData = fakeData;

    this.errors = [];
    this.warning = '';
  }

  ErrorHandlingService.prototype = {
    constructor: ErrorHandlingService,
    getErrors: function() {
      return this.errors;
    },
    getWarning: function() {
      return this.warning;
    },
    clearErrors: function() {
      this.errors = [];
    },
    clearWarning: function() {
      this.warning = '';
    },
    handleErrors: function(error) {
      var $this = this;

      if (error) {
        // See if this is one error or multiple
        if (angular.isArray(error)) {
          angular.forEach(error, function(value) {
            $this.errors.push({ Id: $this.fakeData.generateUUID(), Message: $this.formatErrorMessage(value).Message || value });
          });
        } else {
          $this.errors.push({ Id: $this.fakeData.generateUUID(), Message: $this.formatErrorMessage(error).Message || value });
        }
      }
    },
    handleWarning: function(warning) {
      this.warning = warning;
    },
    formatErrorMessage: function(err) {
      if (err.Message) { return { Message: err.Message }; }
      if (err.message) { return { Message: err.message }; }
      if (err.ErrorField) { return { Message: err.ErrorField }; }
      if (err.warning) { return { Message: err.warning }; }
      if (err.Warning) { return { Message: err.Warning }; }

      return err;
    },
    extractMessageFromErrorPromise: function(data, status, headers) {
      var errMessage = this.formatErrorMessage(data).Message;

      if (errMessage) {
        return {ErrorField: errMessage};
      } else if (status) {
        return {ErrorField: data && data.Message ? data.Message : 'An error occurred: (code ' + status + ')'};
      } else if (headers && headers('error')) {
        return {ErrorField: headers('error')};
      }
      return {ErrorField: 'An unknown error occurred. Please try again.'};
    }
  };
})();
