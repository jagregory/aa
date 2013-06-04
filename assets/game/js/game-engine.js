var _               = require('../../3rdparty/underscore-min');
var GraphicsEngine  = require('./engines/graphics-engine');
var PhysicsEngine   = require('./engines/physics-engine');
var SoundEngine     = require('./engines/sound-engine');
var ParticleEngine  = require('./engines/particle-engine');
var ticker          = require('./engines/ticker');
var EntityTracker   = require('./entitytracker');
var GameStates      = require('./game-states');
var Time            = require('./time');
var world           = require('./world');
var hub             = require('./hub');


function GameEngine(data) {
  
  this.nextTickActions  = [];
  this.players          = data.players;  
  
  this.graphics  = new GraphicsEngine(data.world, data.gameView, data.debugView);
  this.physics   = new PhysicsEngine(data.debugView);
  this.sound     = new SoundEngine();
  this.particles = new ParticleEngine(this);
  this.states    = new GameStates(this);
  this.tracker   = new EntityTracker();
  this.time      = new Time();
    
  this.physics.collision(function(fixtureA, fixtureB, points) {
    var entityA = fixtureA.GetUserData();
    var entityB = fixtureB.GetUserData();
    if (entityA && entityB) {
      entityA.collision(entityB, points);
      entityB.collision(entityA, points);      
    }
  });
   
  hub.interceptor = _.bind(this.queueNext, this);
  
  hub.on('entity:destroy', function(params) {
    this.deleteEntity(params.entity.id)
  }.bind(this))

  hub.on('score', function(params) {
    var playerIndex = 1 - params.against;
    this.states.transition('scored', playerIndex);
    this.players[playerIndex].score += 1;
  }.bind(this))

};

GameEngine.prototype.start = function() {
  this.states.start();
  ticker.run(_.bind(this.update, this));
};

GameEngine.prototype.update = function() {
  this.time.update();
  this.physics.update();
  this.states.active().tick();
  var delta = this.time.delta;
  this.tracker.forEach(function(entity) {
    if (entity.update) {
      entity.update(delta);
    }
  });
  this.graphics.render();
  
  var nextAction = null;
  while (nextAction = this.nextTickActions.pop()) {
    nextAction.call(this);
  }
};

GameEngine.prototype.transition = function(trans) {
  this.states.transition(trans);
};

GameEngine.prototype.input = function(message, args) {
  this.states.active().on(message, args);
};

GameEngine.prototype.queueNext = function(action) {
  this.nextTickActions.push(action);
};


GameEngine.prototype.forget = function(entity) {
  this.tracker.forget(entity);
};

GameEngine.prototype.addEntity = function(entity) {
  if (entity.id) {
    this.tracker.track(entity);
    if (entity.create) {
      entity.create(this.physics, this.graphics);
    }
  } else {
    console.log('Entity should have an ID', entity);
  }
};

GameEngine.prototype.deleteEntity = function(id) {
  var entity = this.tracker.find(id);
  if (entity) {
    if (entity.destroy) {
      entity.destroy(this.physics, this.graphics);
    }
    this.tracker.forget(entity);
  } else {
    console.log('Entity not found', entity);
  }
};

GameEngine.prototype.getEntity = function(id) {
  return this.tracker.find(id);
};


module.exports = GameEngine;
