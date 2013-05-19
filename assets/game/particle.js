var categories = require('./physics/categories');

var M_PI = Math.PI;
var M_PI_2 = M_PI / 2;

module.exports = function(game, physics, options) {
  options = $.extend({
    timeToLive: [10.0, 150.0],
    radius: 0.5,
    image: '/game/particle.png'
  }, options)

  var timeToLive = Math.floor(Math.random() * options.timeToLive[1]) + options.timeToLive[0]

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
    filterCategoryBits: categories.PARTICLES,
    filterMaskBits: categories.ARENA,
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
    timeToLive -= delta
    if (timeToLive <= 0) {
      // irk, dead
      sprite.visible = false
      physics.world.DestroyBody(physicsBody)
      game.forgetEntity(this)
      return
    }

    sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
    sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)

    // rotate the sprite to the direction of motion
    var velocity = physicsBody.GetLinearVelocity()
    var angle = 0

    if (velocity.x === 0) {
      angle = velocity.y > 0 ? 0 : M_PI
    } else if(velocity.y === 0) {
      angle = velocity.x > 0 ? M_PI_2 : 3 * M_PI_2
    } else {
      angle = Math.atan(velocity.y / velocity.x) + M_PI_2
    }   

    if (velocity.x > 0) {
      angle += M_PI
    }

    physicsBody.SetAngle(angle)
    sprite.rotation = angle
  }

  this.collision = function(other, points) {
  }
}