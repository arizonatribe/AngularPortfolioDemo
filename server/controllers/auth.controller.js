var utilities = require('../services/utilities.js'),
    authService = require('../services/auth.service.js'),
	_ = require('underscore');

exports.signIn = function(req, res, next) {
  console.log('signing in');
  utilities.setHeaders(res);

  var errorMessages = authService.validateToken(req);

  if (!errorMessages.length) {
    res.send({
      access_token: authService.getUser(req).access_token,
      refresh_token: utilities.generateUUID(),
      refresh_token_expires_in: 900,
      token_type: 'Bearer'
    });
  } else {
    _.each(errorMessages, console.error);
    res.status(400).send({
      Message: errorMessages.join('\n')
    });
  }
};
