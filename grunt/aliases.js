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
   * <li>{@link GruntFile.less}:release</li>
   * <li>{@link GruntFile.cssmin}</li>
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
      'less:release',
      'cssmin',
      'copy:di',
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
   * <li>{@link GruntFile.less}</li>
   * <li>{@link GruntFile.copy}:dev</li>
   * <li>{@link GruntFile.jadeUsemin}</li>
   * <li>{@link GruntFile.jade}:release</li>
   * <li>{@link GruntFile.clean}:jade</li>
   * <li>{@link GruntFile.clean}:less</li>
   * </ul>
   * @name GruntFile.tasks#dev
   */
  dev: [
      'clean',
      'concat:distapp',
      'concat:distvendor',
      'concat:distvendorcss',
      'less',
      'copy:dev',
      'jadeUsemin',
      'jade',
      'clean:jade',
      'clean:less'
  ],
  /**
   * The sequence of "dev" tasks that also run a mock server of the BbAuth APIs for a self-contained development
   * environment and additionally run a mock server that simulates a client application that would make use of
   * the login page. This allows for self-contained full end-to-end testing.
   * <ul>
   * <li>{@link GruntFile.clean}:devcss</li>
   * <li>{@link GruntFile.clean}:devhtml</li>
   * <li>{@link GruntFile.clean}:devconfig</li>
   * <li>{@link GruntFile.less}:dev</li>
   * <li>{@link GruntFile.copy}:devmock</li>
   * <li>{@link GruntFile.jade}:dev</li>
   * <li>{@link GruntFile.express}:dev</li>
   * <li>{@link GruntFile.express}:demo</li>
   * <li>{@link GruntFile.concurrent:dev}</li>
   * </ul>
   * @name GruntFile.tasks#devmock-full
   */
  devmock: [
      'clean:devcss',
      'clean:devhtml',
      'clean:devconfig',
      'less:dev',
      'copy:devmock',
      'jade:dev',
      'express:dev',
      'concurrent:dev'
  ],
  /**
   * Converts code-comments to HTML pages in a user-friendly API doc, and also converts markdown files for general
   * instructions on the project into distributable PDFs.
   * <ul>
   * <li>{@link GruntFile.markdownpdf}:dev</li>
   * <li>{@link GruntFile.jsdoc-ng}</li>
   * </ul>
   * @name GruntFile.tasks#all-documentation
   */
  'all-documentation': [
      'markdownpdf',
      'jsdoc-ng'
  ],
  /**
   * The sequence of "test" tasks that perform unit testing, end-to-end testing, linting, and javascript style checking.
   * <ul>
   * <li>{@link GruntFile.jshint}</li>
   * <li>{@link GruntFile.jscs}</li>
   * <li>{@link GruntFile.karma}</li>
   * <li>{@link GruntFile.clean}:devcss</li>
   * <li>{@link GruntFile.clean}:devhtml</li>
   * <li>{@link GruntFile.clean}:devconfig</li>
   * <li>{@link GruntFile.less}:dev</li>
   * <li>{@link GruntFile.copy}:devmock</li>
   * <li>{@link GruntFile.jade}:dev</li>
   * <li>{@link GruntFile.concurrent:tests}</li>
   * </ul>
   * @name GruntFile.tasks#tests
   */
  tests: [
    'jshint',
    'jscs',
    'karma',
    'clean:devcss',
    'clean:devhtml',
    'clean:devconfig',
    'less:dev',
    'copy:devmock',
    'jade:dev',
    'concurrent:tests'
  ]
};
