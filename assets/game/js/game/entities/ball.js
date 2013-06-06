var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');
var mathUtils   = require('../../engine/math-utils');
var hub         = require('../../engine/hub');

var ballSize = 2;

var fixture = PF.fixture({
  shape:      PF.shape.circle(ballSize / 2),
  dynamics:   {density: 1, friction: 0.1, restitution: 1},
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
  mathUtils.clampVelocity(this.body, 15, 30);
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 2;
};

Ball.prototype.collision = function(other, points) {    
  hub.send('particles:explosion', {
    source: points[0],
    size: 'small'
  })
}

module.exports = Ball;
