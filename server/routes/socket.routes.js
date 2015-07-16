var socketCtrl = require('../controllers/socket.controller'),
    messages = require('../controllers/messages.controller'),
    jobs = require('../controllers/jobs.controller');

module.exports = function(app, io) {
  var notificationNamespace = io.of('/api/notification'),
      sock = socketCtrl(notificationNamespace);

  app.route('/messages')
      .get(messages.list)
      .post(sock.emitNewMessage);

  app.route('/companies/:companyId/jobs/:jobId')
    .get(jobs.readApplication)
    .put(jobs.updateApplication)
    .delete(jobs.removeApplication)
    .post(sock.emitNewApplicant);
};
