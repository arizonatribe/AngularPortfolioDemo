/**
 * Uses your machine's default implementation of notification alerts to let you know about errors in Grunt tasks. In
 * Windows 8.1 this is the familiar sliding rectangles you see in the top right of your screen when you receive an email
 * or complete an installation of a new piece of software. Using this module keeps you from having to stare at the
 * command line until it finishes your Grunt tasks. Instead you run you task and then go back to the browser, only
 * receiving an alert when they're a problem with the tasks.
 * @name GruntFile.notify_hooks
 */
module.exports = {
  options: {
    enabled: true,
    MAX_JSHINT_NOTIFICATIONS: 5,
    success: false
  }
};
