var Boom       = require('../entities/boom');
var ActionText = require('../entities/action-text');
var hub        = require('../../engine/hub');

function Scored(engine, game) {
  
  this.enter = function(data) {
    game.score(data.playerIndex);
    engine.getEntity('stadium').shake(data.playerIndex);
    engine.addEntity(new Boom('boom', data.playerIndex));
    game.removeBall(data.ball);
    setTimeout(function() {
      backToKickoff(data.playerIndex)
    }, 400);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
  function backToKickoff(playerIndex) {
    engine.deleteEntity('boom');

    if (game.ballsInPlay.length >= 1) {
      game.transition('go');
    } else {
      game.transition('ready', playerIndex);
    }
  }
  
}

module.exports = Scored;
