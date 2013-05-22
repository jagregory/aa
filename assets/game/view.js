var GameEngine = require('./game-engine');

var bridgeSocket = require('./bridge/socket');
var bridgeKeyboard = require('./bridge/keyboard');

window.View = function() {
  
  var gameEngine = null;

  var board = document.querySelector('#board');
  var debugCanvas = document.querySelector('canvas.debug');
  
  // Wire external events
  bridgeKeyboard.connect(matchStart, matchMove);
  bridgeSocket.connect(matchStart, matchMove);
  
  function matchStart(players) {
    // Cleanup any previous game?
    gameEngine = new GameEngine({
      players: [{id: '24234', name: 'John'}, {id: '56756', name: 'Bill'}],
      debugDraw: debugCanvas
    });
    board.appendChild(gameEngine.view);
  }

  function matchMove(args) {
    if (gameEngine) {
      gameEngine.input('move', args);
    }
  }

};





//
//
// Old code
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

