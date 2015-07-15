/**
 * Executes long-running tasks concurrently, such as file watches and node server file monitoring.
 * @name GruntFile.concurrent
 */
module.exports = {
  dev: {
    tasks: ['connect:dev', 'nodemon:dev', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  },
  tests: {
    tasks: ['connect:test', 'nodemon:dev', 'express:dist', 'protractor:e2e'],
    options: {
      logConcurrentOutput: true
    }
  }
};
