var bridgeSocket    = require('./bridge-socket');
var bridgeKeyboard  = require('./bridge-keyboard');
var Engine          = require('./engine/engine');
var Game            = require('./game/game');
var hub             = require('./engine/hub');

window.Main = function() {
  
  var engine = null;
  var game   = null;

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
    // TODO: what about a new match? Reset everything?
    game = new Game(players);
    engine = new Engine(game, gameView, debugView);
    engine.start();
  }
  
  function playerMove(args) {
    if (engine) {
      engine.message('move', args);
    }
  }
  
  function playerStop(args) {
    if (engine) {
      engine.message('stop', args);
    }
  }
  
  hub.on('finish', function() {
    engine.stop();
    console.log('Game finished');
    console.log('P1 score = ' + game.players[0].score);
    console.log('P2 score = ' + game.players[1].score);
  });
  
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

