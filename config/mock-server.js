process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./express'),
    http = require('http'),
    socketio = require('socket.io');

var app = express();

var server = http.createServer(app);
var io = socketio.listen(server);

require('./socketio')(server, io);
require('../server/routes/socket.routes.js')(app, io);

server.listen(3030);

module.exports = server;
