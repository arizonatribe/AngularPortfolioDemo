var filePaths = require('../config/file-paths.json');

/**
 * Compacts/Minifies JavaScript files so the site will load faster. Variable names are shortened, whitespace reduced,
 * and shorthand versions of JavaScript code are used in place of more readable "longhand" versions.
 * @name GruntFile.uglify
 */
module.exports = {
  options: {
    banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
  },
  build: {
    files: {
      'dist/js/app.min.js': filePaths.codePathsVerbose,
      'dist/js/vendor.min.js': filePaths.libraryPaths
    }
  }
};
