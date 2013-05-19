module.exports = function(game) {
  var texture = PIXI.Texture.fromImage('/game/ball.png')
  var sprite = new PIXI.Sprite(texture)
  game.stage.addChild(sprite)

  this.id = game.trackEntity(this)

  var boardHeight = $('#board').height()
  var boardWidth = $('#board').width()

  sprite.position.x = (boardWidth / 2) - (sprite.width / 2)
  sprite.position.y = (boardHeight / 2) - (sprite.height / 2)
  
  this.moveTo = function(xDelta, yDelta) {
  }

  this.update = function(delta) {
  }

  this.collision = function(other, points) {
  }
}