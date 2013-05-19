var Wall = require('./wall')

var Arena = function(game, physics, name, walls) {
  this.name = name

  this.addWall = function(definition) {
    new Wall(game, physics, definition)
  }

  walls.forEach(this.addWall.bind(this))
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