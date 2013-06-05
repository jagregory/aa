var _        = require('../../../3rdparty/underscore-min');
var hub      = require('./hub');
var Explosion = require('./explosion')

var ParticleEngine = function(game) {
  
  hub.on('particles:explosion', function(params) {
    game.addEntity(Explosion[params.size || 'small'](params.source))
  })
  
};

module.exports = ParticleEngine;
