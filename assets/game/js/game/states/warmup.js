// reset players pos
// can move, but no ball

var Stadium = require('../entities/stadium');
var Player = require('../entities/player');
var Hud = require('../entities/hud');
var ActionText = require('../entities/action-text');
var GF = require('../../engine/graphics-factory');

function WarmUp(game, engine) {

  var startingPos = [
    game.world.width / 8,
    game.world.width - game.world.width / 8
  ];
  
  this.enter = function() {

    engine.addEntity(new Stadium());
    engine.addEntity(new Player('p1', startingPos[0], game.world.height / 2));
    engine.addEntity(new Player('p2', startingPos[1], game.world.height / 2));
    engine.addEntity(new Hud());
    engine.addEntity(new ActionText('get-ready', 'GET READY!'));

    setTimeout(function() {
      engine.transition('ready');
    }, 2000);    

  };
  
  this.exit = function() {
    engine.deleteEntity('get-ready');
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = WarmUp;
