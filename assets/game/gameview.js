var Game = require('./game');
var bridgeSocket = require('./bridge/socket');
var bridgeKeyboard = require('./bridge/keyboard');

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})()

window.Pong = {};
window.Pong.GameView = function() {

  var board = $('#board');
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(960, 480);
  board[0].appendChild(renderer.view);

  var currentMatch = null;

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
