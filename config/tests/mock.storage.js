(function() {
  'use strict';
  angular.module('folio.unit-testing.storage', [])
      .service('localStoreMock', [LocalStoreMock])
      .service('sessionStoreMock', [SessionStoreMock]);

  function LocalStoreMock() {
    var localStore = {};
    return {
      getItem: function(key) {
        return localStore[key];
      },
      setItem: function(key, value) {
        localStore[key] = value.toString();
      },
      removeItem: function(key) {
        if (localStore[key]) {
          delete localStore[key];
        }
      },
      clear: function() {
        localStore = {};
      }
    };
  }

  function SessionStoreMock() {
    var sessionStore = {};
    return {
      getItem: function(key) {
        return sessionStore[key];
      },
      setItem: function(key, value) {
        sessionStore[key] = value.toString();
      },
      removeItem: function(key) {
        if (sessionStore[key]) {
          delete sessionStore[key];
        }
      },
      clear: function() {
        sessionStore = {};
      }
    };
  }
})();
