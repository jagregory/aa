var _ = require('../../../3rdparty/underscore-min');
var GF = require('../engines/graphics-factory');
var Ball = require('../entities/ball');
var world = require('../world');

var ballStartX = world.width / 3;
var ballStartY = world.height / 3;

function KickOff(game) {
  
  var text = null;
  
  this.enter = function() {
    ball = new Ball('ball', ballStartX, ballStartY);
    game.addEntity(ball);
    text = GF.text('', 80);
    game.stage.addChild(text);
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
      text.setText(val.toString());
      setTimeout(_.partial(countdown, --val), 1000);
    }
  }
  
  function go() {
    game.stage.removeChild(text);
    var ball = game.getEntity('ball');
    ball.body.SetAwake(true);
    ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(16, 16));
    game.transition('go');
  }
  
}

module.exports = KickOff;
