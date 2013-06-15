var Boom       = require('../entities/boom');
var ActionText = require('../entities/action-text');
var hub        = require('../../engine/hub');

function Scored(engine, game) {
  
  this.enter = function(playerIndex) {
    game.score(playerIndex);
    hub.send('engine.sound.play', '/game/sounds/crowd-cheering.mp3');
    engine.getEntity('stadium').shake(playerIndex);
    engine.addEntity(new Boom('boom', playerIndex));
    engine.deleteEntity('ball');
    setTimeout(function() {
      backToKickoff(playerIndex)
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
    game.transition('ready', playerIndex);
  }
  
}

module.exports = Scored;
