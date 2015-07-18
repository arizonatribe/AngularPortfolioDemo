(function() {
  'use strict';
  var mainAppName = 'folio';
  /**
   * Parent module under which all the others will be attached
  * @namespace folio
  */
  angular.module(mainAppName,
  [
    'ui.router',
    'ngAnimate',
    'folio.shared',
    'folio.error',
    'folio.auth',
    'folio.config',
    'folio.login',
    'folio.navigation'
  ]);

  /**
   * Attaches the application to the DOM when the document object is ready
   * @method folio#bootstrap
   */
  angular.element(document).ready(function() {
    angular.bootstrap(document, [mainAppName]);
  });
})();
