var filePaths = require('../config/file-paths.json');

/**
 * Extracts the jsdoc compatible code comments into readable, formatted HTML. It's a bit humorously recursive, but this
 * task set up the page you're reading.
 * @name GruntFile.jsdoc-ng
 */
module.exports = {
  dist: {
    src: filePaths.codePathsVerbose.concat(['GruntFile.js', 'grunt/**/*.js']),
    dest: 'docs/code',
    template: 'jsdoc-ng'
  }
};
