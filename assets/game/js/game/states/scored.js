var Boom       = require('../entities/boom');
var ActionText = require('../entities/action-text');
var hub        = require('../../engine/hub');

function Scored(engine, game) {
  
  this.enter = function(data) {
    engine.getEntity('stadium').shake(data.againstIndex);
    engine.addEntity(new Boom('boom' + data.ball.id, data.againstIndex));
    game.removeBall(data.ball);
    
    if (game.ballsInPlay.length >= 1) {
      setTimeout(function() {
        game.transition('go');
      }, 1);
    } else {
      setTimeout(function() {
        game.transition('ready', data.againstIndex);
      }, 1);
    }
    
    setTimeout(function() {
      engine.deleteEntity('boom' + data.ball.id);
    }, 400);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = Scored;
