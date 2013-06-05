var GameEngine      = require('./game-engine');
var gameWorld       = require('./game-world');
var bridgeSocket    = require('./bridge/socket');
var bridgeKeyboard  = require('./bridge/keyboard');

window.Main = function() {
  
  var gameEngine  = null;

  var container  = document.querySelector('#container');
  var gameView   = document.querySelector('#gameView');
  var debugView  = document.querySelector('#debugView');
  
  debugView.height = window.innerHeight;
  debugView.width  = window.innerWidth;
  gameView.height  = window.innerHeight;
  gameView.width   = window.innerWidth;
    
  // Wire external events
  bridgeKeyboard.connect(matchStart, playerMove, playerStop);
  bridgeSocket.connect(matchStart, playerMove, playerStop);
  
  function matchStart(players) {
    // Cleanup any previous game?
    var players = players.map(function(p) {
      return {
        id: p.id,
        name: p.firstName + ' ' + p.lastName,
        score: 0
      }
    });
    gameEngine = new GameEngine({
      world: gameWorld,
      players: players,
      gameView: gameView,
      debugView: debugView
    });
    gameEngine.start();
  }
  
  function playerMove(args) {
    if (gameEngine) {
      gameEngine.input('move', args);
    }
  }
  
  function playerStop(args) {
    if (gameEngine) {
      gameEngine.input('stop', args);
    }
  }
  
};





//
//
// Old code, where do we put this?
//
//

/*
  var assetLoader = new PIXI.AssetLoader(['/game/images/paddle.png', '/game/images/ball.png', '/game/images/particle.png']);
  assetLoader.onComplete = function() {
    console.log('Assets loaded. Starting game.')
    bridgeSocket.connect(matchStart, matchMove);
    bridgeKeyboard.connect(matchStart, matchMove);
  };

  console.log('Loading assets');
  assetLoader.load();
*/

