(function() {
  'use strict';
  angular.module('folio.error')
      .controller('ErrorController', ['errorHandlingService', ErrorController]);

  /**
   * ErrorController Javascript class constructor sets default values for certain members and injects dependencies into the constructed instance
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
