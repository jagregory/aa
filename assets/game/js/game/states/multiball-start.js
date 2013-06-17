var ActionText  = require('../entities/action-text');
var hub         = require('../../engine/hub');

function MultiBallStart(engine, game) {
  
  this.enter = function() {
    engine.addEntity(new ActionText('multiball', 'Multi-ball!'));
    hub.send('engine.sound.play', { file: '/game/sounds/multiball.mp3', volume: 0.7 })
    setTimeout(function() {
      engine.deleteEntity('multiball');
      for (var i = 0; i < 4; ++i) {
        var ballStartX = world.width / mathUtils.randomBetween(1, 5);
        var ballStartY = world.height / mathUtils.randomBetween(1, 5);
        var ball = new Ball('ball:' + game.ballsInPlay.length, ballStartX, ballStartY);
        engine.addEntity(ball);
        game.ballsInPlay.push(ball);
        ball.kick(1);
      }
      hub.send('engine.sound.play', { file: '/game/sounds/sax.mp3', volume: 0.8 });
      game.transition('go');
    }, 2000);
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
  };
  
}

module.exports = MultiBallStart;
