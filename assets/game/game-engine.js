var _               = require('../3rdparty/underscore-min');
var PhysicsEngine   = require('./engines/physics-engine');
var SoundEngine     = require('./engines/sound-engine');
var ticker          = require('./engines/ticker');
var EntityTracker   = require('./entitytracker');
var GameStates      = require('./game-states');
var Time            = require('./time');


var GameEngine = function(data) {
  
  var renderer  = PIXI.autoDetectRenderer(960, 480);
  var stage     = new PIXI.Stage();
  var physics   = new PhysicsEngine();
  var sound     = new SoundEngine();
  var states    = new GameStates(this);
  var tracker   = new EntityTracker();
  var time      = new Time();
  
  physics.debugDraw(data.debugDraw);
  
  this.players  = data.players;  
  this.view     = renderer.view;
  
  // ----- temporary until entities don't need a ref to these engines anymore
  this.stage    = stage;
  this.physics  = physics;
  // -----
  
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

  function tick() {
    time.update();
    physics.update();
    renderer.render(stage);
    states.active().tick();
    tracker.forEach(function(entity) {
      if (entity.update) { entity.update(); }
    });
  };

  // Go!
  states.start();
  ticker.run(tick);

};

module.exports = GameEngine;
