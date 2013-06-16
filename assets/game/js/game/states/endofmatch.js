var ActionText  = require('../entities/action-text');
var hub         = require('../../engine/hub');

function EndOfMatch(engine, game) {
  
  this.enter = function() {
    engine.deleteEntity('ball');
    engine.addEntity(new ActionText('winner', winner()));
    setTimeout(finish, 4000);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };

  this.on = function(message, args) {
  };

  function winner() {
    var p1 = game.players[0];
    var p2 = game.players[1];
    if (p1.score > p2.score) {
      return p1.name + ' wins!';
    } else if (p1.score < p2.score) {
      return p2.name + ' wins!';
    } else {
      return 'Draw!';
    }
  }
  
  function finish() {
    hub.send('game.finish');
  }
  
}

module.exports = EndOfMatch;
