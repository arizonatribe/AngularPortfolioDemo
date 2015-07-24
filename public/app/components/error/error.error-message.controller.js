(function() {
  'use strict';
  angular.module('folio.error')
      .controller('ErrorMessageController', ['errorHandlingService', ErrorMessageController]);

  /**
   * ErrorController supports the {@link folio.error.ErrorMessageHandlerDirective|ErrorMessageHandlerDirective} and
   * provides it with the {@link folio.shared.ErrorHandlingService|ErrorHandlingService}
   * @class folio.shared.ErrorMessageController
   * @param {object} errorHandlingService error handling service
   * @constructor
   */
  function ErrorMessageController(errorHandlingService) {

    /**
     * error handling service
     * @property {object}
     * @name folio.shared.ErrorMessageController#service
     */
    this.service = errorHandlingService;
  }
})();
