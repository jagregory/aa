var GF = require('../../engine/graphics-factory');
var Entity = require('../../engine/entity');
var userInterface = require('../../engine/user-interface');

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
