// add the ball
// countdown 3...2...1...

var Ball = require('../ball');

function KickOff(game) {
  
  this.enter = function() {
    game.track(new Ball(game, game.engine.physics));
    // Display countdown 3....2...1....
    // Then kick the ball and transition
    setTimeout(function() {
      game.transition('go');
    }, 1000);
  };
  
  this.exit = function() {
  };
  
}

module.exports = KickOff;
