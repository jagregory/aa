var _ = require('../../../3rdparty/underscore-min'),
  Entity = require('../entity'),
  World = require('../world'),
  hub = require('../hub')

var M_PI = Math.PI
var M_PI_2 = M_PI / 2

var randomBetween = function(min, max) {
  return Math.floor(Math.random() * max) + min
}

var randomSign = function() {
  return Math.random() < 0.5 ? -1 : 1
}

var distance = function(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y))
}

var Partical = function() {
  PIXI.Sprite.call(this, PIXI.Texture.fromImage('/game/images/particle-orange.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.speed = new PIXI.Point
  this.acceleration = new PIXI.Point
  this.width = 8
  this.height = 8
}
Partical.constructor = Partical
Partical.prototype = Object.create(PIXI.Sprite.prototype)

var resetParticle = function(particle) {
  particle.blendMode = PIXI.blendModes.SCREEN
  particle.alpha = 1
  particle.speed.x = (0.5 + Math.random()) * randomSign()
  particle.speed.y = (0.5 + Math.random()) * randomSign()
  particle.acceleration.x = (0.1 + Math.random()) * randomSign()
  particle.acceleration.y = (0.1 + Math.random()) * randomSign()
  particle.position.x = 0
  particle.position.y = 0
  particle.visible = true
  particle.width = 8
  particle.height = 8
  particle.rotation = 0
}

var ParticlePool = function(size) {
  this.pool = []

  for (var i = 0; i <= size; i++) {
    var particle = new Partical()
    this.pool.push({
      particle: particle,
      free: true
    })
  }
}

ParticlePool.prototype.claim = function(amount) {
  var particles = []

  for (var i = 0; i < this.pool.length; i++) {
    var entry = this.pool[i]

    if (entry.free) {
      entry.free = false
      particles.push(entry.particle)
    }

    if (particles.length == amount) {
      break
    }
  }

  if (particles.length < amount) {
    console.log('Not enough particles to satisfy request')
  }

  return particles
}

ParticlePool.prototype.release = function(particles) {
  particles.forEach(function(particle) {
    if (particle.parent) {
      particle.parent.removeChild(particle)
    }
    var entry = _.findWhere(this.pool, { particle: particle })
    entry.free = true
  }.bind(this))
}

var particlePool = new ParticlePool(5000)

var Explosion = function(origin, particleCount) {
  Entity.call(this)
  this.sprite = new PIXI.DisplayObjectContainer()
  this.sprite.position.x = World.toPixels(origin.x)
  this.sprite.position.y = World.toPixels(origin.y)
  this.particles = []
  this.ttl = 0

  particlePool.claim(particleCount).forEach(function(particle) {
    resetParticle(particle)
    this.sprite.addChild(particle)
    this.particles.push(particle)
  }.bind(this))
}
Explosion.large = function(origin) {
  return new Explosion(origin, randomBetween(750, 1250))
}
Explosion.small = function(origin) {
  return new Explosion(origin, randomBetween(100, 300))
}

Explosion.prototype = new Entity()

Explosion.prototype.update = function(delta) {
  this.ttl -= delta

  this.particles.forEach(function(particle) {
    if (!particle.parent) {
      // dead particle
      return
    }
    particle.position.x += (0.5 * particle.speed.x)
    particle.position.y += (0.5 * particle.speed.y)
    particle.speed.x += 0.05 * particle.acceleration.x
    particle.speed.y += 0.05 * particle.acceleration.y

    var velocity = particle.speed
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

    particle.rotation = angle

    particle.height = 8 * particle.speed.y

    if (distance({ x: 0, y: 0 }, particle.position) >= randomBetween(200, 375)) {
      particle.alpha *= 0.92
    }

    if (particle.alpha <= (Math.random() * 5) / 50) {
      particle.visible = false
    }
  }.bind(this))

  if (!_.findWhere(this.particles, { visible: true })) {
    particlePool.release(this.particles)
    this.particles = []
    hub.send('entity:destroy', {
      entity: this
    })
  }
}

module.exports = Explosion