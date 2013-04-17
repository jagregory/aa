var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

server.listen(8080)

var Game = function() {
  var players = []
  var playing = false
  var tick = function() {
    if (players.length < 2) {
      io.sockets.emit('message', 'Waiting for more players')
    } else {
      if (playing) {
        // do game stuff
      } else {
        io.sockets.emit('start-game', {
          player1: players[0],
          player2: players[1]
        })
        playing = true
      }
    }

    setTimeout(tick, playing)
  }

  return {
    start: function() {
      tick()
    },
    playerCount: function() {
      return players.length
    },
    playerJoined: function(player) {
      players.push(player)
    },
    playerLeft: function(player) {
      var index = players.indexOf(player)

      if (index >= 0) {
        players.splice(index, 1)
      }
    }
  }
}

var notifyPlayerCount = function() {
  io.sockets.emit('user-count', {
    count: game.playerCount()
  })
}

io.sockets.on('connection', function(socket) {
  console.log('User connected')
  notifyPlayerCount()

  var player = null

  socket.on('join', function(data) {
    player = {
      id: new Date().getTime(),
      username: data.username,
      socketId: socket.id,
      score: 0,
      position: 0.5
    }
    game.playerJoined(player)
    notifyPlayerCount()
  })

  socket.on('disconnect', function () {
    game.playerLeft(player)
    notifyPlayerCount()
  });
})

app.get('/', function(req, res) {
  res.sendfile('public/index.html')
})

app.get(/\/(.*)/, function(req, res) {
  res.sendfile('public/' + req.params[0])
})

var game = new Game()
game.start()