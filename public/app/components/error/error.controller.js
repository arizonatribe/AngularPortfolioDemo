(function() {
  'use strict';
  angular.module('folio.error')
      .controller('ErrorController', ['errorHandlingService', ErrorController]);

  /**
   * ErrorController supports the {@link folio.error.ErrorMessageHandlerDirective|ErrorMessageHandlerDirective} and
   * provides it with the {@link folio.shared.ErrorHandlingService|ErrorHandlingService}
   * @class folio.shared.ErrorController
   * @param {object} errorHandlingService error handling service
   * @constructor
   */
  function ErrorController(errorHandlingService) {

    /**
     * error handling service
     * @property {object}
     * @name folio.shared.ErrorController#service
     */
    this.service = errorHandlingService;
  }
})();
