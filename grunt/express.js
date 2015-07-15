/**
 *  Launches a Node (ExpressJS) server for use in development (debugging). Will host a given folder and (through the
 *  livereload setting) will trigger an event to the Chrome/Firefox LiveReload browser extension to automatically
 *  re-render the page when it detects file changes in the directories it hosts.
 * @name GruntFile.express
 */
module.exports = {
  dev: {
    options: {
      bases: ['app'],
      port: 3030,
      hostname: '0.0.0.0',
      livereload: true
    }
  },
  dist: {
    options: {
      bases: ['dist'],
      port: 3030,
      hostname: '0.0.0.0',
      livereload: true
    }
  }
};
