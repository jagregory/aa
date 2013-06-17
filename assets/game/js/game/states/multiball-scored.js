var Boom              = require('../entities/boom');
var mathUtils         = require('../../engine/math-utils');
var hub               = require('../../engine/hub');

function MultiBallScored(engine, game) {
    
  this.enter = function(data) {
    engine.getEntity('stadium').shake(data.againstIndex);
    engine.addEntity(new Boom('boom', data.againstIndex));
    game.removeBall(data.ball);
    var ballStartX = world.width / mathUtils.randomBetween(1, 5);
    var ballStartY = world.height / mathUtils.randomBetween(1, 5);
    var ball = new Ball('ball:' + game.ballsInPlay.length, ballStartX, ballStartY);
    engine.addEntity(ball);
    game.ballsInPlay.push(ball);
    ball.kick(1);
    setTimeout(function() {
      engine.deleteEntity('boom');
    }, 400);
    setTimeout(function() {
      game.transition('go');
    }, 1);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
}

module.exports = MultiBallScored;
