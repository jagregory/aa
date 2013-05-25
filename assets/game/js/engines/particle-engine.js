var _        = require('../../../3rdparty/underscore-min');
var hub      = require('../hub');
var Explosion = require('../entities/explosion')

var ParticleEngine = function(game) {
  
  hub.on('particles:explosion', function(params) {
    game.addEntity(new Explosion(params.source))
  });
  
};

module.exports = ParticleEngine;
