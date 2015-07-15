(function() {
    'use strict';
    /**
     * @class folio.auth
     * @namespace
     */
    angular.module('folio.auth', ['ng', 'folio.shared']);
    /**
     * @name folio.login
     * @namespace
     */
    angular.module('folio.login', ['ng', 'ui.router', 'folio.shared', 'folio.auth']);
})();