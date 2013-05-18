var Wall = require('./wall')

var arena = function(stage, physics) {
  this.stage = stage
  this.physics = physics
  this.walls.forEach(this.addWall.bind(this))
}

arena.prototype.walls = [
  { x: 1.5, y: 15, width: 1, height: 30 },
  { x: 38.5, y: 15, width: 1, height: 30 },
  { x: 20, y: .5, width: 36, height: 1 },
  { x: 20, y: 29.5, width: 36, height: 1 },
]

arena.prototype.addWall = function(definition) {
  new Wall(this.stage, this.physics, definition.x, definition.y, definition.width, definition.height)
}

module.exports = arena