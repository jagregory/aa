var categories = require('./physics/categories');

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
  
  var texture = PIXI.Texture.fromImage('/game/images/ball.png');
  var sprite = new PIXI.Sprite(texture);
  game.engine.stage.addChild(sprite);

//  this.id = game.track(this);

  var boardHeight = $('#board').height();
  var boardWidth = $('#board').width();

  sprite.position.x = (boardWidth / 2) - (sprite.width / 2);
  sprite.position.y = (boardHeight / 2) - (sprite.height / 2);
  sprite.anchor.x = 13;
  sprite.anchor.y = 13;
  
  this.start = function() {
    var force = new Box2D.Common.Math.b2Vec2(10, 10);
    physicsBody.SetAwake(true);
    physicsBody.SetLinearVelocity(force);
  };
  
  this.moveTo = function(xDelta, yDelta) {
  }

  this.update = function(delta) {
    sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
    sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
    sprite.rotation = physicsBody.GetAngle()
  }

  this.collision = function(other, points) {
  }
  
};
