var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)

server.listen(8080);

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

var Ball = function(initialPosition) {
  return {
    position: initialPosition,
    velocity: {
      x: 1,
      y: 1
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
}

var Game = function() {
  var players = []
  var playing = false
  var ball = new Ball({ x: 1, y: 0.5 })

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

        if (ball.position.y >= 1.0) {
          ball.position.y = 1.0
          ball.velocity.y *= -1
        }

        if (ball.position.y <= 0.0) {
          ball.position.y = 0.0
          ball.velocity.y *= -1
        }

        if (ball.position.x >= 2.0) {
          // player 1 scores!!
          players[0].score += 1
          ball.position = {
            x: 1.0,
            y: 0.5
          }
        }

        if (ball.position.x <= 0.0) {
          // player 2 scores!!
          players[1].score += 1
          ball.position = {
            x: 1.0,
            y: 0.5
          }
        }

        // do game stuff
        io.sockets.emit('tick', {
          player1: players[0],
          player2: players[1],
          ball: ball
        })
      } else {
        players[0].position = {
          x: 0.025,
          y: 0.5
        }
        players[1].position = {
          x: 1.925,
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
    playerMove: function(player, yPosition) {
      if (player && player.position) {
        player.position.y = yPosition

        if (player.position > 1.0) {
          player.position.y = 1.0
        }

        if (player.position < 0.0) {
          player.position.y = 0.0
        }
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
    game.playerMove(player, data.position)
  })

  socket.on('disconnect', function () {
    game.playerLeft(player)
    notifyPlayerCount()
  });
})

app.get('/', function(req, res) {
  res.sendfile('public/admin/index.html')
})

app.get('/game', function(req, res) {
  res.sendfile('public/game/index.html')
})

app.get(/\/(.*)/, function(req, res) {
  res.sendfile('public/' + req.params[0])
})

var game = new Game()
game.start()