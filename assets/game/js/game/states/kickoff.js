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
    game.clearBalls()
    firstBall = game.createBall(pitchPosition, 0)

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
  
}

module.exports = KickOff;
