/**
 * Converts LESS pre-processed stylesheets into standard CSS. Expects a name to be provided for a new CSS file to create
 * from the LESS source file.
 * @name GruntFile.less
 */
module.exports = {
  dev: {
    files: {
      'public/assets/styles/devcss/dev.css': 'public/assets/styles/app.less'
    }
  },
  release: {
    files: {
      'dist/css/app.min.css': 'public/assets/styles/app.less'
    }
  }
};
