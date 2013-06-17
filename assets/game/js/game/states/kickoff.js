var _           = require('../../../../3rdparty/underscore-min');
var GF          = require('../../engine/graphics-factory');
var hub         = require('../../engine/hub');
var Ball        = require('../entities/ball');
var ActionText  = require('../entities/action-text');
var world       = require('../world');

function KickOff(engine, game) {
  var text = null;
  var firstBall = null
  var ballDirection = null
  
  this.enter = function(lastScoringPlayerId) {
    var pitchPosition = (lastScoringPlayerId === 0) ? -1 : 1
    ballDirection = pitchPosition * -1
    firstBall = createBall(pitchPosition, 0);

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

    firstBall.kick(ballDirection)
    game.transition('go');
  }
  
  function createBall(x, y) {
    var ballStartY = null
    var ballStartX = null

    if (x === -1) {
      ballStartX = world.width / 5
    } else if (x === 0) {
      ballStartX = world.width / 2
    } else {
      ballStartX = (world.width / 5) * 4
    }

    if (y === -1) {
      ballStartY = world.height / 5
    } else if (y === 0) {
      ballStartY = world.height / 2
    } else {
      ballStartY = (world.height / 5) * 4
    }

    var ball = new Ball('ball:' + game.ballsInPlay.length, ballStartX, ballStartY);
    engine.addEntity(ball);
    game.ballsInPlay.push(ball);
    return ball;
  }

  
}

module.exports = KickOff;
