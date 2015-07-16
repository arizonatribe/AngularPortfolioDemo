var utilities = require('../services/utilities.js'),
		messages = require('../services/messages.service.js');

exports.list = function(req, res, next) {
  console.log('getting messages');
  utilities.setHeaders(res);

  res.send({
    Messages: messages.get()
  });
};

exports.createMessage = function(req, res, next) {
  console.log('create message');
  utilities.setHeaders(res);

  res.json(messages.createMessage(req.body));
};
