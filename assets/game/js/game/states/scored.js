var ActionText = require('../entities/action-text');

function Scored(engine) {
  
  this.enter = function(playerIndex) {
    var msg = 'P' + (playerIndex + 1) + ' SCORED'
    engine.deleteEntity('ball');
    engine.addEntity(new ActionText('player-scored', msg));
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
