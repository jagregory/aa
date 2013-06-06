var ActionText = require('../entities/action-text');

function Scored(game, engine) {
  
  this.enter = function(playerIndex) {
    game.score(playerIndex);
    engine.deleteEntity('ball');
    engine.addEntity(new ActionText('player-scored', 'P' + (playerIndex + 1) + ' SCORED'));
    setTimeout(backToKickoff, 1500);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff() {
    engine.deleteEntity('player-scored');
    engine.transition('ready');
  }
  
}

module.exports = Scored;
