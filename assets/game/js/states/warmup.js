// reset players pos
// can move, but no ball

var Arena = require('../entities/arena');
var Player = require('../entities/player');
var Text = require('../entities/text');
var GF = require('../engines/graphics-factory');
var world = require('../world');

var startingPos = [
  world.width / 12,
  world.width - world.width / 12
];

function WarmUp(game) {
  
  // ideally, the game can track it by ID
  // and we can remove it without holding a reference to it
  var text = null;
  
  this.enter = function() {
    
    game.addEntity(Arena.random(game, game.physics));
    game.addEntity(newPlayer(game.players, 0, 'p1'));
    game.addEntity(newPlayer(game.players, 1, 'p2'));
    game.addEntity(new Text('get-ready', 'GET READY!'));
    
    setTimeout(function() {
      game.transition('ready');
    }, 2000);
    
  };
  
  this.exit = function() {
    game.deleteEntity('get-ready');
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
  function newPlayer(players, index, id) {
    var x = startingPos[index];
    var y = world.height / 2;
    return new Player(id, x, y, game);
  }
  
}

module.exports = WarmUp;
