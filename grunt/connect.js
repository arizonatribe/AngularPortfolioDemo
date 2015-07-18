/**
 *  Launches a Node server for use in testing. Will host a given folder.
 * @name GruntFile.connect
 */
module.exports = {
  test: {
    options: {
      port: 3000,
      hostname: 'localhost',
      base: 'public/app',
      keepalive: true
    }
  },
  devmock: {
    options: {
      port: 3000,
      hostname: 'localhost',
      base: 'public/app',
      keepalive: true,
      livereload: true
    }
  },
  dev: {
    options: {
      port: 3000,
      hostname: 'localhost',
      base: 'dist',
      keepalive: true
    }
  }
};
