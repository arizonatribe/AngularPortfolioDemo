/**
 * Converts standard markdown files into styled and formatted HTML docs.
 * @name GruntFile.markdown
 */
module.exports = {
  all: {
    files: [
      {
        expand: true,
        src: '*.md',
        dest: 'docs/',
        ext: '.html'
      }
    ]
  }
};
