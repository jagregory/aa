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
      movePlayer(args.pindex, args.vector);
    } else if (message === 'score') {
      explode(ball);
      game.removeEntity(ball);
      game.transition('score');
    }
  }
  
  function movePlayer(index, vector) {
    var entityId = (index === 0) ? 'p1' : 'p2';
    var player = game.getEntity(entityId);
    player.body.SetAwake(true);
    player.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(vector.x, vector.y));
  }
  
  function explode(ball) {
    hub.send('particles:explosion', ball.body.GetPosition());
  }

}

module.exports = Play;
