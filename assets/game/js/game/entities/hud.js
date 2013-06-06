var Entity = require('../../engine/entity');
var GF = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

var MARGIN = 30 //pixels;
var HUD_WIDTH = 358;
var HUD_HEIGHT = 52;
var HUD_TEXT_X = 95;

function Hud(text) {
  
  this.id = 'hud';
  
  this.p1Bg = GF.uiSprite('/game/images/hud-bg.png', HUD_WIDTH, HUD_HEIGHT);
  this.p1Bg.position.x = MARGIN;
  this.p1Bg.position.y = MARGIN;

  this.p2Bg = GF.uiSprite('/game/images/hud-bg.png', HUD_WIDTH, HUD_HEIGHT);
  this.p2Bg.position.x = userInterface.width - MARGIN - HUD_WIDTH;
  this.p2Bg.position.y = MARGIN;
  
  this.p1Name = GF.text('John Doe', 20);
  this.p1Name.position.x = MARGIN + HUD_TEXT_X;
  this.p1Name.position.y = MARGIN + 12;

  this.p2Name = GF.text('John Doe', 20);
  this.p2Name.position.x = userInterface.width - MARGIN - HUD_WIDTH + HUD_TEXT_X;
  this.p2Name.position.y = MARGIN + 12;

  this.time = GF.text(fourDigits(0), 20);
  this.time.position.x = userInterface.width / 2 - this.time.width / 2;
  this.time.position.y = MARGIN + 12;
    
};

Hud.prototype = new Entity();

Hud.prototype.create = function(physicsEngine, graphicsEngine) {
  graphicsEngine.add(this.p1Bg);
  graphicsEngine.add(this.p2Bg);
  graphicsEngine.add(this.p1Name);
  graphicsEngine.add(this.p2Name);
  graphicsEngine.add(this.time);
};

Hud.prototype.destroy = function(physicsEngine, graphicsEngine) {
  graphicsEngine.remove(this.p2Bg);
  graphicsEngine.remove(this.p2Bg);
  graphicsEngine.remove(this.p1Name);
  graphicsEngine.remove(this.p2Name);
  graphicsEngine.remove(this.time);
};

Hud.prototype.updateTime = function(seconds) {
  this.time.setText(fourDigits(seconds));
};

function fourDigits(seconds) {
  var padded = (seconds < 10) ? ('0' + seconds) : seconds;
  return '00:' + padded;
}

module.exports = Hud;
