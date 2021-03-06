(function() {
  'use strict';
  angular.module('folio.shared')
      /**
       * Config file path setting at which the config.json file will be found (NOTE: this value is overwritten during the build process with the path relevant to the release directory structure, so make changes there rather than here)
       * @constant
       * @name folio.shared.configFilePath
       * @type {string}
       */
      .constant('configFilePath', 'temp.config.json')
      .factory('localConfig', ['$http', '$q', 'configFilePath', 'errorHandlingService', LocalConfig]);

  /**
   * LocalConfig convenience method for retrieving a local `config.json` file holding API connection details and
   * persisting its values into a local cache after read in the very first time
   * @name folio.shared.LocalConfig
   * @class
   * @param {object} $http angular $http service
   * @param {object} $q angular $q service
   * @param {string} configFilePath path to the config.json
   * @param {object} errorHandlingService error handling service
   * @constructor
   */
  function LocalConfig($http, $q, configFilePath, errorHandlingService) {

    /**
     * Angular $http service
     * @property {object}
     * @name folio.shared.LocalConfig#$http
     */
    this.$http = $http;
    /**
     * Angular $q service
     * @property {object}
     * @name folio.shared.LocalConfig#$q
     */
    this.$q = $q;
    /**
     * Path to the config file
     * @property {string} path to the config.json
     * @name folio.shared.LocalConfig#configFilePath
     */
    this.configFilePath = configFilePath;
    /**
     * error handling service
     * @property {object}
     * @name folio.shared.LocalConfig#errorHandlingService
     */
    this.errorHandlingService = errorHandlingService;

    var $this = this,
        /**
         * Locally managed object used after the initial call to import the config.json seeds this object with values to override its defaults
         * @type {{apiBaseUrl: string, clientId: null, authServerUrl: string, apiVersion: string, logging: null, getQueryStringAPI: Function}}
         * @private
         */
         configSettings = {
           apiBaseUrl: '',
           clientId: null,
           authServerUrl: '',
           logging: null,
           getQueryStringAPI: function(appendToPath) {
            return this.apiBaseUrl + (appendToPath ? appendToPath : '');
          }
         },
        /**
         * Sets the client id to a valid GUID string
         * @method folio.shared.LocalConfig#setClientId
         * @param {string} clientId a string value formatted according to GUID patterns
         */
         setClientId = function(clientId) {
           if (clientId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
             configSettings.clientId = clientId;
           }
         },
        /**
         * Retrieves the Local Config settings from the config.json.
         * Makes the http call to import the config.json once, and then persists it through this singleton service on all subsequent calls.
         * @method folio.shared.LocalConfig#getConfigSettings
         * @returns {deferred.promise|{then, always}} the config settings (clientId, apiVersion, apiBaseUrl, authServerUrl)
         */
        getConfigSettings = function() {
          var deferred = $this.$q.defer();

          // If the config settings have already been loaded from the config.json, don't waste another $http call to re-read them
          if (configSettings.apiBaseUrl && configSettings.clientId && configSettings.authServerUrl && configSettings.apiVersion) {
            deferred.resolve(configSettings);
          } else {
            $this.$http.get($this.configFilePath).success(function(data) {
              // Set them so that we don't have to make another $http call later
              configSettings.apiBaseUrl = data.apiBaseUrl;
              configSettings.authServerUrl = data.authServerUrl;
              configSettings.clientId = data.clientId;

              if (data.logging && !!data.logging) {
                configSettings.logging = !!(data.logging);
                $this.errorHandlingService.enableLogging(data.logging);
              }

              deferred.resolve(configSettings);
            }).error(function() {
              deferred.reject('Error: failed to find your config settings (client id, URL, etc.) Please make sure your config.json file is present in your web server root folder.');
            });
          }

          return deferred.promise;
        };

    return {
      getConfigSettings: getConfigSettings,
      setClientId: setClientId
    };
  }
})();
