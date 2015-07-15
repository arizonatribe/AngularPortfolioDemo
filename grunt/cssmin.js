var filePaths = require('../config/file-paths.json');

/**
 * Minifies CSS stylesheets into faster-loading, compact, single CSS file. Can automatically concatenate multiple source
 * files when it creates a single minified output file.
 * @name GruntFile.cssmin
 */
module.exports = {
  options: {
    banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
  },
  build: {
    files: {
      'dist/css/vendor.min.css': filePaths.vendorCssPaths,
      'dist/css/app.min.css': 'dist/css/app.min.css'
    }
  }
};
