var Boom       = require('../entities/boom');
var ActionText = require('../entities/action-text');

function Scored(engine, game) {
  
  this.enter = function(playerIndex) {
    game.score(playerIndex);
    engine.deleteEntity('ball');
    engine.addEntity(new Boom('boom', playerIndex));
    setTimeout(function() {
      backToKickoff(playerIndex)
    }, 400);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff(playerIndex) {
    engine.deleteEntity('boom');
    game.transition('ready', playerIndex);
  }
  
}

module.exports = Scored;
