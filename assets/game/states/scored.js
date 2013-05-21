// what about using your particle explosion for when the ball touches the scoring area, and pretty much explodes?
// update the score
// maybe a nice fighting game-like banner on screen
// and back to kick-off

function Scored(game) {
  
  this.enter = function() {
    ga.e
    game.removeEntity('ball');
    game.addEntity(new Text('JOHN SCORED'));
  };
  
  this.exit = function() {
    
  };
  
}

module.exports = Scored;
