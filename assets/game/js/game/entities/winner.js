var Entity = require('../../engine/entity');
var GF = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

function Winner(id, p1, p2) {
  
  this.id = id;
  
  var bg   = (p1.score === p2.score) ? '/game/images/end-draw.png' : '/game/images/end-winner.png';
  var name = (p1.score > p2.score) ? p1.name : p2.name;
  
  this.background = GF.uiSprite(bg, userInterface.width, userInterface.height);
  this.background.position.x = userInterface.width  / 2 - this.background.width  / 2;
  this.background.position.y = userInterface.height / 2 - this.background.height / 2;
    
  if (p1.score != p2.score) {
    this.name = GF.text(name, 45, {fill: '#01518d', stroke: '#fff', strokeThickness: 3});
    this.name.position.x = userInterface.width / 2 - this.name.width / 2 - 20;
    this.name.position.y = 190;
  }
  
};

Winner.prototype = new Entity();

Winner.prototype.create = function(engine, game) {
  engine.graphics.add(this.background);
  if (this.name) {
    engine.graphics.add(this.name);
  }
};

Winner.prototype.destroy = function(engine, game) {
  engine.graphics.remove(this.background);
  if (this.name) {
    engine.graphics.remove(this.name);
  }
};

module.exports = Winner;
