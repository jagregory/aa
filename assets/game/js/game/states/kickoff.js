var _ = require('../../../../3rdparty/underscore-min');
var GF = require('../../engine/graphics-factory');
var Ball = require('../entities/ball');
var ActionText = require('../entities/action-text');
var game = require('../game');

var ballStartX = game.world.width / 5;
var ballStartY = game.world.height / 2;

function KickOff(engine) {
  
  var ball = null;
  var text = null;
  
  this.enter = function() {
    ball = new Ball('ball', ballStartX, ballStartY);
    text = new ActionText('countdown', '');
    engine.addEntity(ball);
    engine.addEntity(text);
    countdown(3);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
    if (message === 'move') {
      var player = engine.getEntity(args.pindex === 0 ? 'p1' : 'p2');
      player.move(args.dir);
    } else if (message === 'stop') {
      var player = engine.getEntity(args.pindex === 0 ? 'p1' : 'p2');
      player.stop();
    }
  };
  
  function countdown(val) {
    if (val == 0) {
      go();
    } else {
      text.set(val.toString());
      setTimeout(_.partial(countdown, --val), 1000);
    }
  }
  
  function go() {
    engine.deleteEntity('countdown');
    ball.body.SetAwake(true);
    ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(16, 16));
    engine.transition('go');
  }
  
}

module.exports = KickOff;
