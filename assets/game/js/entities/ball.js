var PF          = require('../engines/physics-factory');
var GF          = require('../engines/graphics-factory');
var Entity      = require('../entity');
var world       = require('../world');
var mathUtils   = require('../math-utils');

var ballSize = 1.5;

var fixture = PF.fixture({
  shape:      PF.shape.circle(ballSize / 2),
  dynamics:   {density: 1, friction: 0, restitution: 1},
  category:   PF.categories.BALL,
  collision:  PF.categories.ARENA | PF.categories.PLAYER
});

function Ball(id, x, y) {
  
  this.id = id;

  this.bodySpec = {
    body: PF.dynamic({x: x, y: y}),
    fixture: fixture
  };

  this.sprite = GF.sprite('/game/images/ball.png', ballSize, ballSize);
  
};

Ball.prototype = new Entity();

Ball.prototype.update = function(delta) {  
  Entity.prototype.update.call(this, delta);
  mathUtils.clampVelocity(this.body, 15, 35);
  this.sprite.anchor.x = this.sprite.width  / 2;
  this.sprite.anchor.y = this.sprite.height / 2;
};

module.exports = Ball;
