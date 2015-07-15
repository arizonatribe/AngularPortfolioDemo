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

  // for stylesheets, watch css and less files
  // only run less and cssmin stylesheets:
  css: {
    files: ['public/assets/styles//*.css'],
    tasks: ['concat:distappcss', 'concat:distvendorcss']
  },

  less: {
    files: 'public/assets/styles//*.less',
    tasks: ['less:dev']
  },

  // for scripts, run jshint and uglify
  scripts: {
    files: ['public/app/components/**/*.js', 'public/app/shared/**/*.js', 'public/app/config.module.js'],
    tasks: ['jshint', 'concat:distapp', 'concat:distvendor']
  },

  jade: {
    files: 'public/app/**/*.jade',
    tasks: ['jade:dev']
  },

  config: {
    files: 'config/config-dev.json',
    tasks: ['copy:dev']
  },

  server: {
    files: ['server/**.*.js', 'config/express.js', 'config/socketio.js', 'config/mock-server.js'],
    tasks: ['express:dev']
  },

  tests: {
    files: ['public/app/**.test.js', 'config/unit-test.fake-data.js'],
    tasks: ['jshint', 'karma']
  },

  protractor: {
    files: ['e2e-tests/**/*scenario.js'],
    tasks: ['protractor:continuous']
  }
};
