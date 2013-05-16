var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

var fs = require('fs');

server.listen(8080);

io.sockets.on('connection', function(socket) {
  console.log('Established connection with gameview')
})

app.get('/', function(req, res) {
  res.sendfile('public/admin/index.html')
})

app.get('/game', function(req, res) {
  res.sendfile('public/game/index.html')
})

app.get('/device', function(req, res) {
  res.sendfile('builtAssets/device/index.html')
})

app.get(/\/(.*)/, function(req, res) {
  if (fs.existsSync('public/' + req.params[0])) {
    res.sendfile('public/' + req.params[0])
  } else {
    res.sendfile('builtAssets/' + req.params[0])
  }
});
