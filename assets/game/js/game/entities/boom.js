var GF            = require('../../engine/graphics-factory');
var Entity        = require('../../engine/entity');
var userInterface = require('../../engine/user-interface');
var mathUtils     = require('../../engine/math-utils');

var TIME_STRETCH  = 300;  // millis
var INITIAL_WIDTH = 200;  // pixels

function Boom(id) {
  
  this.id = id;
  
  this.circle = GF.uiSprite('/game/images/boom-circle.png', userInterface.height / 2 / 1.4, userInterface.height / 2, 0);
  this.circle.position.x = 0;
  this.circle.position.y = userInterface.height / 4;

  this.flash = GF.uiSprite('/game/images/boom-flash.png', INITIAL_WIDTH, userInterface.width / 7.25, 0);
  this.flash.position.x = 0;
  this.flash.position.y = userInterface.height / 2 - this.flash.height / 2;
  
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
  this.time = mathUtils.clamp(this.time + delta, 0, TIME_STRETCH);
  this.flash.width = INITIAL_WIDTH + (this.time / TIME_STRETCH) * (userInterface.width - INITIAL_WIDTH);
};

module.exports = Boom;
