/**
 * Searches for specified string patterns in a given file and replaces it with something else. Useful if needing to use
 * different path, config, constant, values in a dev environment than in the final rendered production files.
 * @name GruntFile.string-replace
 */
module.exports = {
  release: {
    files: {
      'dist/js/app.min.js': 'dist/js/app.min.js'
    },
    options: {
      replacements: [
        {
          pattern: 'temp.config.json',
          replacement: 'js/config.json'
        }
      ]
    }
  }
};
