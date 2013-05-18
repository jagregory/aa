module.exports = function(stage, physics, options) {
  options = $.extend({
    rotation: 0
  }, options)
  var physicsBody = physics.createStaticBody(options)

  var texture = PIXI.Texture.fromImage('/game/wall.png')
  var sprite = new PIXI.TilingSprite(texture)
  sprite.tileScale = new PIXI.Point(1,1)
  sprite.height = physics.physics2world(options.height)
  sprite.width = physics.physics2world(options.width)
  sprite.anchor.x = sprite.width / 2.0
  sprite.anchor.y = sprite.height / 2.0
  sprite.position.x = physics.physics2world(options.x)
  sprite.position.y = physics.physics2world(options.y)
  sprite.rotation = options.rotation

  stage.addChild(sprite)
}