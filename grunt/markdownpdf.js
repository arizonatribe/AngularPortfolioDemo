/**
 * Converts standard markdown files into styled and formatted PDF documents.
 * @name GruntFile.markdownpdf
 */
module.exports = {
  options: { },
  files: {
    src: '*.md',
    dest: 'docs/'
  }
};
