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

  this.forEach = function(callback) {
    for (var id in entities) {
      callback(entities[id])
    }
  }

  this.find = function(id) {
    return entities[id]
  }

  this.track = function(entity) {
    var id = entity.id || (lastId += 1)
    entities[id] = entity
    return id
  }

  this.forget = function(entity) {
    delete entities[entity.id]
  }
}

var Game = function(stage, playersInfo) {
  
  this.stage = stage;

  var nextTickActions = []
  var trackedEntities = new EntityTracker()
  this.trackEntity = function(entity) {
    return trackedEntities.track(entity)
  }
  this.forgetEntity = function(entity) {
    trackedEntities.forget(entity)
  }

  var time = new Time()
  this.background = new Background(this)

  var physics = new Physics()
  // physics.debugDraw($('#debugCanvas')[0])
  physics.collision(function(fixtureA, fixtureB, points) {
    var entityA = trackedEntities.find(fixtureA.GetUserData().entityId)
    var entityB = trackedEntities.find(fixtureB.GetUserData().entityId)

    entityA.collision(entityB, points)
    entityB.collision(entityA, points)
  }.bind(this))

  var arena = Arena.random()(this, physics)
  console.log('Using arena: ' + arena.name)

  var ball = new Ball(this);
  
  var that = this;
  players = playersInfo.map(function(p) {
    return new Player(that, physics, {
      id: p.id,
      name: p.firstName + p.lastName,
      x: 5,
      y: 5
    })
  });

  trackedEntities[players[0].id] = players[0];
  trackedEntities[players[1].id] = players[1];

  this.queueNextAction = function(action) {
    nextTickActions.push(action)
  }

  this.tick = function() {
    time.update()
    physics.update()
    this.background.update(time.delta)

    trackedEntities.forEach(function(entity) {
      entity.update(time.delta)      
    })

    var nextAction = null
    while (nextAction = nextTickActions.pop()) {
      nextAction.call(this)
    }
  }

  // this.playerJoin = function(data) {
  //   var player = new Player(this, physics, {
  //     userId: data.id,
  //     name: data.name,
  //     x: 5,
  //     y: 5
  //   })
  //   trackedEntities[player.id] = player
  //   players.push(player)
  // 
  //   console.log('Player ' + player.name + ' joined')
  // }
  // 
  // this.playerLeave = function(data) {
  //   for (var i = 0; i < players.length; i++) {
  //     var player = players[i]
  //     if (player && player.userId === data.id) {
  //       delete players[i]
  //       delete trackedEntities[player.id]
  //       console.log('Player ' + player.name + ' left')
  //     }
  //   }
  // }

  this.playerMove = function(index, vector) {
    console.log('Player ' + index + ' moving (' + vector.x + ',' + vector.y + ')');
    players[index].moveBy(vector.x, vector.y)
  };
  
}

Game.prototype.playSound = function(file) {
  var sound = new Audio()
  sound.setAttribute('src', file)
  sound.play()
}

module.exports = Game