/**
 * Monitors a file(s) and executes a specified task(s) when it detects changes made to the file. Additionally broadcasts
 * a livereload event that can be picked up by the Chrome/Firefox LiveReload plugin (if you're using another browser
 * for development, you shouldn't), which will automatically re-render the page and display your changes. An example of
 * it's use is if you change something in a stylesheet (color, size, etc.), then you simply save the file and you'll
 * see the change instantly appear in the browser. An essential tool if you are doing design-related tasks.
 * @name GruntFile.watch
 */
module.exports = {
  options: {
    livereload: true
  },

  css: {
    files: ['public/app/**/*.css', '!**/bower_components/**'],
    tasks: ['concat:distappcss']
  },

  less: {
    files: ['public/app/**/*.less', 'config/file-paths.json'],
    tasks: ['less']
  },

  // for scripts, run jshint, jscs, and uglify
  scripts: {
    files: ['public/app/components/**/*.js', 'public/app/shared/**/*.js', 'public/app/config.module.js', 'config/file-paths.json'],
    tasks: ['jshint:code', 'jscs:code', 'concat:distapp']
  },

  jade: {
    files: ['public/app/**/*.jade', 'config/file-paths.json'],
    tasks: ['jade:dev']
  },

  config: {
    files: 'config/config-dev.json',
    tasks: ['copy:dev', 'copy:devmock']
  },

  server: {
    files: ['server/**.*.js', 'server/**.*.json', 'config/express.js', 'config/socketio.js', 'config/mock-server.js'],
    tasks: ['jshint:server', 'jscs:server']
  },

  tests: {
    files: ['public/app/**.test.js', 'config/tests/**/*.js', 'config/file-paths.json'],
    tasks: ['jshint:test', 'jscs:test', 'karma']
  },

  protractor: {
    files: ['e2e-tests/**/*.scenario.js'],
    tasks: ['protractor:continuous']
  }
};
