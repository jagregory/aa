var ActionText = require('../entities/action-text');

function Scored(engine, game) {
  
  this.enter = function(playerIndex) {
    game.score(playerIndex);
    engine.deleteEntity('ball');
    engine.addEntity(new ActionText('player-scored', 'P' + (playerIndex + 1) + ' SCORED'));
    setTimeout(function() {
      backToKickoff(playerIndex)
    }, 1500);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff(playerIndex) {
    engine.deleteEntity('player-scored');
    game.transition('ready', playerIndex);
  }
  
}

module.exports = Scored;
