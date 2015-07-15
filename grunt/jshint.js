/**
 * Performs "linting" proofreading of JavaScript files throughout the project.
 * @name GruntFile.jshint
 */
module.exports = {
  options: {
    // use jshint-stylish to make our errors look and read good
    reporter: require('jshint-stylish')
  },

  // when this task is run, lint the Gruntfile and all js files in src
  build: ['Gruntfile.js', 'public/**/*.js', '!**/bower_components/**']
};
