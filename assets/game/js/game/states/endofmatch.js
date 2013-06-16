var Winner  = require('../entities/winner');
var hub     = require('../../engine/hub');

function EndOfMatch(engine, game) {
  
  this.enter = function() {
    engine.deleteEntityMatching(/^ball:/);
    engine.addEntity(new Winner('winner', game.players[0], game.players[1]));
    setTimeout(finish, 4000);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };

  this.on = function(message, args) {
  };
  
  function finish() {
    hub.send('game.finish');
  }
  
}

module.exports = EndOfMatch;
