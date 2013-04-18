var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

server.listen(8080)

var Rect = function(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    intersect: function(rect) {
      return this.left <= rect.right &&
             rect.left <= this.right &&
             this.top <= rect.bottom &&
             rect.top <= this.bottom
    }
  }
}

var Game = function() {
  var players = []
  var playing = false
  var ball = {
    position: {
      x: 1,
      y: 0.5,
    },
    velocity: {
      x: 1,
      y: 0
    },
    tick: function() {
      this.position.x += (this.velocity.x * 0.05)
      this.position.y += (this.velocity.y * 0.05)
    },
    bounds: function() {
      return new Rect(this.position.x, this.position.y, 0.05, 0.05)
    },
    intersect: function(player) {
      return player.bounds().intersect(this.bounds())
    }
  }
  var tick = function() {
    if (players.length < 2) {
      io.sockets.emit('message', 'Waiting for more players')
    } else {
      if (playing) {
        ball.tick()

        if (ball.intersect(players[0]) || ball.intersect(players[1])) {
          // reverse ball direction
          console.log('CHANGE DIRECTION!')
          ball.velocity.x *= -1
          ball.velocity.y *= -1
        }

        // do game stuff
        io.sockets.emit('tick', {
          player1: players[0],
          player2: players[1],
          ball: ball
        })
      } else {
        players[0].position = {
          x: 0.05,
          y: 0.5
        }
        players[1].position = {
          x: 1.95,
          y: 0.5
        }
        io.sockets.emit('start-game', {
          player1: players[0],
          player2: players[1],
          ball: ball
        })
        playing = true
      }
    }

    setTimeout(tick, playing ? 33 : 1000)
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
    },
    playerMove: function(player, delta) {
      console.log('moving')
      player.position.y = player.position.y + delta

      if (player.position > 1.0) {
        player.position.y = 1.0
      }

      if (player.position < 0.0) {
        player.position.y = 0.0
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
      position: {
        x: 0.0,
        y: 0.0
      },
      bounds: function() {
        var height = 0.13 // these units of measurement were a bad idea
        var width = 0.05

        return new Rect(this.position.x, this.position.y - (height / 2), width, height)
      }
    }
    game.playerJoined(player)
    notifyPlayerCount()
  })

  socket.on('move', function(data) {
    game.playerMove(player, data.delta)
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