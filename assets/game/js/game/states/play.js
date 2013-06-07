
function Play(engine, game) {
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining -= delta;
    if (game.timeRemaining < 0) {
      game.timeRemaining = 0;
    }
    if (game.timeRemaining === 0) {
      game.transition('end');
    }
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = Play;
