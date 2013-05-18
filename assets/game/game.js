var Time = require('./time'),
  Physics = require('./physics'),
  Wall = require('./wall'),
  Ball = require('./ball'),
  Player = require('./player')

module.exports = function(stage) {
  var time = new Time()

  var physics = new Physics()

  var topWall = new Wall(stage, physics, 0, 0, 600, 16)
  var bottomWall = new Wall(stage, physics, 0, 384, 600, 16)
  var leftWall = new Wall(stage, physics, 0, 0, 16, 400)
  var rightWall = new Wall(stage, physics, 584, 0, 16, 400)

  physics.debugDraw()

  var ball = new Ball(stage)
  var players = []

  return {
    tick: function() {
      time.update()
      physics.update()

      ball.tick(time.delta)

      players.forEach(function(player) {
        player.tick(time.delta)
      })
    },
    playerJoin: function(data) {
      var player = new Player(stage, physics, {
        id: data.id,
        name: data.name,
        x: 50,
        y: 50
      })
      players.push(player)

      console.log('Player ' + player.name + ' joined')
    },
    playerLeave: function(data) {
      for (var i = 0; i < players.length; i++) {
        var player = players[i]
        if (player && player.id === data.id) {
          delete players[i]
          console.log('Player ' + player.name + ' left')
        }
      }
    },
    playerMove: function(data) {
      var player = _.findWhere(players, { id: data.id })
      if (player) {
        player.moveBy(data.xDelta, data.yDelta)
      }
    },
    players: function() {
      return players
    }
  }
}