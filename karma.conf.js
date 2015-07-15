var filePaths = require('./config/file-paths.json');

module.exports = function(config) {
  config.set({

    basePath: './',

    files: filePaths.libraryPaths.concat(
        filePaths.libraryTestPaths.concat(
            filePaths.codePathsVerbose.concat(
              filePaths.mockPaths.concat(
                  filePaths.testPaths.concat(filePaths.jadePaths)
                )
            )
        )
    ),

    frameworks: ['jasmine', 'jasmine-matchers'],

    preprocessors: {
      'app/**/*.jade': ['ng-jade2js']
    },

    browsers: ['Chrome', 'Firefox'],

    plugins: [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-safari-launcher',
        'karma-phantomjs-launcher',
        'karma-ie-launcher',
        'karma-ng-jade2js-preprocessor',
        'karma-ng-scenario',
        'karma-jasmine',
        'karma-jasmine-matchers',
        'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    reporters: [
      'progress',
      'junit'
    ],

    ngJade2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public/app/',
      templateExtension: 'html'
    },

    exclude: [],
    autoWatch: false,
    singleRun: true,
    port: 9876,
    colors: true,
    captureTimeout: 60000

  });
};
