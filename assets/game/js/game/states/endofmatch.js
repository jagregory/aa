var ActionText = require('../entities/action-text');

function EndOfMatch(engine) {
  
  this.enter = function() {
    engine.deleteEntity('p1');
    engine.deleteEntity('p2');
    engine.deleteEntity('ball');
    engine.addEntity(new ActionText('winner', 'John wins!'))
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };

  this.on = function(message, args) {
  };
  
}

module.exports = EndOfMatch;
