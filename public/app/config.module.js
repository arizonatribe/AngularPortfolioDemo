(function() {
  'use strict';
  var mainAppName = 'folio',
      thirdPartyModules = ['ui.router', 'ngAnimate'],
      localModules = ['shared', 'error', 'config', 'auth', 'login', 'navigation', 'jobs', 'companies'].map(function(mod) {
        return mainAppName + '.' + mod;
      });

  /**
   * Parent module under which all the others will be attached
  * @namespace folio
  */
  angular.module(mainAppName, thirdPartyModules.concat(localModules));

  /**
   * Attaches the application to the DOM when the document object is ready
   * @method folio#bootstrap
   */
  angular.element(document).ready(function() {
    angular.bootstrap(document, [mainAppName]);
  });
})();
