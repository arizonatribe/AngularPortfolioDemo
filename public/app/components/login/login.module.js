(function() {
  'use strict';
  /**
   * Module which handles authentication calls and caching of OAuth access tokens locally (more low-level than
   * {@link folio.login})
   * @namespace folio.auth
   */
  angular.module('folio.auth', ['ng', 'folio.shared']);
  /**
   * Module which handles the actual user login interactivity
   * @namespace folio.login
   */
  angular.module('folio.login', ['ng', 'ui.router', 'folio.shared', 'folio.auth']);
})();
