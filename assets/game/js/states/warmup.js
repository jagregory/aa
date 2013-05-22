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
    var text = new PIXI.Text("GET READY", {font: "40px PressStart2P", fill: "#000", align: "center", stroke: "#fff", strokeThickness: 4});
    text.position.x = (world.width  * world.pixelsPerMeter) / 2 - text.width  / 2;
    text.position.y = (world.height * world.pixelsPerMeter) / 2 - text.height / 2;
    text.anchor.x = 0.5;
    game.stage.addChild(text);
  }
  
}

module.exports = WarmUp;
