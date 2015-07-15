var filePaths = require('../config/file-paths.json');

/**
 * Enforces JavaScript coding conventions
 * @name GruntFile.jscs
 */
module.exports = {
  src: filePaths.testPaths.concat(filePaths.codePathsVerbose.concat(['GruntFile.js', 'grunt/**'])),
  options: {
    config: true
  }
};
