var ActionText = require('../entities/action-text');

function EndOfMatch(game) {
  
  this.enter = function() {
    game.deleteEntity('p1');
    game.deleteEntity('p2');
    game.deleteEntity('ball');
    game.addEntity(new ActionText('winner', 'John wins!'))
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };

  this.on = function(message, args) {
  };
  
}

module.exports = EndOfMatch;
