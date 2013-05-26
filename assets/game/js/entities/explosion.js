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
  particle.alpha = 1
  particle.speed.x = (0.5 + Math.random()) * randomSign()
  particle.speed.y = (0.5 + Math.random()) * randomSign()
  particle.acceleration.x = (0.1 + Math.random()) * randomSign()
  particle.acceleration.y = (0.1 + Math.random()) * randomSign()
  particle.position.x = 0
  particle.position.y = 0
  particle.visible = true
}

var particlePool = []
for (var i = 0; i <= 10000; i++) {
  var particle = new Partical()
  particle.blendMode = PIXI.blendModes.SCREEN
  particlePool.push(particle)
  resetParticle(particle)
}

var Explosion = function(origin) {
  this.sprite = new PIXI.DisplayObjectContainer()
  this.sprite.position.x = World.toPixels(origin.x)
  this.sprite.position.y = World.toPixels(origin.y)
  this.particles = []
  this.ttl = 0

  for (var i = 0; i <= 1000; i++) {
    var particle = particlePool[i]
    this.sprite.addChild(particle)
    this.particles.push(particle)
    resetParticle(particle)
  }
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