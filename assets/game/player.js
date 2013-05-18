module.exports = function(stage, physics, options) {
  options = $.extend({
    x: 5,
    y: 5,
    width: 1,
    height: 4
  }, options)

  var physicsBody = physics.createDynamicBody({
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y
  })

  var texture = PIXI.Texture.fromImage('/game/paddle.png')
  var sprite = new PIXI.Sprite(texture)
  stage.addChild(sprite)

  var boardHeight = $('#board').height()
  var boardWidth = $('#board').width()

  sprite.height = physics.physics2world(options.height)
  sprite.width = physics.physics2world(options.width)
  sprite.anchor.x = sprite.width / 2.0
  sprite.anchor.y = sprite.height / 2.0

  var update = function(delta) {
    sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
    sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
    sprite.rotation = physicsBody.GetAngle()
  }

  return {
    id: options.id,
    name: options.name,
    moveBy: function(xDelta, yDelta) {
      force = new Box2D.Common.Math.b2Vec2(xDelta * -1, yDelta * -1);
      physicsBody.SetAwake(true);
      physicsBody.SetLinearVelocity(force);
    },
    tick: function(delta) {
      update(delta)
    }
  }
}