var Game = require('./game')

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})()

$(function() {
  var board = $('#board');
  var stage = new PIXI.Stage();
  var renderer = PIXI.autoDetectRenderer(640, 480);

  board[0].appendChild(renderer.view)

  var assetLoader = new PIXI.AssetLoader(['/game/paddle.png', '/game/ball.png', '/game/particle.png'])
  assetLoader.onComplete = function() {
    
    console.log('Assets loaded. Starting game.')
    var currentMatch = null

    var socket = io.connect('http://localhost:8080');
    
    socket.on('match-start', function(players) {
      currentMatch = window.game = new Game(stage, players);
      requestAnimFrame(function animate(delta) {
        currentMatch.tick(delta)
        renderer.render(stage)
        requestAnimFrame(animate)
      });
    });
    
    socket.on('match-move', function(args) {
      if (currentMatch) {
        currentMatch.playerMove(args.pindex, args.vector);
      }
    });

  }

  console.log('Loading assets');
  assetLoader.load();
  
});
