var Boom       = require('../entities/boom');
var ActionText = require('../entities/action-text');

function Scored(engine, game) {
  
  this.enter = function(playerIndex) {
    game.score(playerIndex);
    engine.addEntity(new Boom('boom', playerIndex));
    engine.addEntity(new ActionText('player-scored', 'P' + (playerIndex + 1) + ' SCORED'));
    setTimeout(function() {
      backToKickoff(playerIndex)
    }, 1200);
  };
  
  this.exit = function() {
    engine.deleteEntity('ball');
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff(playerIndex) {
    engine.deleteEntity('boom');
    engine.deleteEntity('player-scored');
    game.transition('ready', playerIndex);
  }
  
}

module.exports = Scored;
