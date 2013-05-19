module.exports = function(game, physics, options) {
  options = $.extend({
    rotation: 0
  }, options)

  this.type = 'wall'
  this.id = game.trackEntity(this)
  
  var physicsBody = physics.createStaticBody({
    filterCategoryBits: 0x0001,
    filterMaskBits: 0x0002,
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y,
    rotation: options.rotation,
    userData: {
      entityId: this.id
    }
  })

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

  game.stage.addChild(sprite)
}