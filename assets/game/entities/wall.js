var categories = require('../physics/categories');

module.exports = function(game, physics, options) {
  
  options = $.extend({
    rotation: 0
  }, options);

  this.id = options.id;
  
  var physicsBody = physics.createStaticBody({
    filterCategoryBits: categories.ARENA,
    filterMaskBits: categories.ALL,
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y,
    rotation: options.rotation,
    userData: {
      entityId: this.id
    }
  })

  var texture = PIXI.Texture.fromImage('/game/images/wall.png')
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

  this.update = function(delta) {
  }
  
  this.collision = function(other, points) {
  }
  
}
