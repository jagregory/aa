// add the ball
// countdown 3...2...1...

var _ = require('../../../3rdparty/underscore-min');
var Ball = require('../entities/ball');

function KickOff(game) {
  
  this.enter = function() {
    game.addEntity(new Ball('ball', game.physics));
    countdown(3);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
  function countdown(val) {
    if (val == 0) {
      go();
    } else {
      console.log(val);
      setTimeout(_.partial(countdown, --val), 1000);
    }
  }
  
  function go() {
    var ball = game.getEntity('ball');
    ball.body.SetAwake(true);
    ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(16, 16));
    game.transition('go');
  }
  
}

module.exports = KickOff;
