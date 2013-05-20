var Particle = require('./particle');
var categories = require('./physics/categories');

module.exports = function(game, physics, options) {
  options = $.extend({
    x: 5,
    y: 5,
    width: 1,
    height: 4
  }, options)

  this.id = game.trackEntity(this)
  this.userId = options.userId
  this.name = options.name

  var physicsBody = physics.createDynamicBody({
    filterCategoryBits: categories.PLAYER,
    filterMaskBits: categories.ARENA | categories.BALL,
    density: 1000,
    fixedRotation: true,
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y,
    userData: {
      entityId: this.id
    }
  });

  var texture = PIXI.Texture.fromImage('/game/images/paddle.png')
  var sprite = new PIXI.Sprite(texture)
  game.stage.addChild(sprite)

  sprite.height = physics.physics2world(options.height)
  sprite.width = physics.physics2world(options.width)
  sprite.anchor.x = sprite.width / 2.0
  sprite.anchor.y = sprite.height / 2.0

  this.moveBy = function(xDelta, yDelta) {
    if (xDelta || yDelta) {
      var force = new Box2D.Common.Math.b2Vec2(xDelta * -1, yDelta * -1)
      physicsBody.SetAwake(true)
      physicsBody.SetLinearVelocity(force)
    } else {
      physicsBody.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0,0));
      physicsBody.SetAngularVelocity(0);
    }
  };
  
  this.update = function(delta) {
    sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
    sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
    sprite.rotation = physicsBody.GetAngle()
  };

  this.collision = function(other, points) {
    game.background.flash(0xffffff)
    game.playSound('/game/sounds/collision-2.mp3')

    for (var i = 0; i < 50; i++) {
      game.queueNextAction(function() {
        new Particle(game, physics, {
          x: points[0].x,
          y: points[0].y
        }).moveBy((Math.random()*50) * (Math.random() < 0.5 ? -1 : 1), (Math.random()*50) * (Math.random() < 0.5 ? -1 : 1))
      })
    }
  }
}