var Time = require('./time'),
  Physics = require('./physics'),
  Arena = require('./arena'),
  Ball = require('./ball'),
  Player = require('./player'),
  Background = require('./background')

require('./arenas/standardArena')

var EntityTracker = function() {
  var entities = {}
  var lastId = 1

  this.track = function(entity) {
    var id = entity.id || (lastId += 1)
    entities[id] = entity
    return id
  }

  this.forget = function(entity) {
    delete entities[entity.id]
  }
}

var Game = function(stage) {
  this.stage = stage

  var trackedEntities = new EntityTracker()
  this.trackEntity = function(entity) {
    trackedEntities.track(entity)
  }
  this.forgetEntity = function(entity) {
    trackedEntities.forget(entity)
  }

  var time = new Time()
  var background = new Background(this)

  var physics = new Physics()
  physics.debugDraw($('#debugCanvas')[0])
  physics.collision(function(a, b) {
    console.log('something collided')
    var entityA = trackedEntities[a.GetUserData().entityId]
    var entityB = trackedEntities[b.GetUserData().entityId]
  }.bind(this))

  var arena = Arena.random()(this, physics)
  console.log('Using arena: ' + arena.name)

  var ball = new Ball(this)
  var players = []

  this.tick = function() {
    time.update()
    physics.update()
    background.update(time.delta)
    ball.tick(time.delta)
    players.forEach(function(player) {
      player.tick(time.delta)
    })
  }

  this.playerJoin = function(data) {
    var player = new Player(this, physics, {
      userId: data.id,
      name: data.name,
      x: 5,
      y: 5
    })
    trackedEntities[player.id] = player
    players.push(player)

    console.log('Player ' + player.name + ' joined')
  }

  this.playerLeave = function(data) {
    for (var i = 0; i < players.length; i++) {
      var player = players[i]
      if (player && player.userId === data.id) {
        delete players[i]
        delete trackedEntities[player.id]
        console.log('Player ' + player.name + ' left')
      }
    }
  }

  this.playerMove = function(data) {
    var player = _.findWhere(players, { userId: data.id })
    if (player) {
      player.moveBy(data.xDelta, data.yDelta)
    }
  }
}

module.exports = Game