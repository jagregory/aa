var assetLoader     = require('./asset-loader');
var bridgeSocket    = require('./bridge-socket');
var bridgeKeyboard  = require('./bridge-keyboard');
var Engine          = require('./engine/engine');
var Intro           = require('./intro/intro')
var Game            = require('./game/game');
var world           = require('./game/world');
var hub             = require('./engine/hub');

window.Main = function() {
  assetLoader.preloadAndRun(mainLoop);
};

function mainLoop() {
  
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

  engine.start();
  showIntro();
  bridgeKeyboard.connect(matchStart, playerMove);
  bridgeSocket.connect(matchStart, playerMove);
}
