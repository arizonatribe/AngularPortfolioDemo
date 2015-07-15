(function() {
    "use strict";
    var mainAppName = 'folio';
    /**
    * @namespace BbAuth
    */
    angular.module(mainAppName,
    [
      'ui.router',
      'ui.bootstrap',
      'ngAnimate',
      'folio.shared',
      'folio.auth',
      'folio.config',
      'folio.login'
    ]);

    angular.element(document).ready(function () {
        angular.bootstrap(document, [mainAppName]);
    });
})();
