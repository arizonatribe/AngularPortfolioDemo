/**
 * Configures the karma unit test runner that executes the jasmine unit tests.
 * @name GruntFile.karma
 */
module.exports = {
  unit: {
    configFile: './karma.conf.js',
    action: 'run',
    singleRun: true,
    reporters: ['dots']
  }
};
