var Entity = require('../../engine/entity');
var GF = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

var MARGIN = 30 //pixels;
var HUD_WIDTH = 358;
var HUD_HEIGHT = 52;
var HUD_TEXT_X = 95;

function Hud(text) {
  
  this.id = 'hud';
  
  this.p1Name = GF.text('John Doe', 25);
  this.p1Name.position.x = MARGIN + HUD_TEXT_X;
  this.p1Name.position.y = MARGIN + 10;

  this.p2Name = GF.text('John Doe', 25);
  this.p2Name.position.x = userInterface.width - MARGIN - HUD_WIDTH + HUD_TEXT_X;
  this.p2Name.position.y = MARGIN + 10;

  this.time = GF.text(fourDigits(0), 35, {fill: '#fff', stroke: '#000'});
  this.time.position.x = userInterface.width / 2 - this.time.width / 2;
  this.time.position.y = MARGIN + 3;
    
};

Hud.prototype = new Entity();

Hud.prototype.create = function(engine, game) {
  engine.graphics.add(this.p1Name);
  engine.graphics.add(this.p2Name);
  engine.graphics.add(this.time);
};

Hud.prototype.destroy = function(engine, game) {
  engine.graphics.remove(this.p1Name);
  engine.graphics.remove(this.p2Name);
  engine.graphics.remove(this.time);
};

Hud.prototype.update = function(engine, game, delta) {
  var p1 = engine.getEntity('p1');
  var p2 = engine.getEntity('p2');
  this.p1Name.setText(p1.name + ' ' + p1.score);
  this.p2Name.setText(p1.name + ' ' + p1.score);
  this.time.setText(fourDigits(game.remainingTime));
};

function fourDigits(seconds) {
  var padded = (seconds < 10) ? ('0' + seconds) : seconds;
  return '00:' + padded;
}

module.exports = Hud;
