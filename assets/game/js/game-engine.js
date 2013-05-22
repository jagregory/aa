var _               = require('../../3rdparty/underscore-min');
var PhysicsEngine   = require('./engines/physics-engine');
var SoundEngine     = require('./engines/sound-engine');
var ParticleEngine  = require('./engines/particle-engine');
var ticker          = require('./engines/ticker');
var EntityTracker   = require('./entitytracker');
var GameStates      = require('./game-states');
var Time            = require('./time');


var GameEngine = function(data) {
  
  var renderer  = PIXI.autoDetectRenderer(960, 480);
  var stage     = new PIXI.Stage();
  var physics   = new PhysicsEngine();
  var sound     = new SoundEngine();
  var particles = new ParticleEngine(this);
  var states    = new GameStates(this);
  var tracker   = new EntityTracker();
  var time      = new Time();
  
  var nextTickActions = [];
  
  physics.debugDraw(data.debugDraw);
  
  this.players  = data.players;  
  this.view     = renderer.view;
  
  // ----- temporary until entities don't need a ref to these engines anymore
  this.stage    = stage;
  this.physics  = physics;
  // -----
  
  physics.collision(function(fixtureA, fixtureB, points) {
    var entityA = tracker.find(fixtureA.GetUserData().entityId);
    var entityB = tracker.find(fixtureB.GetUserData().entityId);
    //console.log('[collision] ' + fixtureA.GetUserData().entityId + ' / ' + fixtureB.GetUserData().entityId);
    if (entityA && entityA.collision) {
      entityA.collision(entityB, points);
    }
    if (entityB && entityB.collision) {
      entityB.collision(entityA, points);      
    }
  });
  
  this.track = function(entity) {
    tracker.track(entity);
  };

  this.forget = function(entity) {
    tracker.forget(entity);
  };

  this.getEntity = function(id) {
    return tracker.find(id);
  };
  
  this.transition = function(trans) {
    states.transition(trans);
  };

  this.input = function(message, args) {
    states.active().on(message, args);
  };

  this.broadcast = function(message, args) {
    console.log('[engine] received ', message, args )
    if (message === 'sound:play') {
      sound.play(args);
    } else if (message === 'particles:explosion') {
      queueNext(function() { particles.explosion(args); });
    }
  };

  function queueNext(action) {
    nextTickActions.push(action);
  }

  function tick() {
    time.update();
    physics.update();
    renderer.render(stage);
    states.active().tick();
    tracker.forEach(function(entity) {
      if (entity.update) { entity.update(time.delta); }
    });
    var nextAction = null;
    while (nextAction = nextTickActions.pop()) {
      nextAction.call(this);
    }
  };

  // Go!
  states.start();
  ticker.run(tick);

};

module.exports = GameEngine;
