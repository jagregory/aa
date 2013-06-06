var CompoundEntity  = require('../../engine/compound-entity');
var Background      = require('./background');
var Wall            = require('./wall');
var Cone            = require('./cone');
var Goal            = require('./goal');
var world           = require('../world');

var PI     = 3.14;
var width  = world.width;
var height = world.height;
var top    = 3;
var left   = 0.5;
var right  = world.width  - 0.5;
var bottom = world.height - 1.5;

function Stadium() {
  
  this.entities.push(new Background());
  
  this.entities.push(new Wall('wall-top',    width / 2, top,            width, 1,            0));
  this.entities.push(new Wall('wall-bottom', width / 2, bottom,         width, 1,            0));
  this.entities.push(new Wall('wall-left1',  left  + 2, height * 1.0/6, 1,     height / 2.5, 0));
  this.entities.push(new Wall('wall-left2',  left  + 2, height * 4.9/6, 1,     height / 2.5, 0));
  this.entities.push(new Wall('wall-right1', right - 2, height * 1.0/6, 1,     height / 2.5, 0));
  this.entities.push(new Wall('wall-right2', right - 2, height * 4.9/6, 1,     height / 2.5, 0));
  
  this.entities.push(new Cone('cone1', width / 12 * 5, height / 3 * 1));
  this.entities.push(new Cone('cone2', width / 12 * 7, height / 3 * 2));
  
  this.entities.push(new Goal('goalp1', 0, left,  height / 2, 2, 8));
  this.entities.push(new Goal('goalp2', 1, right, height / 2, 2, 8));
  
}

Stadium.prototype = new CompoundEntity();

module.exports = Stadium;
