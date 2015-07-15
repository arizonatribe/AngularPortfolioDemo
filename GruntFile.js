/**
 * @namespace GruntFile
 */
module.exports = function(grunt) {

  // Grunt tasks are separated into individual files in the ./grunt directory and automatically collected and used to configure Grunt
  require('load-grunt-config')(grunt, {
    data: {
      // pkg.name used in some template stamping
      pkg: grunt.file.readJSON('package.json')
    }
  });

  // Saves the need for manually entering the "loadNpmTasks('my-grunt-task')" each time a new grunt plugin is installed (reducing the likelihood of a build breaking due to forgetting to load the task)
  require('load-grunt-tasks')(grunt);

  // Although tasks are registered automatically, custom tasks are placed in the ./grunt/aliases.js file
};
