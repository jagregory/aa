var _               = require('../../../3rdparty/underscore-min');
var GraphicsEngine  = require('./graphics-engine');
var PhysicsEngine   = require('./physics-engine');
var SoundEngine     = require('./sound-engine');
var ParticleEngine  = require('./particle-engine');
var ticker          = require('./ticker');
var EntityTracker   = require('./entitytracker');
var Sequencer       = require('./sequencer');
var Time            = require('./time');
var hub             = require('./hub');


function GameEngine(world, sequences, players, gameView, debugView) {
  
  this.nextTickActions  = [];
  this.players          = players;
  
  this.graphics     = new GraphicsEngine(world, gameView, debugView);
  this.physics      = new PhysicsEngine(debugView);
  this.sound        = new SoundEngine();
  this.particles    = new ParticleEngine(this);
  this.sequencer    = new Sequencer(this, sequences);
  this.tracker      = new EntityTracker();
  this.time         = new Time();
    
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
    this.sequencer.transition('scored', playerIndex);
    this.players[playerIndex].score += 1;
  }.bind(this))

};

GameEngine.prototype.start = function() {
  this.sequencer.start();
  ticker.run(_.bind(this.update, this));
};

GameEngine.prototype.update = function() {
  this.time.update();
  var delta = this.time.delta;
  this.physics.update();
  this.sequencer.active().tick(delta);
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
  this.sequencer.transition(trans);
};

GameEngine.prototype.input = function(message, args) {
  this.sequencer.active().on(message, args);
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
