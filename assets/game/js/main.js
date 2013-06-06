var bridgeSocket    = require('./bridge-socket');
var bridgeKeyboard  = require('./bridge-keyboard');
var Engine          = require('./engine/engine');
var game            = require('./game/game');
var sequences       = require('./game/sequences');

window.Main = function() {
  
  var engine  = null;

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
    //
    // TODO: Cleanup any previous game?
    //
    // TODO: moving the player does not belong to the engine
    // In fact the engine shouldn't even be aware there's players
    //
    var players = players.map(function(p) {
      return {
        id: p.id,
        name: p.firstName + ' ' + p.lastName,
        score: 0
      }
    });
    engine = new Engine(game.world, sequences, players, gameView, debugView);
    engine.start();
  }
  
  function playerMove(args) {
    if (engine) {
      engine.input('move', args);
    }
  }
  
  function playerStop(args) {
    if (engine) {
      engine.input('stop', args);
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

