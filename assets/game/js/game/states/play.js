
function Play(engine, game) {
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining  -= delta;
    // var seconds = Math.floor(countdownMillis / 1000);
    // engine.getEntity('hud').updateTime(seconds);
    if (game.timeRemaining <= 0) {
      engine.transition('end');
    }
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
  
}

module.exports = Play;
