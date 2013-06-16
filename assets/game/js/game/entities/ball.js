var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');
var mathUtils   = require('../../engine/math-utils');
var hub         = require('../../engine/hub');
var MathUtils   = require('../../engine/math-utils')

var ballSize = 2;

var fixture = PF.fixture({
  shape:      PF.shape.circle(ballSize / 2),
  dynamics:   {density: 1, friction: 1, restitution: 1},
  category:   PF.categories.BALL,
  collision:  PF.categories.ARENA | PF.categories.PLAYER | PF.categories.BALL
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

Ball.prototype.update = function(engine, game, delta) {  
  Entity.prototype.update.call(this, delta);
  mathUtils.clampVelocity(this.body, 30, 40);
  mathUtils.clampXVelocity(this.body, 15, 35);
  this.body.SetAngularDamping(1.5);
  
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 2;
};

Ball.prototype.kick = function(direction) {
  this.body.SetAwake(true);
  this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(25 * direction, MathUtils.randomBetween(2, 10)));
  this.body.SetAngularVelocity(MathUtils.randomBetween(4, 10));
}

module.exports = Ball;
