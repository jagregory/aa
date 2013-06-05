var ActionText = require('../entities/action-text');

function Scored(game) {
  
  this.enter = function(playerIndex) {
    game.deleteEntity('ball');
    var msg = 'P' + (playerIndex + 1) + ' SCORED'
    game.addEntity(new ActionText('player-scored', msg));
    setTimeout(backToKickoff, 1500);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff() {
    game.deleteEntity('player-scored');
    game.transition('ready');
  }
  
}

module.exports = Scored;
