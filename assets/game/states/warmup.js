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
    game.track(Arena.random(game, game.engine.physics));
    game.track(newPlayer(0, 'p1', game.players.p1));
    game.track(newPlayer(1, 'p2', game.players.p2));
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
  
  function newPlayer(index, id, player) {
    return new Player(game, game.engine.physics, {
      id: id,
      name: player.firstName + player.lastName,
      x: startingPos[index],
      y: world.height / 2 
    });
  }
  
  function getReady() {
    // display "get ready" message
  }
  
}

module.exports = WarmUp;

