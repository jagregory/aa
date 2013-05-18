module.exports = function(stage, physics, options) {
  options = $.extend({
    rotation: 0
  }, options)
  var physicsBody = physics.createStaticBody(options)

  var texture = PIXI.Texture.fromImage('/game/wall.png')
  var sprite = new PIXI.Sprite(texture)
  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5
  sprite.height = physics.physics2world(options.height)
  sprite.width = physics.physics2world(options.width)
  sprite.position.x = physics.physics2world(options.x)
  sprite.position.y = physics.physics2world(options.y)
  sprite.rotation = options.rotation

  stage.addChild(sprite)
}