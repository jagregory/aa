// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})()

;(function() {
  var interval = 1000.0 / 60

  var Player = function(stage, left) {
    var texture = PIXI.Texture.fromImage('/game/paddle.png')
    var sprite = new PIXI.Sprite(texture)
    stage.addChild(sprite)
    var speed = 0.1

    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()

    sprite.position.x = 10
    sprite.position.y = (boardHeight / 2) - (sprite.height / 2)

    var target = {
      x: 0,
      y: 0
    }

    var animationStepX = 0
    var animationStepY = 0
    
    var update = function(delta) {
      if ((animationStepX > 0 && sprite.position.x < target.x) || (animationStepX < 0 && sprite.position.x > target.x)) {
        sprite.position.x += animationStepX * delta * speed
      }

      if ((animationStepY > 0 && sprite.position.y < target.y) || (animationStepY < 0 && sprite.position.y > target.y)) {
        sprite.position.y += animationStepY * delta * speed
      }
    }

    return {
      moveBy: function(xDelta, yDelta) {
        target = {
          x: sprite.position.x + xDelta,
          y: sprite.position.y + yDelta
        }

        animationStepX = target.x - sprite.position.x
        animationStepY = target.y - sprite.position.y
      },
      tick: function(delta) {
        update(delta)
      }
    }
  }

  var Ball = function(stage) {
    var texture = PIXI.Texture.fromImage('/game/ball.png')
    var sprite = new PIXI.Sprite(texture)
    stage.addChild(sprite)

    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()

    sprite.position.x = (boardWidth / 2) - (sprite.width / 2)
    sprite.position.y = (boardHeight / 2) - (sprite.height / 2)

    var speed = 50.0
    var target = {
        x: 0,
        y: 0
      },

      animationStepX = 0,
      animationStepY = 0,
    
      update = function(delta) {
        // if ((animationStepX > 0 && position.x < target.x) || (animationStepX < 0 && position.x > target.x)) {
        //   position.x += animationStepX * delta * speed
        // }

        // if ((animationStepY > 0 && position.y < target.y) || (animationStepY < 0 && position.y > target.y)) {
        //   position.y += animationStepY * delta * speed
        // }
      }

    return {
      moveTo: function(newPos) {
        // target = newPos
        // animationStepX = (newPos.x - position.x)
        // animationStepY = (newPos.y - position.y)
      },
      tick: function(delta) {
        update(delta)
      }
    }
  }

  var Game = function(stage) {
    var time = new Time()
    var socket = io.connect('http://localhost:8080')

    var ball = new Ball(stage)
    var players = []

    var tick = function() {
      time.update()
      ball.tick(time.delta)

      players.forEach(function(player) {
        player.tick(time.delta)
      })
    }

    var playerJoin = function(data) {
      var player = new Player(stage)
      player.id = data.id
      player.name = data.name
      players.push(player)

      console.log('Player ' + player.name + ' joined')
    }
    var playerLeave = function(data) {
      for (var i = 0; i < players.length; i++) {
        var player = players[i]
        if (player && player.id === data.id) {
          delete players[i]
          console.log('Player ' + player.name + ' left')
        }
      }
    }
    var playerMove = function(data) {
      var player = _.findWhere(players, { id: data.id })
      if (player) {
        player.moveBy(data.xDelta, data.yDelta)
      }
    }

    socket.on('player-join', playerJoin)
    socket.on('player-leave', playerLeave)
    socket.on('player-move', playerMove)

    var g = this
    return {
      tick: function() {
        tick.call(g)
      },
      playerJoin: playerJoin,
      playerLeave: playerLeave,
      playerMove: playerMove,
      players: function() {
        return players
      }
    }
  }

  $(function() {
    var countElement = $('#count')
    var statusElement = $('#status')
    var board = $('#board')

    var stage = new PIXI.Stage(0x000000, false)
    var renderer = PIXI.autoDetectRenderer(500, 300)

    board[0].appendChild(renderer.view)

    var assetLoader = new PIXI.AssetLoader(['/game/paddle.png', '/game/ball.png'])
    assetLoader.onComplete = function() {
      console.log('Assets loaded. Starting game.')
      var instance = window.game = new Game(stage)

      requestAnimFrame(function animate(delta) {
        instance.tick(delta)

        renderer.render(stage)

        requestAnimFrame(animate)
      })
    }

    console.log('Loading assets')
    assetLoader.load()
  })
})()