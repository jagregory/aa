// give the ball a nudge
// check if anyone scored
// add power ups to collect, etc

function Play(game) {
  
  var countdownMillis = 60 * 1000;
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.tick = function(delta) {
    countdownMillis -= delta;
    var seconds = Math.floor(countdownMillis / 1000);
    game.getEntity('hud').updateTime(seconds);
  };
  
  this.on = function(message, args) {
    if (message === 'move') {
      var player = game.getEntity(args.pindex === 0 ? 'p1' : 'p2');
      player.move(args.dir);
    } else if (message === 'stop') {
      var player = game.getEntity(args.pindex === 0 ? 'p1' : 'p2');
      player.stop();
    }
  };
  
}

module.exports = Play;
