// reset players pos
// can move, but no ball

var Arena = require('../entities/arena');
var Player = require('../entities/player');
var world = require('../physics/world');

var startingPos = [
  world.width / 12,
  world.width - world.width / 12
];

function WarmUp(game) {
  
  this.enter = function() {
    game.track(Arena.random(game, game.physics));
    game.track(newPlayer(game.players, 0, 'p1'));
    game.track(newPlayer(game.players, 1, 'p2'));
    getReady();
    setTimeout(function() {
      game.transition('ready');
    }, 2000);
  };
  
  this.exit = function() {
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
  function newPlayer(players, index, id) {
    return new Player(game, game.physics, {
      id: id,
      name: players[index].firstName + players[index].lastName,
      x: startingPos[index],
      y: world.height / 2 
    });
  }
  
  function getReady() {
    // display "get ready" message
  }
  
}

module.exports = WarmUp;

