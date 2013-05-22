var GF = require('../engines/graphics-factory');
var categories = require('../physics/categories');
var world      = require('../world');

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

  var sprite = GF.tile('/game/images/wall.png', options.width, options.height, options.rotation);
  sprite.position.x = world.toPixels(options.x);
  sprite.position.y = world.toPixels(options.y);
  sprite.rotation = options.rotation;
  
  game.stage.addChild(sprite)

  this.update = function(delta) {
  }
  
  this.collision = function(other, points) {
  }
  
}
