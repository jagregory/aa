var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var routes = require('./src/routes');
var bridge = require('./src/bridge');

var app = express();

app.configure(function() {
  app.set('port', process.env.port || 8080)
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.compress());
  app.use(express.static('public'));
  app.use(express.static('builtAssets'));
});

routes.register(app);

var server = http.createServer(app);
var io = socketio.listen(server);

server.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});

io.sockets.on('connection', function(socket) {
  bridge.connect(socket);
  console.log('Established connection with gameview');
});

