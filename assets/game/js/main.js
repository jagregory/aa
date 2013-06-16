var bridgeSocket    = require('./bridge-socket');
var bridgeKeyboard  = require('./bridge-keyboard');
var Engine          = require('./engine/engine');
var Intro           = require('./intro/intro')
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

  function showIntro() {
    cleanup();
    engine.attach(new Intro(engine));
  }

  function matchStart(players) {
    cleanup();
    if (!game) {
      game = new Game(engine, players);
      engine.attach(game);
      hub.on('game.finish', endMatchOnServer);
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
      players: game.players.map(function(player) {
        return {
          id: player.id,
          score: player.score
        }
      })
    }).then(showIntro).fail(showIntro);
  }
  
  function cleanup() {
    hub.unbind('game.*');
    engine.detach();
    engine.reset();
    game = null;
  }  

  preloadAssets(function() {
    engine.start();
    showIntro();
    bridgeKeyboard.connect(matchStart, playerMove);
    bridgeSocket.connect(matchStart, playerMove);
  });
};

function preloadAssets(callback) {
  var assetLoader = new PIXI.AssetLoader([
    '/game/images/ball.png',
    '/game/images/boom-circle.png',
    '/game/images/boom-line.png',
    '/game/images/boom-splash.png',
    '/game/images/cat-down.png',
    '/game/images/cat-up.png',
    '/game/images/cat.png',
    '/game/images/cone.png',
    '/game/images/dog-down.png',
    '/game/images/dog-up.png',
    '/game/images/dog.png',
    '/game/images/leaderboard.png',
    '/game/images/particle-orange.png',
    '/game/images/particle.png',
    '/game/images/stadium-shake-left.png',
    '/game/images/stadium-shake-right.png',
    '/game/images/stadium.png',
    '/game/images/title.png'
  ]);
  assetLoader.onComplete = function() {
    console.log('Assets loaded')
    callback()
  };
  console.log('Loading assets');
  assetLoader.load();
}
