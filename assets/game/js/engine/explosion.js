var _ = require('../../../3rdparty/underscore-min'),
  Entity = require('./entity'),
  World = require('./world'),
  hub = require('./hub'),
  mathUtils = require('./math-utils')

var M_PI = Math.PI
var M_PI_2 = M_PI / 2

var particleTexture = PIXI.Texture.fromImage('/game/images/particle-ball.png')

var Particle = function() {
  PIXI.Sprite.call(this, particleTexture)
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.speed = new PIXI.Point
  this.acceleration = new PIXI.Point
  this.width = 15
  this.height = 15
}
Particle.constructor = Particle
Particle.prototype = Object.create(PIXI.Sprite.prototype)

var resetParticle = function(particle) {
  particle.alpha = 1
  particle.scale.x = 1
  particle.scale.y = 1
  particle.direction = {
    x: (mathUtils.randomBetween(0, 200) - 100) / 100,
    y: (mathUtils.randomBetween(0, 200) - 100) / 100
  }
  particle.speed.x = 0.3 + (1 + Math.random())
  particle.speed.y = 0.3 + (1 + Math.random())
  particle.acceleration.x = 0.25 // (0.5 + Math.random()) * mathUtils.randomSign()
  particle.acceleration.y = 0.25 // (0.5 + Math.random()) * mathUtils.randomSign()
  particle.position.x = 0
  particle.position.y = 0
  particle.visible = true
  particle.rotation = 0
}

var ParticlePool = function(size) {
  console.log('Constructing a particle pool with ' + size + ' particles')
  this.pool = []

  for (var i = 0; i <= size; i++) {
    var particle = new Particle()
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
      if (!entry.particle) {
        throw 'Particle is null'
      }

      entry.free = false
      particles.push(entry.particle)
    }

    if (particles.length == amount) {
      break
    }
  }

  if (particles.length < amount) {
    throw 'Not enough particles to satisfy request'
  }

  console.log('Claimed ' + amount + ' particles')

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
  console.log('Released ' + particles.length + ' particles')
}

var particlePool = new ParticlePool(5000)

var Explosion = function(origin, particleCount) {
  Entity.call(this)
  this.sprite = new PIXI.DisplayObjectContainer()
  this.sprite.position.x = World.toPixels(origin.x)
  this.sprite.position.y = World.toPixels(origin.y)
  this.ttl = 0

  this.particles = this.aliveParticles = particlePool.claim(particleCount)
  this.particles.forEach(function(particle) {
    resetParticle(particle)
    this.sprite.addChild(particle)
  }.bind(this))
}
Explosion.large = function(origin) {
  return new Explosion(origin, 50)
}
Explosion.small = function(origin) {
  return new Explosion(origin, mathUtils.randomBetween(9, 51))
}

Explosion.prototype = new Entity()

Explosion.prototype.update = function(delta) {
  this.ttl -= delta

  var currentParticles = this.aliveParticles
  currentParticles.forEach(function(particle) {
    if (particle.parent) {
      particle.position.x += particle.speed.x * particle.direction.x
      particle.position.y += particle.speed.y * particle.direction.y
      particle.speed.x += particle.acceleration.x
      particle.speed.y += particle.acceleration.y

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
      // particle.height = 8 * particle.speed.y

      if (mathUtils.distance({ x: 0, y: 0 }, particle.position) >= 300) {
        particle.alpha = 0
      }
    }

    var deadParticle = !particle.parent

    if (deadParticle) {
      console.log('Dead particle')
    }

    if (deadParticle || particle.alpha <= (Math.random() * 5) / 50) {
      this.aliveParticles = _.without(this.aliveParticles, particle)
      particlePool.release([particle])
    }
  }.bind(this))

  if (this.aliveParticles.length === 0) {
    hub.send('entity:destroy', {
      entity: this
    })
  }
}

module.exports = Explosion