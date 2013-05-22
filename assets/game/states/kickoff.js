// add the ball
// countdown 3...2...1...

var Ball = require('../ball');

function KickOff(game) {
  
  this.enter = function() {
    var ball = new Ball(game, game.engine.physics);
    game.track(ball);
    
    ball.body.SetAwake(true);
    ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(10, 10));
    
    // Display countdown 3....2...1....
    // Then kick the ball and transition
    setTimeout(function() {
      game.transition('go');
    }, 1000);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
}

module.exports = KickOff;
