var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var routes = require('./src/routes');
var bridge = require('./src/bridge');

var Player  = require('./src/player');
var game    = require('./src/game');

var app = express();

var logFile = fs.createWriteStream('./app.log', { flags: 'a' })

app.configure(function() {
  app.set('port', process.env.port || 8080)
  app.use(express.logger({
    format: 'default',
    stream: logFile
  }));
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
    bridge.connect(socket)
    console.log('Established connection with gameview');
  })

  socket.on('move', function(data) {
    // player moved
    var p = Player.withId(data.player);
    if (p) {
      game.send(p, data.action);
    }
  })
});

