var Wall = require('./wall')

var arena = function(stage, physics) {
  this.stage = stage
  this.physics = physics
  this.walls.forEach(this.addWall.bind(this))
}

arena.prototype.walls = [
  { x: 16, y: 0, width: 568, height: 16 },
  { x: 16, y: 384, width: 568, height: 16 },
  { x: 16, y: 0, width: 16, height: 400 },
  { x: 568, y: 0, width: 16, height: 400 }
]

arena.prototype.addWall = function(definition) {
  new Wall(this.stage, this.physics, definition.x, definition.y, definition.width, definition.height)
}

module.exports = arena