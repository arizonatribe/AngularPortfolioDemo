var filePaths = require('../config/file-paths.json');

/**
 * Concatenates multiple files into a single file. Src should be an array of file names and dest should be a path and
 * name of a new file to be created/overwritten.
 * @name GruntFile.concat
 */
module.exports = {
  options: {
    separator: ';'
  },
  distapp: {
    src: filePaths.codePathsVerbose,
    dest: 'dist/js/app.min.js'
  },
  distvendor: {
    src: filePaths.libraryPaths,
    dest: 'dist/js/vendor.min.js'
  },
  distappcss: {
    src: 'public/app/assets/styles/devcss/dev.css',
    dest: 'dist/css/app.min.css'
  },
  distvendorcss: {
    src: filePaths.vendorCssPaths,
    dest: 'dist/css/vendor.min.css'
  }
};
