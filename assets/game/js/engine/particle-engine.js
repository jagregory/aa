var _        = require('../../../3rdparty/underscore-min');
var hub      = require('./hub');
var Explosion = require('./explosion')

var ParticleEngine = function(engine) {
  hub.on('engine.explosion', function(params) {
    engine.addEntity(Explosion[params.size || 'small'](params.source))
  })
  
};

module.exports = ParticleEngine;
