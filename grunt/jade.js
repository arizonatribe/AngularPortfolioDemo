/**
 * Converts Jade templates (Node templating engine) into HTML files.
 * @name GruntFile.jade
 */
module.exports = {
  dev: {
    options: {
      data: {
        debug: true
      }
    },
    files: {
      'public/app/index.html': ['public/app/index.jade'],
      'public/app/components/login/templates/content.template.html': ['public/app/components/login/templates/content.template.jade'],
      'public/app/shared/templates/error.template.html': ['public/app/shared/templates/error.template.jade']
    }
  },
  release: {
    options: {
      data: {
        debug: false
      }
    },
    files: {
      'dist/index.html': ['dist/index.jade'],
      'dist/components/login/templates/content.template.html': ['public/app/components/login/templates/content.template.jade'],
      'dist/shared/templates/error.template.html': ['public/app/shared/templates/error.template.jade']
    }
  }
};
