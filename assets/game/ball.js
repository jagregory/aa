module.exports = function(game, physics) {
  
  var physicsBody = physics.createDynamicBody({
    filterCategoryBits: 0x0002,
    filterMaskBits: 0x0001,
    width: 1,
    height: 1,
    x: 10,
    y: 10,
    userData: {
      entityId: 'ball'
    }
  });
  
  var texture = PIXI.Texture.fromImage('/game/ball.png');
  var sprite = new PIXI.Sprite(texture);
  game.stage.addChild(sprite);

  this.id = game.trackEntity(this);

  var boardHeight = $('#board').height();
  var boardWidth = $('#board').width();

  sprite.position.x = (boardWidth / 2) - (sprite.width / 2);
  sprite.position.y = (boardHeight / 2) - (sprite.height / 2);
  
  this.start = function() {
    var force = new Box2D.Common.Math.b2Vec2(10, 0);
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
