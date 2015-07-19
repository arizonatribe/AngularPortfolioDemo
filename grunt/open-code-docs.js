/**
 * Custom Grunt task which launches the API docs (which should be in HTML format). This process involves first generating
 * the documentation from the JSDoc-style code comments annotating the JavaScript project files, which are then parsed
 * into markdown format by {@link GruntFile.jsdoc-ng} and finally converted to both PDF and HTML format by
 * {@link GruntFile.markdown}. This task simply launches the finished product in the expected <code>docs/code/</code>
 * directory.
 * @name GruntFile.open-code-docs
 * @param {object} grunt Instance of Grunt from which to register the custom task
 */
module.exports = function(grunt) {
  grunt.registerTask('open-code-docs', 'launches structured API style documentation from JSDoc annotations found in the codebase', function() {
    grunt.log.writeln('opening docs...');
    require('open')('docs/code/index.html');
  });
};
