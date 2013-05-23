var GF          = require('../engines/graphics-factory');
var Entity      = require('../entity');
var world       = require('../world');

function Background(image) {
  this.id = 'background';
  this.sprite = GF.tile(image, world.toPixels(world.width), world.toPixels(world.height), 0);
}

Background.prototype = new Entity();

module.exports = Background;
