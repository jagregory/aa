var _           = require('../../../../3rdparty/underscore-min');
var GF          = require('../../engine/graphics-factory');
var hub         = require('../../engine/hub');
var Ball        = require('../entities/ball');
var ActionText  = require('../entities/action-text');
var world       = require('../world');

function KickOff(engine, game) {
  
  var ball = null;
  var text = null;

  var ballStartY = world.height / 2;
  var ballStartX = null
  var ballDirection = null
  
  this.enter = function(lastScoringPlayerId) {
    if (lastScoringPlayerId === 0) {
      ballStartX = (world.width / 5) * 4
      ballDirection = -1
    } else {
      ballStartX = world.width / 5
      ballDirection = 1
    }

    ball = new Ball('ball', ballStartX, ballStartY);
    text = new ActionText('countdown', '');
    engine.addEntity(ball);
    engine.addEntity(text);
    countdown(3);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
  function countdown(val) {
    if (val == 0) {
      go();
    } else {
      text.set(val.toString());
      setTimeout(_.partial(countdown, --val), 600);
    }
  }
  
  function go() {
    hub.send('engine.sound.play', {file: '/game/sounds/whistle.mp3'});
    engine.deleteEntity('countdown');
    ball.body.SetAwake(true);
    ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(16 * ballDirection, 16 * ballDirection));
    game.transition('go');
  }
  
}

module.exports = KickOff;
