var filePaths = require('../config/file-paths.json');
/**
 * Simple copy of file(s) from one directory to another. Optionally can rename files as they're being copied.
 * @name GruntFile.copy
 */
module.exports = {
  dev: {
    files: [
      {expand: true, flatten: true, src: [filePaths.fontPaths], dest: 'dist/fonts', filter: 'isFile'},
      {expand: true, flatten: true, src: ['config/config-dev.json'], dest: 'dist/js', filter: 'isFile', rename: function(dest, src) {
        return dest + '/' + src.replace('-dev', '');
      }}
    ]
  },
  devmock: {
    files: [
      {expand: true, flatten: true, src: ['config/config-dev.json'], dest: 'public/app', filter: 'isFile', rename: function(dest, src) {
        return dest + '/' + src.replace('config-dev', 'temp.config');
      }}
    ]
  },
  prod: {
    files: [
      {expand: true, flatten: true, src: [filePaths.fontPaths], dest: 'dist/fonts', filter: 'isFile'},
      {expand: true, flatten: true, src: ['config/config-prod.json'], dest: 'dist/js', filter: 'isFile', rename: function(dest, src) {
        return dest + '/' + src.replace('-prod', '');
      }}
    ]
  }
};
