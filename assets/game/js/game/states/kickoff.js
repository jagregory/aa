var _           = require('../../../../3rdparty/underscore-min');
var GF          = require('../../engine/graphics-factory');
var hub         = require('../../engine/hub');
var Ball        = require('../entities/ball');
var ActionText  = require('../entities/action-text');
var world       = require('../world');
var MathUtils   = require('../../engine/math-utils')

function KickOff(engine, game) {
  
  var balls = [];
  var text = null;

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

    var ballStartY = world.height / 2;
    // var ballCount = game.roundNumber // one extra ball for every goal scored
    var ballCount = Math.ceil(game.roundNumber / 2) // every nth goal ups the ball count (n = 2)

    for (var i = 0; i < ballCount; i++) {
      if (i % 2 == 0) {
        ballStartY += i + 0.5
      } else {
        ballStartY -= i + 0.5
      }

      var ball = new Ball('ball:'+i, ballStartX, ballStartY)
      balls.push(ball)
      engine.addEntity(ball)
    }

    text = new ActionText('countdown', '');
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

    balls.forEach(function(ball) {
      ball.body.SetAwake(true);
      ball.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(25 * ballDirection, MathUtils.randomBetween(2, 10)));
      ball.body.SetAngularVelocity(MathUtils.randomBetween(4, 10));  
    })
    game.transition('go');
  }
  
}

module.exports = KickOff;
