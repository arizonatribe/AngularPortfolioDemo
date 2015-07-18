var filePaths = require('../config/file-paths.json');

/**
 * Enforces JavaScript coding conventions
 * @name GruntFile.jscs
 */
module.exports = {
  options: {
    config: true
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
