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
  var board = $('#board')
  var stage = new PIXI.Stage()
  var renderer = PIXI.autoDetectRenderer(640, 480)

  board[0].appendChild(renderer.view)

  var assetLoader = new PIXI.AssetLoader(['/game/paddle.png', '/game/ball.png'])
  assetLoader.onComplete = function() {
    console.log('Assets loaded. Starting game.')
    var instance = window.game = new Game(stage)

    var socket = io.connect('http://localhost:8080')
    socket.on('player-join', instance.playerJoin)
    socket.on('player-leave', instance.playerLeave)
    socket.on('player-move', instance.playerMove)

    requestAnimFrame(function animate(delta) {
      instance.tick(delta)

      renderer.render(stage)

      requestAnimFrame(animate)
    })
  }

  console.log('Loading assets')
  assetLoader.load()
})