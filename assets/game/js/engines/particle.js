var PF         = require('../engines/physics-factory');
var world      = require('../world');
var categories = PF.categories;

var M_PI = Math.PI;
var M_PI_2 = M_PI / 2;

var particleIndex = 0;

function Particle(game, physics, options) {
  
  options = $.extend({
    timeToLive: [2.0, 30.0],
    radius: 0.5,
    image: '/game/images/particle.png'
  }, options);

  var timeToLive = Math.floor(Math.random() * options.timeToLive[1]) + options.timeToLive[0];

  ['x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for particle'
    }
  })

  this.id = 'particle' + (++particleIndex);

  var bodyDef = PF.dynamic({
    x: options.x,
    y: options.y
  });
  
  var fixtureDef = PF.fixture({
    shape:      PF.shape.circle(options.radius),
    dynamics:   {density: 0.1, friction: 0.05, restitution: 1},
    category:   PF.categories.PARTICLES,
    collision:  PF.categories.ARENA
  });
  
  // This is not a real entity yet
  // fixtureDef.userData = { entityId: this.id };
  
  var physicsBody = physics.create(bodyDef, fixtureDef);
  physicsBody.SetAngularDamping(1)

  var texture = PIXI.Texture.fromImage(options.image)
  var sprite = new PIXI.Sprite(texture)

  sprite.position.x = world.toPixels(physicsBody.GetPosition().x);
  sprite.position.y = world.toPixels(physicsBody.GetPosition().y);
  sprite.height = world.toPixels(options.radius);
  sprite.width = world.toPixels(options.radius);
  sprite.anchor.x = 8;
  sprite.anchor.y = 8;

  game.graphics.add(sprite)

  this.moveBy = function(xDelta, yDelta) {
    var force = new Box2D.Common.Math.b2Vec2(xDelta * -1, yDelta * -1)
    physicsBody.SetAwake(true)
    physicsBody.SetLinearVelocity(force)
  }

  this.update = function(delta) {
    timeToLive -= delta;
    if (timeToLive <= 0) {
      // irk, dead
      // TODO: the game engine should be responsible for cleaning up everything when we say "forget"
      sprite.visible = false
      physics.b2world.DestroyBody(physicsBody);
      game.forget(this);
      return;
    }

    sprite.position.x = world.toPixels(physicsBody.GetPosition().x)
    sprite.position.y = world.toPixels(physicsBody.GetPosition().y)

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

module.exports = Particle;
