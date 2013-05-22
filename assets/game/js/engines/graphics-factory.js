var world = require('../world');

exports.sprite = function(image, width, height, rotation) {
  var sprite = PIXI.Sprite.fromImage(image);
  init(sprite, width, height, rotation);
  return sprite;
};

exports.tile = function(image, width, height, rotation) {
  var texture = PIXI.Texture.fromImage(image);
  var sprite = new PIXI.TilingSprite(texture);
  sprite.tileScale = new PIXI.Point(1,1);
  init(sprite, width, height, rotation);
  return sprite;
};

function init(sprite, width, height, rotation) {
  sprite.width = world.toPixels(width);  
  sprite.height = world.toPixels(height);
  sprite.anchor.x = sprite.width  / 2;
  sprite.anchor.y = sprite.height / 2;
  console.log('anchor = ', sprite.anchor)
  sprite.position.x = 0;
  sprite.position.y = 0;
  sprite.rotation = rotation || 0;
}
