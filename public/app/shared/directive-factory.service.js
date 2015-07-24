(function() {
  'use strict';
  angular.module('folio.shared')
  .factory('directiveFactory', ['_', '_s', DirectiveFactory]);

  /**
   * DirectiveFactory reduces repetitive code from the creation of the directive configuration object and depends on the
   * component-style structure of this project to create a templateUrl path. These are configured as Element directives
   * (<code>restrict: 'E'</code>) and use the <code>controllerAs</code> syntax of Angular 1.2X and additionally a
   * directive controller matching the name of the directive is configured (for 'myDirectve' would create as
   * <code>controller: 'MyDirectiveController'</code>).
   * @name folio.shared.DirectiveFactory
   * @class
   * @param {object} _ underscore js library with our custom mixins
   * @param {object} _s underscore string js library
   * @returns {Function} A directive configuration object creation function that should be invoked with directive name
   * and component name (leave the latter blank if this belongs to the shared components)
   * @constructor
   */
  function DirectiveFactory(_, _s) {
    return function directiveFactory(name, component) {
      var title = name[0].toUpperCase() + name.substring(1),
          componentName = _.isString(component) && component.toLowerCase() !== 'shared' ?
                          '/components/' + component : '/shared',
          path = componentName + '/templates/' + _s(title).camelize(true).dasherize().value() + '.template.html';

      return {
        restrict: 'E',
        templateUrl: path,
        controller: title + 'Controller',
        controllerAs: 'ctrl' + title,
        bindToController: true
      };
    };
  }
})();
