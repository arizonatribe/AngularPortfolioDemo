module.exports = function(server, io) {
  var notificationNamespace = io.of('/api/notification');

  notificationNamespace.use(function(socket, next) {
    var data = socket.request;

    next();
  });

  notificationNamespace.on('connection', function(socket) {
    //require('../server/controllers/socket.controller')(notificationNamespace);
  });
};
