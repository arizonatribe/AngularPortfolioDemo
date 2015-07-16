var messages = require('../controllers/messages.controller');

module.exports = function(app) {
  app.route('/messages')
  .get(messages.list)
  .post(messages.createMessage);
};
