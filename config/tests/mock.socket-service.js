(function() {
  'use strict';
  angular.module('folio.unit-testing.storage', [])
  .service('socketMockit', ['$rootScope', SocketMockit]);

  function SocketMockit($rootScope) {
    var events = {},
    listeners = {};

    return {
      on: function(eventName, callback) {
        if (!events[eventName]) events[eventName] = [];
        events[eventName].push(callback);
      },
      emit: function(eventName, data, emitCallback) {
        if (events[eventName]) {
          angular.forEach(events[eventName], function(callback) {
            $rootScope.$apply(function() {
              callback(data);
            });
          });
        }
        if (emitCallback) emitCallback();
      },
      addListener: function(eventName, callback) {
        if (!listeners[eventName]) listeners[eventName] = [];
        listeners[eventName].push(callback);
      },
      removeAllListeners: function() {
        listeners = {};
      },
      receive: function(eventName) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (events[eventName]) {
          angular.forEach(events[eventName], function(callback) {
            $rootScope.$apply(function() {
              callback.apply(this, args);
            });
          });
        }
      },
      getListeners: function() {
        return listeners;
      },
      getEvents: function() {
        return events;
      }
    };
  }
})();
