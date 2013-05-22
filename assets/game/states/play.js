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
  
  this.on = function(name, args) {
    if (name === 'move') {
    } else if (name === 'score') {
      explode(ball);
      game.removeEntity(ball);
      game.transition('score');
    }
  }
  
  function movePlayer(index, vector) {
    var entityId = (args.pindex === 0) ? 'p1' : 'p2';
    game.getEntity(entityId).move(args.vector); 
  }
  
  function explode(ball) {
    hub.send('particles:explosion', ball.body.GetPosition());
  }

}

module.exports = Play;
