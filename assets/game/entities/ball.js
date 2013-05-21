var categories = require('./physics/categories');
var world = require('../physics/world');

var Ball = function() {
  
  this.id     = 'ball';
  this.body   = createBody();
  this.sprite = createSprite();
  
  this.update = function(delta) {
    this.sprite.position.x = physics.physics2world(this.body.GetPosition().x);
    this.sprite.position.y = physics.physics2world(this.body.GetPosition().y);
    this.sprite.rotation   = physicsBody.GetAngle();
  };

  this.collision = function(other, points) {
    // if collision with the goal, score!
  };
  
  this.nudge = function() {
    var force = new Box2D.Common.Math.b2Vec2(10, 10);
    this.body.SetAwake(true);
    this.body.SetLinearVelocity(force);
  };
  
  function createBody() {
    return physics.createCircle({
        filterCategoryBits: categories.BALL,
        filterMaskBits: categories.ARENA | categories.PLAYER,
        radius: 0.8,
        x: world.width  / 2 - 0.4,
        y: world.height / 2 - 0.4,
        density: 0.1,
        friction: 0,
        restitution: 1,
        userData: {
          entityId: 'ball'
        }
      });
  }
  
  function createSprite() {
    var textureSize = 26;
    var texture = PIXI.Texture.fromImage('/game/images/ball.png');
    sprite = new PIXI.Sprite(texture);
    sprite.anchor.x = textureSize / 2;
    sprite.anchor.y = textureSize / 2;
    return sprite;
  }
  
};

module.exports = Ball;

