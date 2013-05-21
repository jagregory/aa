// reset players pos
// can move, but no ball

var world = require('../physics/world');

function WarmUp(game) {
  
  this.enter = function() {
    setPlayerPos('p1', world.width / 12, 0);
    setPlayerPos('p2', world.width - world.width / 12, 0);
    getReady();
    setTimeout(function() {
      game.transition('ready');
    }, 2000);
  };
  
  this.exit = function() {
  };
  
  function setPlayerPos(id, x, y) {
    //game.getEntity(id).body.SetPosition(new Box2D.Common.Math.b2Vec2(x, y));
  }
  
  function getReady() {
    // display "get ready" message
  }
  
}

module.exports = WarmUp;

