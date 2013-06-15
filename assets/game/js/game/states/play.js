var hub = require('../../engine/hub');

var FINAL_COUNTDOWN = 12 * 1000;

function Play(engine, game) {
  
  var finishing = false;
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining -= delta;
    if (game.timeRemaining < 0) {
      game.timeRemaining = 0;
    }
    if (!finishing && game.timeRemaining < FINAL_COUNTDOWN) {
      hub.send('game.finishing');
      finishing = true;
    }
    if (game.timeRemaining === 0) {
      hub.send('game.end');
    }
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = Play;
