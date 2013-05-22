var Engine = require('./engine');
var Game = require('./game');

var bridgeSocket = require('./bridge/socket');
var bridgeKeyboard = require('./bridge/keyboard');

window.Pong = {};
window.Pong.GameView = function() {
  
  var board = $('#board').get(0);
  var engine = new Engine();
  board.appendChild(engine.renderer.view);
  engine.physics.debugDraw($('canvas.debug')[0]);
  
  
  // Start a game
  // This should be done when the socket/keyboard says so
  var currentGame = null;
//  var game = new Game(engine, {id: '24234'}, {id: '56756'});
  
  bridgeKeyboard.connect(matchStart, matchMove);
  bridgeSocket.connect(matchStart, matchMove);
  
  
  function matchStart(players) {
    // Cleanup any previous game?
    currentGame = new Game(engine, {id: '24234'}, {id: '56756'});
    engine.setGame(currentGame);
  }

  function matchMove(args) {
    if (currentGame) {
      currentGame.input('move', args);
    }
  }

};





//
//
// Old code
//
//


window.Pong.GameViewOld = function() {

  function matchStart(players) {
    currentMatch = window.game = new Game(stage, players);
    requestAnimFrame(function animate(delta) {
      currentMatch.tick(delta)
      renderer.render(stage)
      requestAnimFrame(animate)
    });
  }
  
  function matchMove(args) {
    if (currentMatch) {
      currentMatch.playerMove(args.pindex, args.vector);
    }
  }

  var assetLoader = new PIXI.AssetLoader(['/game/images/paddle.png', '/game/images/ball.png', '/game/images/particle.png']);
  assetLoader.onComplete = function() {
    console.log('Assets loaded. Starting game.')
    bridgeSocket.connect(matchStart, matchMove);
    bridgeKeyboard.connect(matchStart, matchMove);
  };

  console.log('Loading assets');
  assetLoader.load();
  
};
