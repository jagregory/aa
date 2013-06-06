// reset players pos
// can move, but no ball

var Arena = require('../entities/arena');
var Player = require('../entities/player');
var Hud = require('../entities/hud');
var ActionText = require('../entities/action-text');
var GF = require('../../engine/graphics-factory');
var game = require('../game');

var startingPos = [
  game.world.width / 10,
  game.world.width - game.world.width / 10
];

function WarmUp(engine) {
  
  this.enter = function() {

    engine.addEntity(new Arena());
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
