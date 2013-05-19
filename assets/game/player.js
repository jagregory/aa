module.exports = function(game, physics, options) {
  options = $.extend({
    x: 5,
    y: 5,
    width: 1,
    height: 4
  }, options)

  this.type = 'player'
  this.id = game.trackEntity(this)
  this.userId = options.userId
  this.name = options.name

  var physicsBody = physics.createDynamicBody({
    filterCategoryBits: 0x0002,
    filterMaskBits: 0x0001,
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y,
    userData: {
      entityId: this.id
    }
  })

  var texture = PIXI.Texture.fromImage('/game/paddle.png')
  var sprite = new PIXI.Sprite(texture)
  game.stage.addChild(sprite)

  sprite.height = physics.physics2world(options.height)
  sprite.width = physics.physics2world(options.width)
  sprite.anchor.x = sprite.width / 2.0
  sprite.anchor.y = sprite.height / 2.0

  this.moveBy = function(xDelta, yDelta) {
    var force = new Box2D.Common.Math.b2Vec2(xDelta * -1, yDelta * -1)
    physicsBody.SetAwake(true)
    physicsBody.SetLinearVelocity(force)
  }

  this.update = function(delta) {
    sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
    sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
    sprite.rotation = physicsBody.GetAngle()
  }
}