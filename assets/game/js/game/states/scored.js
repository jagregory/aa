var Boom       = require('../entities/boom');
var ActionText = require('../entities/action-text');
var hub        = require('../../engine/hub');

function Scored(engine, game) {
  
  this.enter = function(data) {
    engine.getEntity('stadium').shake(data.againstIndex);
    engine.addEntity(new Boom('boom', data.againstIndex));
    game.removeBall(data.ball);
    setTimeout(function() {
      backToKickoff(data.againstIndex)
    }, 400);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff(servingIndex) {
    engine.deleteEntity('boom');
    game.transition('ready', servingIndex);
  }
  
}

module.exports = Scored;
