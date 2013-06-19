var Entity        = require('../../engine/entity')
var GF            = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');
var assets        = require('../../assets');

function Title(id) {
  
  this.id = id;
  this.sprite = GF.uiSprite(assets.image('intro-title'), userInterface.width, userInterface.height);

};

Title.prototype = new Entity();

module.exports = Title;
