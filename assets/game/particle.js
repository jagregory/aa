module.exports = function(game, physics, options) {
  options = $.extend({
    radius: 0.5,
    image: '/game/particle.png'
  }, options)

  ;['x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for particle'
    }
  })

  this.id = game.trackEntity(this)

  var physicsBody = physics.createCircle({
    density: 0.1,
    friction: 0.05,
    restitution: 1,
    filterGroupIndex: -1,
    filterMaskBits: 0x0001,
    radius: options.radius,
    x: options.x,
    y: options.y,
    userData: {
      entityId: this.id
    }
  })
  physicsBody.SetAngularDamping(1)

  var texture = PIXI.Texture.fromImage(options.image)
  var sprite = new PIXI.Sprite(texture)

  sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
  sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
  sprite.height = physics.physics2world(options.radius)
  sprite.width = physics.physics2world(options.radius)
  sprite.anchor.x = 8
  sprite.anchor.y = 8

  game.stage.addChild(sprite)

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