var Text = require('../entities/text');

function Scored(game) {
  
  this.enter = function() {
    game.deleteEntity('ball');
    game.addEntity(new Text('player-scored', 'P1 SCORED'));
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
