var _ = require('../../../3rdparty/underscore-min'),
  Entity = require('../entity'),
  World = require('../world')

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
  this.width = 32
  this.height = 32
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
  _.each(particles, function(particle) {
    var entry = _.find(this.pool, { p: particle })
    entry.free = true
  })
}

var particlePool = new ParticlePool(5000)

var Explosion = function(origin) {
  this.sprite = new PIXI.DisplayObjectContainer()
  this.sprite.position.x = World.toPixels(origin.x)
  this.sprite.position.y = World.toPixels(origin.y)
  this.particles = []
  this.ttl = 0

  particlePool.claim(1000).forEach(function(particle) {
    resetParticle(particle)
    this.sprite.addChild(particle)
    this.particles.push(particle)
  }.bind(this))
}

Explosion.prototype = new Entity()

Explosion.prototype.update = function(delta) {
  this.ttl -= delta

  this.particles.forEach(function(particle) {
    if (!particle) {
      return
    }

    particle.position.x += (0.5 * particle.speed.x)
    particle.position.y += (0.5 * particle.speed.y)
    particle.speed.x += 0.05 * particle.acceleration.x
    particle.speed.y += 0.05 * particle.acceleration.y

    if (distance({ x: 0, y: 0 }, particle.position) >= 100) {
      particle.alpha *= 0.92
    }

    if (particle.alpha <= (Math.random() * 5) / 50) {
      if (this.ttl > 0) {
        // only reuse particle if we're still alive
        resetParticle(particle)
      } else {
        particle.visible = false
      }
    }
  }.bind(this))

  if (this.ttl <= 0 && !_.findWhere(this.particles, { visible: true })) {
    // TODO: I don't know how this is supposed to work. Destroy expects
    // the game and physics engines to be passed to it.
    // this.destroy()
  }
}

module.exports = Explosion