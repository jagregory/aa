var PF = require('../engines/physics-factory');
var GF = require('../engines/graphics-factory');
var world = require('../world');

var BALL_SIZE = 1.5;

function Ball(id, physicsEngine) {

  this.id = id;
  
  this.body = null;
  
  this.bodyDef = PF.dynamic({
    x: world.width / 3,
    y: world.height / 3
  });
  
  this.fixtureDef = PF.fixture({
    shape:      PF.shape.circle(BALL_SIZE / 2),
    dynamics:   {density: 0.1, friction: 0, restitution: 1},
    category:   PF.categories.BALL,
    collision:  PF.categories.ARENA | PF.categories.PLAYER
  });

  this.sprite = GF.sprite('/game/images/ball.png', BALL_SIZE, BALL_SIZE);
    
  this.update = function(delta) {
    //this.sprite.anchor.x = this.sprite.width  / 2;
    //this.sprite.anchor.y = this.sprite.height / 2;
  }

  this.collision = function(other, points) {
  }
  
};

module.exports = Ball;
