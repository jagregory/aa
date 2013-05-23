var GF = require('../engines/graphics-factory');
var Entity = require('../entity');
var world = require('../world');

function Text(id, text) {
  
  this.id = id;
  this.sprite = GF.text(text, 50);
  
  this.sprite.position.x = (world.width  * world.pixelsPerMeter) / 2 - this.sprite.width  / 2;
  this.sprite.position.y = (world.height * world.pixelsPerMeter) / 2 - this.sprite.height / 2;
  
};

Text.prototype = new Entity();

Text.prototype.set = function(text) {
  this.sprite.setText(text);
};

module.exports = Text;
