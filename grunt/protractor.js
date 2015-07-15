/**
 * Configures the protractor end-to-end test runner that executes the protractor tests.
 * @name GruntFile.protractor
 */
module.exports = {
  options: {
    configFile: './e2e-tests/protractor.conf.js',
    noColor: false
  },
  e2e: {
    options: {
      keepAlive: false
    }
  },
  continuous: {
    options: {
      keepAlive: true
    }
  }
};
