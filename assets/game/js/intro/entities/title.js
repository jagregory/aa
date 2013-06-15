var Entity = require('../../engine/entity')
var GF  = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

function Title(id) {
  
  this.id = id;
  this.sprite = GF.uiSprite('/game/images/title.png', userInterface.width, userInterface.height);

};

Title.prototype = new Entity();

module.exports = Title;
