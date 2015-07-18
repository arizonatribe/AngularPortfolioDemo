var filePaths = require('../config/file-paths.json');

/**
 * Converts LESS pre-processed stylesheets into standard CSS. Expects a name to be provided for a new CSS file to create
 * from the LESS source file.
 * @name GruntFile.less
 */
module.exports = {
  devmock: {
    files: {
      'public/app/temp.app.css': filePaths.lessPaths
    }
  },
  dist: {
    files: {
      'dist/css/app.min.css': filePaths.lessPaths
    }
  }
};
