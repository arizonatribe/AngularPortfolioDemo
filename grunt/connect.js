/**
 *  Launches a Node server for use in testing. Will host a given folder.
 * @name GruntFile.connect
 */
module.exports = {
  test: {
    options: {
      port: 4000,
      hostname: 'localhost',
      base: 'public/app',
      keepalive: true
    }
  },
  dev: {
    options: {
      port: 3000,
      hostname: 'localhost',
      base: 'public/app',
      keepalive: true,
      livereload: true
    }
  }
};
