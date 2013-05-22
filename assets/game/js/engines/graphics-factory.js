var world = require('../world');

exports.sprite = function(image, width, height) {
  var texture = PIXI.Texture.fromImage(image);
  var sprite = new PIXI.Sprite(texture);
  sprite.width = world.toPixels(width);  
  sprite.height = world.toPixels(height);
  sprite.anchor.x = sprite.width  / 2;
  sprite.anchor.y = sprite.height / 2;
  console.log('anchor = ', sprite.anchor)
  sprite.position.x = 0;
  sprite.position.y = 0;
  return sprite;
};
