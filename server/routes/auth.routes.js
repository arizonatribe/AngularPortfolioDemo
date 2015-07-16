var auth = require('../controllers/auth.controller');

module.exports = function(app) {
  app.route('/auth/oauth2/token')
  .post(auth.signIn);
};
