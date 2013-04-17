var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

server.listen(8080)

var players = []

var notifyPlayerCount = function() {
  io.sockets.emit('user-count', {
    count: players.length
  })
}

io.sockets.on('connection', function(socket) {
  console.log('User connected')
  var user = null

  socket.on('join', function(data) {
    user = {
      id: new Date().getTime(),
      username: data.username
    }
    players.push(user)

    notifyPlayerCount()
  })

  socket.on('disconnect', function () {
    var index = players.indexOf(user)

    if (index >= 0) {
      players.splice(index, 1)
    }

    notifyPlayerCount()
  });
})

app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

app.get(/\/(.*)/, function(req, res) {
  res.sendfile('public/' + req.params[0])
})

// var tick = function() {
//   console.log('tick')
// }

// setInterval(tick, 33)