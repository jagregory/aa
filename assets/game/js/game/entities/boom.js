var GF            = require('../../engine/graphics-factory');
var Entity        = require('../../engine/entity');
var userInterface = require('../../engine/user-interface');
var mathUtils     = require('../../engine/math-utils');

var PI            = 3.14;
var TIME_STRETCH  = 200;  // millis
var INITIAL_WIDTH = 200;  // pixels
var INITIAL_CIRCLE_WIDTH = 50; // pixels

function Boom(id, playerIndex) {
  
  this.id = id;
  
  var x = playerIndex === 0 ? userInterface.width : 0;
  
  this.circle = GF.uiSprite('/game/images/boom-circle.png', INITIAL_CIRCLE_WIDTH, userInterface.height / 2, 0);
  this.circle.position.x = x;
  this.circle.position.y = userInterface.height / 2;

  this.flash = GF.uiSprite('/game/images/boom-flash.png', INITIAL_WIDTH, userInterface.width / 7.25, 0);
  this.flash.position.x = x;
  this.flash.position.y = userInterface.height / 2;

  if (playerIndex === 0) {
    this.circle.rotation = PI;
    this.flash.rotation  = PI;
  }
  
  this.time = 0;
  
}

Boom.prototype = new Entity();

Boom.prototype.create = function(engine, game) {
  engine.graphics.add(this.circle);
  engine.graphics.add(this.flash);
};

Boom.prototype.destroy = function(engine, game) {
  engine.graphics.remove(this.circle);
  engine.graphics.remove(this.flash);
};

Boom.prototype.update = function(engine, game, delta) {
  this.circle.anchor.y = this.circle.texture.height / 2;
  this.flash.anchor.y  = this.flash.texture.height  / 2;
  
  this.time = mathUtils.clamp(this.time + delta, 0, TIME_STRETCH);
  this.flash.width  = interpolate(this.time, 0, TIME_STRETCH, INITIAL_WIDTH, userInterface.width);
  this.circle.width = interpolate(this.time, 0, TIME_STRETCH, INITIAL_CIRCLE_WIDTH, userInterface.height / 2 / 1.4);
};

function interpolate(current, inputMin, inputMax, outputMin, outputMax) {
  return outputMin + (current / (inputMax-inputMin)) * (outputMax - outputMin);
}

module.exports = Boom;
