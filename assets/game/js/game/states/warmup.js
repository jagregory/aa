// reset players pos
// can move, but no ball

var GF          = require('../../engine/graphics-factory');
var Stadium     = require('../entities/stadium');
var Player      = require('../entities/player');
var Hud         = require('../entities/hud');
var ActionText  = require('../entities/action-text');
var world       = require('../world');

function WarmUp(engine, game) {

  var startingPos = [
    world.width / 8,
    world.width - world.width / 8
  ];
  
  this.enter = function() {

    engine.addEntity(new Stadium());
    engine.addEntity(new Player('p1', startingPos[0], world.height / 2));
    engine.addEntity(new Player('p2', startingPos[1], world.height / 2));
    engine.addEntity(new Hud());
    engine.addEntity(new ActionText('get-ready', 'GET READY!'));

    setTimeout(function() {
      game.transition('ready');
    }, 2000);    

  };
  
  this.exit = function() {
    engine.deleteEntity('get-ready');
  };
  
  this.update = function(delta) {
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = WarmUp;
