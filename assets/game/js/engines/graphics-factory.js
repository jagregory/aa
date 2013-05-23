var _ = require('../../../3rdparty/underscore-min');
var world = require('../world');

//
// Anchor always seems reset for "normal" sprites
// But OK for tiling... maybe due to this?
//
// 1f3dee9c4a1c71bed9cd10c4a2e86fbbb35f1bbf
// 18 May 2013 11:56:39 PM
// Patch Pixi to allow specifying a central anchor for tiling sprites
// 

exports.sprite = function(image, width, height, rotation) {
  var sprite = PIXI.Sprite.fromImage(image);
  init(sprite, width, height, rotation);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  console.log('anchor = ', sprite.anchor)
  return sprite;
};

exports.tile = function(image, width, height, rotation) {
  var texture = PIXI.Texture.fromImage(image);
  var sprite = new PIXI.TilingSprite(texture);
  sprite.tileScale = new PIXI.Point(1,1);
  init(sprite, width, height, rotation);
  sprite.anchor.x = sprite.width  / 2;
  sprite.anchor.y = sprite.height / 2;
  console.log('anchor = ', sprite.anchor)
  return sprite;
};

exports.text = function(text, size, opts) {
  opts = _.extend({
      font: '' + (size || 50) + 'px PressStart2P',
      fill: '#000',
      align: 'center',
      stroke: '#fff',
      strokeThickness: 4
  }, opts);
  var text = new PIXI.Text(text, opts);
  text.position.x = (world.width  * world.pixelsPerMeter) / 2 - text.width  / 2;
  text.position.y = (world.height * world.pixelsPerMeter) / 2 - text.height / 2;
  text.anchor.x = 0.5;
  return text;
};

function init(sprite, width, height, rotation) {
  sprite.width = world.toPixels(width);  
  sprite.height = world.toPixels(height);
  sprite.position.x = 0;
  sprite.position.y = 0;
  sprite.rotation = rotation || 0;
}
