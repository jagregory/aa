var Entity = require('../../engine/entity');
var GF = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

var TEXT_TOP          = 40;
var PLAYERS_MARGIN_X  = 200;
var SCORE_MARGIN_X    = 400;

function Hud(text) {
  
  this.id = 'hud';
  
  this.p1Name = GF.text('John Doe', 30, {fill: '#01518d', stroke: '#fff', strokeThickness: 3});
  this.p1Name.position.x = PLAYERS_MARGIN_X - this.p1Name.width / 2;
  this.p1Name.position.y = TEXT_TOP;

  this.p2Name = GF.text('John Doe', 30, {fill: '#bf0000', stroke: '#fff', strokeThickness: 3});
  this.p2Name.position.x = userInterface.width - PLAYERS_MARGIN_X - this.p2Name.width / 2;
  this.p2Name.position.y = TEXT_TOP;

  this.p1Score = GF.text('0', 30, {fill: '#fff', stroke: '#000', strokeThickness: 3});
  this.p1Score.position.x = SCORE_MARGIN_X - this.p1Score.width / 2;
  this.p1Score.position.y = TEXT_TOP;

  this.p2Score = GF.text('0', 30, {fill: '#fff', stroke: '#000', strokeThickness: 3});
  this.p2Score.position.x = userInterface.width - SCORE_MARGIN_X - this.p2Score.width / 2;
  this.p2Score.position.y = TEXT_TOP;

  this.time = GF.text(fourDigits(0), 30, {fill: '#fff', stroke: '#000', strokeThickness: 3});
  this.time.position.x = userInterface.width / 2 - this.time.width / 2;
  this.time.position.y = TEXT_TOP;
    
};

Hud.prototype = new Entity();

Hud.prototype.create = function(engine, game) {
  engine.graphics.add(this.p1Name);
  engine.graphics.add(this.p1Score);
  engine.graphics.add(this.p2Name);
  engine.graphics.add(this.p2Score);
  engine.graphics.add(this.time);
};

Hud.prototype.destroy = function(engine, game) {
  engine.graphics.remove(this.p1Name);
  engine.graphics.remove(this.p1Score);
  engine.graphics.remove(this.p2Name);
  engine.graphics.remove(this.p2Score);
  engine.graphics.remove(this.time);
};

Hud.prototype.update = function(engine, game, delta) {
  var p1 = game.players[0];
  var p2 = game.players[1];
  this.p1Name.setText(p1.name);
  this.p1Score.setText(p1.score.toString());
  this.p2Name.setText(p2.name);
  this.p2Score.setText(p2.score.toString());
  this.time.setText(fourDigits(game.timeRemaining));
};

function fourDigits(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000);
  var padded = (seconds < 10) ? ('0' + seconds) : seconds;
  return '00:' + padded;
}

module.exports = Hud;
