var filePaths = require('../config/file-paths.json'),
    devPaths = {},
    releasePaths = {};

filePaths.jadePaths.forEach(function(path) {
  devPaths[path.replace('jade', 'html')] = [path];
  releasePaths[path.replace('jade', 'html').replace('public/app', 'dist')] = [path];
});

/**
 * Converts Jade templates (Node templating engine) into HTML files.
 * @name GruntFile.jade
 */
module.exports = {
  dev: {
    options: {
      data: {
        debug: true
      },
      pretty: true
    },
    files: devPaths
  },
  release: {
    options: {
      data: {
        debug: false
      },
      pretty: true
    },
    files: releasePaths
  }
};
