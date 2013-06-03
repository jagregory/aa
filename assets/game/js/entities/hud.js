var Entity = require('../entity');
var GF = require('../engines/graphics-factory');
var world = require('../world');

function Hud(text) {
  
  this.id = 'hud';
  
  this.p1Bg = GF.sprite('/game/images/hud-bg.png', 16, 3);
  this.p1Bg.position.x = (world.left + 3) * world.pixelsPerMeter;
  this.p1Bg.position.y = (world.top  + 1) * world.pixelsPerMeter;

  this.p2Bg = GF.sprite('/game/images/hud-bg.png', 16, 3);
  this.p2Bg.position.x = (world.right - 3) * world.pixelsPerMeter - this.p2Bg.width;
  this.p2Bg.position.y = (world.top   + 1) * world.pixelsPerMeter;
  
  this.p1Name = GF.text('John', 20);
  this.p1Name.position.x = (world.left + 7)   * world.pixelsPerMeter;
  this.p1Name.position.y = (world.top  + 1.8) * world.pixelsPerMeter;

  this.p2Name = GF.text('Bill', 20);
  this.p2Name.position.x = (world.right - 11) * world.pixelsPerMeter;
  this.p2Name.position.y = (world.top + 1.8)  * world.pixelsPerMeter;
    
};

Hud.prototype = new Entity();

Hud.prototype.create = function(physicsEngine, graphicsEngine) {
  graphicsEngine.addChild(this.p1Bg);
  graphicsEngine.addChild(this.p2Bg);
  graphicsEngine.addChild(this.p1Name);
  graphicsEngine.addChild(this.p2Name);
};

Hud.prototype.destroy = function(physicsEngine, graphicsEngine) {
  graphicsEngine.removeChild(this.p1Name);
  graphicsEngine.removeChild(this.p2Name);
};

module.exports = Hud;
