var PF = require('../engines/physics-factory');
var GF = require('../engines/graphics-factory');

function Ball(id, physicsEngine) {

  this.id = id;
  
  this.body = null;
  
  this.bodyDef    = PF.dynamic({x: 10, y: 10});
  
  this.fixtureDef = PF.fixture({
    shape:      PF.shape.circle(0.8),
    dynamics:   {density: 0.1, friction: 0, restitution: 1},
    category:   PF.categories.BALL,
    collision:  PF.categories.ARENA | PF.categories.PLAYER
  });

  this.sprite = GF.sprite('/game/images/ball.png', 26, 26);
    
  this.update = function(delta) {
  }

  this.collision = function(other, points) {
  }
  
};

module.exports = Ball;
