// add the ball
// countdown 3...2...1...

var Ball = require('../entities/ball');

function KickOff(game) {
  
  this.enter = function() {
    var ball = new Ball(game, game.physics);
    game.track(ball);
    
    // Display countdown 3....2...1....
    // Then kick the ball and transition
    setTimeout(function() {
      ball.body.SetAwake(true);
      ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(16, 16));
      game.transition('go');
    }, 500);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = KickOff;
