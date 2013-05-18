module.exports = function(stage, physics, x, y, width, height) {
  var physicsBody = physics.createStaticBody({
    width: width,
    height: height,
    x: x,
    y: y
  })

  var texture = PIXI.Texture.fromImage('/game/wall.png')
  var sprite = new PIXI.TilingSprite(texture)
  sprite.height = physics.physics2world(height)
  sprite.width = physics.physics2world(width)
  sprite.position.x = physics.physics2world(x - (width / 2))
  sprite.position.y = physics.physics2world(y - (height / 2))

  stage.addChild(sprite)
}