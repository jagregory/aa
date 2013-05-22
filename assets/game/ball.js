var categories = require('./physics/categories');

var BALL_SPRITE_SIZE = 26;

module.exports = function(game, physics) {
  
  var body = physics.createCircle({
    filterCategoryBits: categories.BALL,
    filterMaskBits: categories.ARENA | categories.PLAYER,
    radius: 0.8,
    x: 10,
    y: 10,
    density: 0.1,
    friction: 0,
    restitution: 1,
    userData: {
      entityId: 'ball'
    }
  });

  this.body = body;
  
  var texture = PIXI.Texture.fromImage('/game/images/ball.png');
  var sprite = new PIXI.Sprite(texture);
  sprite.anchor.x = BALL_SPRITE_SIZE / 2;
  sprite.anchor.y = BALL_SPRITE_SIZE / 2;
  game.engine.stage.addChild(sprite);

//  this.id = game.track(this);
  
  
  this.start = function() {
    var force = new Box2D.Common.Math.b2Vec2(10, 10);
    body.SetAwake(true);
    body.SetLinearVelocity(force);
  };
  
  this.moveTo = function(xDelta, yDelta) {
  }

  this.update = function(delta) {
    sprite.position.x = physics.physics2world(body.GetPosition().x)
    sprite.position.y = physics.physics2world(body.GetPosition().y)
    sprite.rotation = body.GetAngle()
  }

  this.collision = function(other, points) {
  }
  
};
