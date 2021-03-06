/**
 * Deletes temporary files used only for builds or only for dev debugging.
 * Execute <tt><b>grunt clean</b></tt> to remove all, otherwise <tt><b>grunt clean:dist</b></tt>
 * or <tt><b>grunt clean:jade</b></tt> etc.
 * @name GruntFile.clean
 */
module.exports = {
  dist: ['dist/*'],
  docs: ['docs/*'],
  jade: ['dist/**/*.jade'],
  less: ['dist/**/*.less'],
  devcss: ['public/app/**/*.css', '!**/bower_components/**'],
  devhtml: ['public/app/**/*.html', '!**/bower_components/**'],
  devconfig: ['public/app/**/*.json', '!**/bower_components/**']
};
