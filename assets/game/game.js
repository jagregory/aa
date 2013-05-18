var Time = require('./time'),
  Physics = require('./physics'),
  Arena = require('./arena'),
  Ball = require('./ball'),
  Player = require('./player')

require('./arenas/standardArena')

module.exports = function(stage) {
  var time = new Time()
  var physics = new Physics()

  physics.collision(function(a, b) {
    console.log('something collided')
  })

  var arena = Arena.random()(stage, physics)

  console.log('Using arena: ' + arena.name)

  physics.debugDraw($('#debugCanvas')[0])

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
        x: 5,
        y: 5
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