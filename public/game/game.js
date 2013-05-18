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
  var Player = function(stage, physics) {
    var texture = PIXI.Texture.fromImage('/game/paddle.png')
    var sprite = new PIXI.Sprite(texture)
    stage.addChild(sprite)

    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()

    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.position.x = 50
    sprite.position.y = 50
    sprite.width = 10
    sprite.height = 40

    var physicsBody = physics.createDynamicBody({
      width: sprite.width,
      height: sprite.height,
      x: sprite.position.x,
      y: sprite.position.y
    })

    var update = function(delta) {
      sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
      sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
      sprite.rotation = physicsBody.GetAngle()
    }

    return {
      moveBy: function(xDelta, yDelta) {
        force = new Box2D.Common.Math.b2Vec2(xDelta * -1, yDelta * -1);
        physicsBody.SetAwake(true);
        physicsBody.SetLinearVelocity(force);
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

  var Wall = function(stage, physics, x, y, width, height) {
    var physicsBody = physics.createStaticBody({
      width: width,
      height: height,
      x: x,
      y: y
    })

    var texture = PIXI.Texture.fromImage('/game/wall.png')
    var sprite = new PIXI.TilingSprite(texture)
    sprite.height = height
    sprite.width = width
    sprite.position.x = x
    sprite.position.y = y

    stage.addChild(sprite)
  }

  var Game = function(stage) {
    var time = new Time()

    var physics = new Physics()

    var topWall = new Wall(stage, physics, 0, 0, 600, 16)
    var bottomWall = new Wall(stage, physics, 0, 384, 600, 16)
    var leftWall = new Wall(stage, physics, 0, 0, 16, 400)
    var rightWall = new Wall(stage, physics, 584, 0, 16, 400)

    physics.debugDraw()

    var ball = new Ball(stage)
    var players = []

    return {
      tick: function() {
        time.update()
        physics.update()

        ball.tick(time.delta)

        players.forEach(function(player) {
          player.tick(time.delta)
        })
      },
      playerJoin: function(data) {
        var player = new Player(stage, physics)
        player.id = data.id
        player.name = data.name
        players.push(player)

        console.log('Player ' + player.name + ' joined')
      },
      playerLeave: function(data) {
        for (var i = 0; i < players.length; i++) {
          var player = players[i]
          if (player && player.id === data.id) {
            delete players[i]
            console.log('Player ' + player.name + ' left')
          }
        }
      },
      playerMove: function(data) {
        var player = _.findWhere(players, { id: data.id })
        if (player) {
          player.moveBy(data.xDelta, data.yDelta)
        }
      },
      players: function() {
        return players
      }
    }
  }

  $(function() {
    var board = $('#board')
    var stage = new PIXI.Stage()
    var renderer = PIXI.autoDetectRenderer(600, 400)

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
})()