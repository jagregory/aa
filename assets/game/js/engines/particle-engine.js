var _        = require('../../../3rdparty/underscore-min');
var hub      = require('../hub');
var Particle = require('./Particle');

var ParticleEngine = function(game) {
  
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
