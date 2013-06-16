var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var routes = require('./src/routes');
var bridge = require('./src/bridge');

var Player  = require('./src/player');
var game    = require('./src/game');

var app = express();

app.configure(function() {
  app.set('port', process.env.port || 8080)
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.compress());
  app.use(express.static('builtAssets'));
});

routes.register(app);

var server = http.createServer(app);
var io = socketio.listen(server);

server.listen(app.get('port'), function() {
  console.log('Server started: http://' + server.address().address + ':' + server.address().port);
});

io.sockets.on('connection', function(socket) {
  socket.on('identify', function() {
    // gameview has identified itself
    console.log('identify')
    bridge.connect(socket)
  })

  socket.on('move', function(data) {
    // player moved
    console.log('player moved', data.player, data.action)

    var p = Player.withId(data.player);
    if (p) {
      game.send(p, data.action);
    }
  })

  console.log('Established connection with gameview');
});

