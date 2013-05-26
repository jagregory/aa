var Entity = require('../entity'),
  World = require('../world')

var randomSign = function() {
  return Math.random() < 0.5 ? -1 : 1
}

var distance = function(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y))
}

var Partical = function() {
  PIXI.Sprite.call(this, PIXI.Texture.fromImage('/game/images/particle.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.count = 0
  this.speed = new PIXI.Point
  this.accel = 0
  this.width = 32
  this.height = 32
}
Partical.constructor = Partical
Partical.prototype = Object.create(PIXI.Sprite.prototype)

var resetParticle = function(particle) {
  particle.alpha = 1
  particle.speed.x = Math.random() * randomSign()
  particle.speed.y = Math.random() * randomSign()
  particle.accel = 0.1 + Math.random()
  particle.position.x = 0
  particle.position.y = 0
}

var Explosion = function(origin) {
  this.sprite = new PIXI.DisplayObjectContainer()
  this.sprite.position.x = World.toPixels(origin.x)
  this.sprite.position.y = World.toPixels(origin.y)
  this.particles = []

  for (var i = 0; i <= 100; i++) {
    var particle = new Partical()
    particle.blendMode = "w"
    this.sprite.addChild(particle)
    this.particles.push(particle)
    resetParticle(particle)
  }
}

Explosion.prototype = new Entity()

Explosion.prototype.update = function() {
  this.particles.forEach(function(particle) {
    particle.position.x += (0.5 * particle.speed.x)
    particle.position.y += (0.5 * particle.speed.y)
    particle.speed.x += 0.0050 * particle.accel
    particle.speed.y += 0.0050 * particle.accel

    if (distance({ x: 0, y: 0 }, particle.position) >= 100) {
      particle.alpha *= 0.92
    }

    if (particle.alpha <= 0.0001) {
      resetParticle(particle)
    }
  }.bind(this))
}

module.exports = Explosion