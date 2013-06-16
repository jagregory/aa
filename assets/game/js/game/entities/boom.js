var GF            = require('../../engine/graphics-factory');
var Entity        = require('../../engine/entity');
var userInterface = require('../../engine/user-interface');
var mathUtils     = require('../../engine/math-utils');

var PI              = 3.14;
var STRETCH_CIRCLE  =  80;  // millis
var STRETCH_SPLASH  = 180;  // millis
var STRETCH_LINE    = 300;  // millis

function Boom(id, againstPlayerIndex) {
  
  this.id = id;
  
  var x = (againstPlayerIndex === 0) ? 0 : userInterface.width;
  
  this.circle = GF.uiSprite('/game/images/boom-circle.png', 0, userInterface.height / 2, 0);
  this.circle.position.x = x;
  this.circle.position.y = userInterface.height / 2;

  this.splash = GF.uiSprite('/game/images/boom-splash.png', 0, userInterface.height / 1.2, 0);
  this.splash.position.x = x;
  this.splash.position.y = userInterface.height / 2;

  this.line = GF.uiSprite('/game/images/boom-line.png', 0, userInterface.height / 4, 0);
  this.line.position.x = x;
  this.line.position.y = userInterface.height / 2;

  if (againstPlayerIndex === 1) {
    this.circle.rotation = PI;
    this.splash.rotation = PI;
    this.line.rotation  = PI;
  }
  
  this.time = 0;
  
}

Boom.prototype = new Entity();

Boom.prototype.create = function(engine, game) {
  engine.graphics.add(this.circle);
  engine.graphics.add(this.splash);
  engine.graphics.add(this.line);
};

Boom.prototype.destroy = function(engine, game) {
  engine.graphics.remove(this.circle);
  engine.graphics.remove(this.splash);
  engine.graphics.remove(this.line);
};

Boom.prototype.update = function(engine, game, delta) {
  this.circle.anchor.y = this.circle.texture.height / 2;
  this.splash.anchor.y = this.splash.texture.height / 2;
  this.line.anchor.y  = this.line.texture.height  / 2;

  this.time = this.time + delta;
  var stretchCircle = mathUtils.clamp(this.time, 0, STRETCH_CIRCLE);
  var stretchSplash = mathUtils.clamp(this.time, 0, STRETCH_SPLASH);
  var stretchLine   = mathUtils.clamp(this.time, 0, STRETCH_LINE);
  
  this.circle.width = interpolate(stretchCircle, 0, STRETCH_CIRCLE, 0, this.circle.height * 0.71);
  this.splash.width = interpolate(stretchSplash, 0, STRETCH_SPLASH, 0, this.splash.height * 0.5);
  this.line.width   = interpolate(stretchLine,   0, STRETCH_LINE,   0, this.line.height   * 7.26);
  
  if (this.time >= STRETCH_CIRCLE) { this.circle.alpha *= 0.95; }
  if (this.time >= STRETCH_SPLASH) { this.splash.alpha *= 0.95; }
  if (this.time >= STRETCH_LINE)   { this.line.alpha   *= 0.95; }
};

function interpolate(current, inputMin, inputMax, outputMin, outputMax) {
  return outputMin + (current / (inputMax-inputMin)) * (outputMax - outputMin);
}

module.exports = Boom;
