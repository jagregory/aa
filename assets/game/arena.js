var Wall = require('./wall')

var Arena = function(stage, physics, name, walls) {
  this.stage = stage
  this.physics = physics
  this.name = name
  walls.forEach(this.addWall.bind(this))
}

Arena.prototype.addWall = function(definition) {
  new Wall(this.stage, this.physics, definition)
}

Arena.registered = []
Arena.define = function(name, walls) {
  Arena.registered.push(function(stage, physics) {
    return new Arena(stage, physics, name, walls)
  })
}
Arena.random = function() {
  return Arena.registered[Math.floor(Math.random()*Arena.registered.length)]
}

module.exports = Arena