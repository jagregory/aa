var bridgeSocket    = require('./bridge-socket');
var bridgeKeyboard  = require('./bridge-keyboard');
var Engine          = require('./engine/engine');
var Game            = require('./game/game');
var world           = require('./game/world');
var hub             = require('./engine/hub');
var Leaderboard     = require('./game/entities/leaderboard')

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
  
  preloadAssets();

  engine.start()

  function showLeaderboard() {
    cleanup()

    var leaderboard = new Leaderboard()
    engine.addEntity(leaderboard)
  }

  function matchStart(players) {
    cleanup()

    if (!game) {
      game = new Game(engine, players);
      engine.attach(game);
      engine.start();
      hub.on('finish', endMatchOnServer);
    }
  }
  
  function playerMove(args) {    
    if (game) {
      game.move(args.pindex, args.dir);
    }
  }
  
  function endMatchOnServer() {
    $.post('/game/status', {
      status: 'finished',
      scores: {
        p1: game.players[0].score,
        p2: game.players[1].score
      }
    }).then(showLeaderboard).fail(cleanup);
  }
  
  function cleanup() {
    engine.stop();
    engine.detach();
    engine.reset();
    game = null;
  }

  showLeaderboard()
  
  bridgeKeyboard.connect(matchStart, playerMove);
  bridgeSocket.connect(matchStart, playerMove);
};

function preloadAssets() {
  var assetLoader = new PIXI.AssetLoader([
    '/game/images/stadium.png',
    '/game/images/stadium-shake-left.png',
    '/game/images/stadium-shake-right.png'
  ]);
  assetLoader.onComplete = function() {
    console.log('Assets loaded. Starting game.')
  };
  console.log('Loading assets');
  assetLoader.load();
}
