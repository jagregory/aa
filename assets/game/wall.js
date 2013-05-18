module.exports = function(stage, physics, x, y, width, height) {
  var physicsBody = physics.createStaticBody({
    width: width,
    height: height,
    x: x,
    y: y
  })

  var texture = PIXI.Texture.fromImage('/game/wall.png')
  var sprite = new PIXI.TilingSprite(texture)
  sprite.height = height
  sprite.width = width
  sprite.position.x = x
  sprite.position.y = y

  stage.addChild(sprite)
}