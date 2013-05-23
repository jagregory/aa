var _        = require('../../../3rdparty/underscore-min');
var hub      = require('../hub');
var Particle = require('./Particle');

var ParticleEngine = function(game) {
  
  //
  // TODO: particles should be more like other entities
  //
  // ex: a ParticleSystem or ParticleEmitter which is a CompoundEntity
  // it can create all its particles on create()
  // and update them all on update()
  // and when they've all "died", it can destroy itself
  // which destroys all the children
  //
  // this should also suit "continuous" particle systems
  // where the compound emitter can manage a "pool" of child particles
  // and the main game loop doens't have to care
  //
  
  function waterfall(xMin, xMax, height, duration) {
    
  };
  
  function explosion(args) {
    var source = { x: args.source.x, y: args.source.y };
    for (var i = 0; i < args.intensity; i++) {
      var xdir = (Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1);
      var ydir = (Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1);
      var particle = new Particle(game, game.physics, source);
      particle.moveBy(xdir, ydir);
      game.addEntity(particle);
    }
  };
  
  hub.on('particles:explosion', explosion);
  
};

module.exports = ParticleEngine;
