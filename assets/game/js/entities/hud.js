var Entity = require('../entity');
var GF = require('../engines/graphics-factory');
var userInterface = require('../user-interface');

var MARGIN = 30;

function Hud(text) {
  
  this.id = 'hud';
  
  this.p1Bg = GF.sprite('/game/images/hud-bg.png', 16, 3);
  this.p1Bg.position.x = MARGIN;
  this.p1Bg.position.y = MARGIN;

  this.p2Bg = GF.sprite('/game/images/hud-bg.png', 16, 3);
  this.p2Bg.position.x = userInterface.width - MARGIN - this.p2Bg.width;
  this.p2Bg.position.y = MARGIN;
  
  this.p1Name = GF.text('John Doe', 20);
  this.p1Name.position.x = MARGIN + 70;
  this.p1Name.position.y = MARGIN + 12;

  this.p2Name = GF.text('John Doe', 20);
  this.p2Name.position.x = userInterface.width - MARGIN - 180;
  this.p2Name.position.y = MARGIN + 12;
    
};

Hud.prototype = new Entity();

Hud.prototype.create = function(physicsEngine, graphicsEngine) {
  graphicsEngine.addChild(this.p1Bg);
  graphicsEngine.addChild(this.p2Bg);
  graphicsEngine.addChild(this.p1Name);
  graphicsEngine.addChild(this.p2Name);
};

Hud.prototype.destroy = function(physicsEngine, graphicsEngine) {
  graphicsEngine.removeChild(this.p2Bg);
  graphicsEngine.removeChild(this.p2Bg);
  graphicsEngine.removeChild(this.p1Name);
  graphicsEngine.removeChild(this.p2Name);
};

module.exports = Hud;
