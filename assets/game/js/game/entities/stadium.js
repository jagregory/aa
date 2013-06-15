var CompoundEntity  = require('../../engine/compound-entity');
var Background      = require('./background');
var Wall            = require('./wall');
var Cone            = require('./cone');
var Goal            = require('./goal');
var world           = require('../world');

var PI     = 3.14159;
var width  = world.width;
var height = world.height;
var top    = 3.8;
var left   = 0.5;
var right  = world.width  - 0.5;
var bottom = world.height - 2.7;

function Stadium() {
  
  this.id = 'stadium';
  
  this.entities = [];
  this.entities.push(new Background());
  
  this.entities.push(new Wall('wall-top',               width / 2,      top,                width,   1,               0));
  this.entities.push(new Wall('wall-bottom',            width / 2,      bottom,             width,   1,               0));
  this.entities.push(new Wall('wall-left1',             left  + 2.8,    height * 1.0/6,     1,       height / 2.5,    0.15));
  this.entities.push(new Wall('wall-left2',             left  + 1.1,    height * 4.9/6,     1,       height / 2.5,    0.05));
  this.entities.push(new Wall('wall-right1',            right - 2.5,    height * 1.0/6,     1,       height / 2.5,   -0.10));
  this.entities.push(new Wall('wall-right2',            right - 1.2,    height * 4.9/6,     1,       height / 2.5,   -0.05));
  this.entities.push(new Wall('wall-goal-left-top',     0,              height / 2 - 5.4,   4,       1,               0));
  this.entities.push(new Wall('wall-goal-left-bottom',  0,              height / 2 + 4.2,   2.7,     1,               0));
  this.entities.push(new Wall('wall-goal-right-top',    width,          height / 2 - 5.4,   4,       1,               0));
  this.entities.push(new Wall('wall-goal-right-bottom', width,          height / 2 + 4.1,   2.5,     1,               0));
    
  this.entities.push(new Cone('cone1', width / 12 * 5.5, height / 5 * 2));
  this.entities.push(new Cone('cone2', width / 12 * 6.5, height / 5 * 3));
  
  this.entities.push(new Goal('goalp1', 0,  0,            height / 2, 0.5, 10));
  this.entities.push(new Goal('goalp2', 1,  world.width,  height / 2, 0.5, 10));
  
}

Stadium.prototype = new CompoundEntity();

Stadium.prototype.shake = function(playerIndex) {
  this.entities[0].shake(playerIndex);
};

module.exports = Stadium;
