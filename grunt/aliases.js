var filePaths = require('../config/file-paths.json');

/**
 * Sequences of Grunt tasks registered under a single name.
 * 'Default' defines what is always run whenever "grunt" and nothing else is entered at the command line, and in this
 * case, is synonymous with our release builds.
 * @name GruntFile.tasks
 * @class
 */
module.exports = {
  /**
   * The "release" built that is run by default. If you execute <tt><b>grunt</b></tt> from the command line, with no
   * other arguments, this sequence of tasks will be executed.
   * <ul>
   * <li>{@link GruntFile.clean}</li>
   * <li>{@link GruntFile.uglify}</li>
   * <li>{@link GruntFile.string-replace}</li>
   * <li>{@link GruntFile.less}:dist</li>
   * <li>{@link GruntFile.cssmin}</li>
   * <li>{@link GruntFile.copy}</li>
   * <li>{@link GruntFile.jadeUsemin}</li>
   * <li>{@link GruntFile.jade}:release</li>
   * <li>{@link GruntFile.clean}:jade</li>
   * <li>{@link GruntFile.clean}:less</li>
   * </ul>
   * @name GruntFile.tasks#default
   */
  default: [
      'clean',
      'uglify',
      'string-replace',
      'less:dist',
      'cssmin',
      'copy:prod',
      'jadeUsemin',
      'jade:release',
      'clean:jade',
      'clean:less'
  ],
  /**
   * The sequence of "dev" tasks that output files to the same <b>dist/</b> folder that the "release" build does,
   * but un-minified and executes code proofreading and unit testing tasks beforehand.
   * <ul>
   * <li>{@link GruntFile.clean}</li>
   * <li>{@link GruntFile.concat}:distapp</li>
   * <li>{@link GruntFile.concat}:distvendor</li>
   * <li>{@link GruntFile.concat}:distvendorcss</li>
   * <li>{@link GruntFile.less}:dist</li>
   * <li>{@link GruntFile.cssmin}</li>
   * <li>{@link GruntFile.copy}:dev</li>
   * <li>{@link GruntFile.jadeUsemin}</li>
   * <li>{@link GruntFile.jade}:release</li>
   * <li>{@link GruntFile.clean}:jade</li>
   * <li>{@link GruntFile.clean}:less</li>
   * <li>{@link GruntFile.concurrent}:dev</li>
   * </ul>
   * @name GruntFile.tasks#dev
   */
  dev: [
      'clean',
      'concat:distapp',
      'concat:distvendor',
      'concat:distvendorcss',
      'less:dist',
      'cssmin',
      'copy:dev',
      'jadeUsemin',
      'jade',
      'clean:jade',
      'clean:less',
      'concurrent:dev'
  ],
  /**
   * The sequence of "dev" tasks that also run a mock server of the APIs for a self-contained development
   * environment and additionally run a mock server that simulates a client application that would make use of
   * the login page. This allows for self-contained full end-to-end testing.
   * <ul>
   * <li>{@link GruntFile.clean}:devcss</li>
   * <li>{@link GruntFile.clean}:devhtml</li>
   * <li>{@link GruntFile.clean}:devconfig</li>
   * <li>{@link GruntFile.less}:devmock</li>
   * <li>{@link GruntFile.copy}:devmock</li>
   * <li>{@link GruntFile.jade}:dev</li>
   * <li>{@link GruntFile.concurrent}:devmock</li>
   * </ul>
   * @name GruntFile.tasks#devmock-full
   */
  devmock: [
      'clean:devcss',
      'clean:devhtml',
      'clean:devconfig',
      'less:devmock',
      'copy:devmock',
      'jade:dev',
      'concurrent:devmock'
  ],
  /**
   * Converts code-comments to HTML pages in a user-friendly API doc, and also converts markdown files for general
   * instructions on the project into distributable PDFs.
   * <ul>
   * <li>{@link GruntFile.markdownpdf}</li>
   * <li>{@link GruntFile.jsdoc-ng}</li>
   * <li>{@link GruntFile.open-code-docs}</li>
   * </ul>
   * @name GruntFile.tasks#all-documentation
   */
  'all-documentation': [
      'markdownpdf',
      'jsdoc-ng',
      'open-code-docs:' + filePaths.apiDocsPath + 'index.html'
  ],
  /**
   * The sequence of "test" tasks that perform unit testing, end-to-end testing, linting, and javascript style checking.
   * <ul>
   * <li>{@link GruntFile.jshint}:test</li>
   * <li>{@link GruntFile.jscs}:test</li>
   * <li>{@link GruntFile.karma}</li>
   * <li>{@link GruntFile.clean}:devcss</li>
   * <li>{@link GruntFile.clean}:devhtml</li>
   * <li>{@link GruntFile.clean}:devconfig</li>
   * <li>{@link GruntFile.less}:devmock</li>
   * <li>{@link GruntFile.copy}:devmock</li>
   * <li>{@link GruntFile.jade}:dev</li>
   * <li>{@link GruntFile.concurrent}:tests</li>
   * </ul>
   * @name GruntFile.tasks#tests
   */
  tests: [
    'jshint:test',
    'jscs:test',
    'karma',
    'clean:devcss',
    'clean:devhtml',
    'clean:devconfig',
    'less:devmock',
    'copy:devmock',
    'jade:dev',
    'concurrent:tests'
  ]
};
