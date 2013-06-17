var mathUtils         = require('../../engine/math-utils');

function Play(engine, game) {
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining = Math.max(game.timeRemaining - delta, 0);
    if (game.timeRemaining < 15000) {
      game.transition('multiball');
    } else if (game.timeRemaining === 0) {
      hub.send('game.end');
    }
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = Play;
