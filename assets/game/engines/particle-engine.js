var Particle = require('./Particle');

var ParticleEngine = function(game) {
  
  this.waterfall = function(xMin, xMax, height, duration) {
    
  };
  
  this.explosion = function(args) {
    var source = { x: args.source.x, y: args.source.y };
    for (var i = 0; i < args.intensity; i++) {
      var xdir = (Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1);
      var ydir = (Math.random() * 50) * (Math.random() < 0.5 ? -1 : 1);
      var particle = new Particle(game, game.physics, source);
      particle.moveBy(xdir, ydir);
      game.track(particle);
    }
  };
  
};

module.exports = ParticleEngine;
