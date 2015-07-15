/**
 * Simple copy of file(s) from one directory to another. Optionally can rename files as they're being copied.
 * @name GruntFile.copy
 */
module.exports = {
  main: {
    files: [
        {expand: true, flatten: true, src: ['public/assets/img/*'], dest: 'dist/img', filter: 'isFile'}
    ]
  },
  dev: {
    files: [
      {expand: true, flatten: true, src: ['public/assets/img/*'], dest: 'dist/img', filter: 'isFile'},
      {expand: true, flatten: true, src: ['config/config-dev.json'], dest: 'dist/js', filter: 'isFile', rename: function(dest, src) {
        return dest + '/' + src.replace('-dev', '');
      }}
    ]
  },
  devmock: {
    files: [
      {expand: true, flatten: true, src: ['public/assets/img/*'], dest: 'dist/img', filter: 'isFile'},
      {expand: true, flatten: true, src: ['config/config-dev.json'], dest: 'public/assets/config', filter: 'isFile', rename: function(dest, src) {
        return dest + '/' + src.replace('-devmock', '');
      }}
    ]
  },
  prod: {
    files: [
        {expand: true, flatten: true, src: ['public/assets/img/*'], dest: 'dist/img', filter: 'isFile'},
            {expand: true, flatten: true, src: ['config/config-prod.json'], dest: 'dist/js', filter: 'isFile', rename: function(dest, src) {
              return dest + '/' + src.replace('-prod', '');
            }}
        ]
  }
};
