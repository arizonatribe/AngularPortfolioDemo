var filePaths = require('../config/file-paths.json');

/**
 * Performs "linting" proofreading of JavaScript files throughout the project.
 * @name GruntFile.jshint
 */
module.exports = {
  options: {
    reporter: require('jshint-stylish')
  },
  test: {
    src: ['!**/bower_components/**'].concat(filePaths.testPaths.concat(filePaths.mockPaths))
  },
  code: {
    src: ['!**/bower_components/**'].concat(filePaths.codePathsVerbose)
  },
  server: {
    src: ['server/**/*.js']
  },
  ops: {
    src: ['Gruntfile.js', 'grunt/**/*.js']
  }
};
