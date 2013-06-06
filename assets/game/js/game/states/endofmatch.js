var ActionText  = require('../entities/action-text');
var hub         = require('../../engine/hub');

function EndOfMatch(game, engine) {
  
  this.enter = function() {
    engine.deleteEntity('p1');
    engine.deleteEntity('p2');
    engine.deleteEntity('ball');
    engine.addEntity(new ActionText('winner', 'John wins!'));
    setTimeout(finish, 3000);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };

  this.on = function(message, args) {
  };
  
  function finish() {
    hub.send('finish');
  }
  
}

module.exports = EndOfMatch;
