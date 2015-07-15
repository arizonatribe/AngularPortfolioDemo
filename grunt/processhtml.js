/**
 * Searches for multiple script and stylesheet listings sandwiched between HTML build elements and consolidates them
 * into a single script or link reference (does not concatenate the files together, just replaces multiple script/link
 * elements with a single one). This allows for you to develop easily where all the JS and Stylesheet files are
 * separated and easily managed in Chrome developer tools, yet when you build for production you can switch over to
 * references to a single, minified file (which improves page load time).
 * @name GruntFile.processhtml
 */
module.exports = {
  build: {
    files: {
      'dist/index.html': ['dist/index.html']
    }
  }
};
