var GF = require('../engines/graphics-factory');
var Entity = require('../entity');
var userInterface = require('../user-interface');

function ActionText(id, text) {
  
  this.id = id;
  this.sprite = GF.text(text, 65, {
    strokeThickness: 4
  });
  
  this.sprite.position.x = userInterface.width  / 2 - this.sprite.width  / 2;
  this.sprite.position.y = userInterface.height / 2 - this.sprite.height / 2;
  
};

ActionText.prototype = new Entity();

ActionText.prototype.set = function(text) {
  this.sprite.setText(text);
};

module.exports = ActionText;
