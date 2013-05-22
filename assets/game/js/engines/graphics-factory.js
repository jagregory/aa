
exports.sprite = function(image, width, height) {
  var texture = PIXI.Texture.fromImage(image);
  var sprite = new PIXI.Sprite(texture);
  sprite.anchor.x = width / 2;
  sprite.anchor.y = height / 2;
  return sprite;
};
