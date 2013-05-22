var _ = require('../3rdparty/underscore-min');
var Physics = require('./physics');
var Time = require('./time');
var ticker = require('./ticker');



function Sound() {
  this.play = function(file) {
    var sound = new Audio();
    sound.setAttribute('src', file);
    sound.play();
  }
}

function Engine() {

  var that = this;
  var currentGame = null;
  
  // Graphics
  this.stage = new PIXI.Stage();
  this.renderer = PIXI.autoDetectRenderer(960, 480);
  this.physics = new Physics();
  this.sound = new Sound();
  this.time = new Time()
  
  this.setGame = function(game) {
    currentGame = game;
  };

  function tick() {
    that.time.update();
    that.physics.update();
    if (currentGame) {
      currentGame.tick();
    }
    that.renderer.render(that.stage);
  }

  ticker.run(tick);
  
}

module.exports = Engine;





//
//
//
// Old code
//
//
//

/*



var world = require('./physics/world');
var Time = require('./time'),
  Physics = require('./physics'),
  arena = require('./arena'),
  Ball = require('./ball'),
  Player = require('./player'),
  Background = require('./background');
var sequencer = require('./sequencer');

var EntityTracker = function() {
  
  var entities = {};
  var lastId = 1;

  this.forEach = function(callback) {
    for (var id in entities) {
      callback(entities[id]);
    }
  };

  this.find = function(id) {
    return entities[id];
  };

  this.track = function(entity) {
    var id = entity.id || (lastId += 1)
    entities[id] = entity;
    return id;
  };

  this.forget = function(entity) {
    delete entities[entity.id];
  };
  
};

var startingXPos = [
  world.width / 12,
  world.width - world.width / 12
];

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
  physics.debugDraw($('canvas.debug')[0]);
  physics.collision(function(fixtureA, fixtureB, points) {
    var entityA = trackedEntities.find(fixtureA.GetUserData().entityId);
    var entityB = trackedEntities.find(fixtureB.GetUserData().entityId);
    if (entityA && entityB) {
      entityA.collision(entityB, points);
      entityB.collision(entityA, points);
    } else {
      console.log('Could not resolve entities: ' + fixtureA.GetUserData().entityId + ' and ' + fixtureB.GetUserData().entityId);
    }
  }.bind(this))

  arena.createRandom(this, physics);

  var ball = new Ball(this, physics);
  trackedEntities[ball.id] = ball;
  ball.start();
  
  var that = this;
  players = _.map(playersInfo, function(p, i) {
    return new Player(that, physics, {
      id: p.id,
      name: p.firstName + p.lastName,
      x: startingXPos[i],
      y: 10
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
      entity.update(time.delta);
    })

    var nextAction = null;
    while (nextAction = nextTickActions.pop()) {
      nextAction.call(this);
    }
  }

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

*/
