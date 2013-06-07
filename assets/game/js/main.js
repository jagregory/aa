var bridgeSocket    = require('./bridge-socket');
var bridgeKeyboard  = require('./bridge-keyboard');
var Engine          = require('./engine/engine');
var Game            = require('./game/game');
var world           = require('./game/world');
var hub             = require('./engine/hub');

window.Main = function() {
  
  var container  = document.querySelector('#container');
  var gameView   = document.querySelector('#gameView');
  var debugView  = document.querySelector('#debugView');
  
  debugView.height = window.innerHeight;
  debugView.width  = window.innerWidth;
  gameView.height  = window.innerHeight;
  gameView.width   = window.innerWidth;
  
  var engine = new Engine(world, gameView, debugView);
  var game   = null;
  
  function matchStart(players) {
    if (!game) {
      game = new Game(engine, players);
      engine.attach(game);
      engine.start();
      hub.on('finish', endMatchOnServer);
    }
  }
  
  function playerMove(args) {
    if (game) {
      game.message('move', args);
    }
  }
  
  function playerStop(args) {
    if (game) {
      game.message('stop', args);
    }
  }
  
  function endMatchOnServer() {
    $.post('/game/status', {
      status: 'finished',
      scores: {
        p1: game.players[0].score,
        p2: game.players[1].score
      }
    }).then(cleanup).fail(cleanup);
  }
  
  function cleanup() {
    engine.stop();
    engine.detach();
    engine.reset();
    game = null;
  }
  
  bridgeKeyboard.connect(matchStart, playerMove, playerStop);
  bridgeSocket.connect(matchStart, playerMove, playerStop);
  
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

