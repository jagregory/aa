var CompoundEntity  = require('../../engine/compound-entity');
var Background      = require('./background');
var Wall            = require('./wall');
var Cone            = require('./cone');
var Goal            = require('./goal');
var world           = require('../world');

var PI     = 3.14159;
var width  = world.width;
var height = world.height;
var top    = 3.4;
var left   = 0.5;
var right  = world.width  - 0.5;
var bottom = world.height - 2.4;

function Stadium() {
  
  this.id = 'stadium';
  
  this.entities = [];
  this.entities.push(new Background());
  
  this.entities.push(new Wall('wall-top',               width / 2,      top,                width,   1,               0));
  this.entities.push(new Wall('wall-bottom',            width / 2,      bottom,             width,   1,               0));
  this.entities.push(new Wall('wall-left1',             left  + 2.8,    height * 0.85/6,    1,       height / 2.5,    0.08));
  this.entities.push(new Wall('wall-left2',             left  + 1.1,    height * 5.10/6,    1,       height / 2.5,    0.05));
  this.entities.push(new Wall('wall-right1',            right - 2.7,    height * 0.85/6,    1,       height / 2.5,   -0.06));
  this.entities.push(new Wall('wall-right2',            right - 1.2,    height * 5.10/6,    1,       height / 2.5,   -0.05));
  this.entities.push(new Wall('wall-goal-left-top',     0,              height / 2 - 6.0,   4,       1,               0));
  this.entities.push(new Wall('wall-goal-left-bottom',  0,              height / 2 + 5.1,   2.7,     1,               0));
  this.entities.push(new Wall('wall-goal-right-top',    width,          height / 2 - 5.9,   4,       1,               0));
  this.entities.push(new Wall('wall-goal-right-bottom', width,          height / 2 + 5.1,   2.5,     1,               0));
    
  this.entities.push(new Cone('cone1', width / 12 * 5,   height / 5 * 1.5));
  this.entities.push(new Cone('cone2', width / 12 * 7,   height / 5 * 3.5));
  
  this.entities.push(new Goal('goalp1', 0,  0,            height / 2, 0.5, 14));
  this.entities.push(new Goal('goalp2', 1,  world.width,  height / 2, 0.5, 14));
  
}

Stadium.prototype = new CompoundEntity();

Stadium.prototype.shake = function(againstPlayerIndex) {
  this.entities[0].shake(againstPlayerIndex);
};

module.exports = Stadium;
