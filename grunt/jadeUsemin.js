/**
 * Will convert a jade template into an HTML file and also search for any build blocks in the jade template from which
 * to consolidate src links to multiple files into a single src link to a single file (does not concatenate those files
 * listed in the build block for you, just changes the script/link blocks in the html file from many to one).
 * @name GruntFile.jadeUsemin
 */
module.exports = {
  build: {
    options: {
      tasks: {
        tasks: {}
      }
    },
    files: [{
      dest: 'dist/index.jade',
      src: 'public/app/index.jade'
    }]
  }
};
