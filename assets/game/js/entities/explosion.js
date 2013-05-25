var Entity = require('../entity'),
  World = require('../world');

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
    particle.count = 0
    particle.speed.x = 1 * (Math.random() - 0.5)
    particle.speed.y = 2 + 3 * Math.random()
    particle.accel = 0.1 + Math.random()
    particle.position.x = 0
    particle.position.y = 0
  }
}

Explosion.prototype = new Entity()

Explosion.prototype.update = function() {
  this.particles.forEach(function(particle) {
    particle.position.x += 0.5 * particle.speed.x
    particle.position.y -= particle.speed.y
    particle.speed.y += 0.0050 * particle.accel

    if (-200 > particle.position.y) {
      particle.alpha *= 0.92
    }

    if (-300 > particle.position.y) {
      particle.position.y = Math.random() - 0.5
      particle.position.x = 0
      particle.alpha = 1
      particle.speed.y = 1
    }
  })
}

module.exports = Explosion