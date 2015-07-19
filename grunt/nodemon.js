/**
 * Development tool that launches a Node server (re-launching on any detected server JS file changes).
 * Also auto-launches a page in the default web browser that points to the locally hosted Node server.
 * @name GruntFile.nodemon
 */
module.exports = {
  dev: {
    script: './config/mock-server.js',
    options: {
      callback: function(nodemon) {
        nodemon.on('log', function(event) {
          console.log(event.colour);
        });

        // opens browser on initial server start
        nodemon.on('config:update', function() {
          // Delay before server listens on port
          setTimeout(function() {
            require('open')('http://localhost:3000');
          }, 750);
        });

        // refreshes browser when server reboots
        nodemon.on('restart', function() {
          // Delay before server listens on port
          setTimeout(function() {
            require('fs').writeFileSync('.rebooted', 'rebooted ' + new Date());
          }, 750);
        });
      },
      watch: ['server', 'config/express.js', 'config/socketio.js', 'config/mock-server.js'],
      delay: 750,
      env: {
        PORT: '3030',
        NODE_ENV: 'development'
      }
    }
  }
};
