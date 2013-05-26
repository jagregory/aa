// give the ball a nudge
// check if anyone scored
// add power ups to collect, etc

function Play(game) {
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
    if (message === 'move') {
      var player = game.getEntity(args.pindex === 0 ? 'p1' : 'p2');
      player.move(args.vector);
    }
  };
  
}

module.exports = Play;
