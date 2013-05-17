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

  var box2world = function(val) {
    return val * 50.0
  }

  var world2box = function(val) {
    return val / 29.5
  }

  var Player = function(stage, physicsWorld) {
    var texture = PIXI.Texture.fromImage('/game/paddle.png')
    var sprite = new PIXI.Sprite(texture)
    stage.addChild(sprite)
    var speed = 0.1

    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()

    sprite.position.x = 30
    sprite.position.y = (boardHeight / 2) - (sprite.height / 2)

    var fixDef = new Box2D.Dynamics.b2FixtureDef
    fixDef.density = 1.0
    fixDef.friction = 0.5
    fixDef.restitution = 0.2

    var bodyDef = new Box2D.Dynamics.b2BodyDef
    
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody
    bodyDef.position.x = world2box(sprite.position.x)
    bodyDef.position.y = world2box(sprite.position.y)
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
    fixDef.shape.SetAsBox(world2box(sprite.width), world2box(sprite.height))
    physicsWorld
      .CreateBody(bodyDef)
      .CreateFixture(fixDef)

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

  var Wall = function(stage, physicsWorld, x, y, width, height) {
    var fixDef = new Box2D.Dynamics.b2FixtureDef
    fixDef.density = 1.0
    fixDef.friction = 0.5
    fixDef.restitution = 0.2

    var bodyDef = new Box2D.Dynamics.b2BodyDef
    
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody
    bodyDef.position.x = world2box(x)
    bodyDef.position.y = world2box(y)
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
    fixDef.shape.SetAsBox(world2box(width), world2box(height))
    physicsWorld
      .CreateBody(bodyDef)
      .CreateFixture(fixDef)

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
    var socket = io.connect('http://localhost:8080')

    var physicsWorld = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 10),
      true
    )

    var topWall = new Wall(stage, physicsWorld, 0, 0, 600, 16)
    var bottomWall = new Wall(stage, physicsWorld, 0, 384, 600, 16)
    var leftWall = new Wall(stage, physicsWorld, 0, 0, 16, 400)
    var rightWall = new Wall(stage, physicsWorld, 584, 0, 16, 400)

    // var fixDef = new Box2D.Dynamics.b2FixtureDef
    // fixDef.density = 1.0
    // fixDef.friction = 0.5
    // fixDef.restitution = 0.2

    // var bodyDef = new Box2D.Dynamics.b2BodyDef
    // bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    //      for(var i = 0; i < 30; ++i) {
    //         if(Math.random() > 0.5) {
    //            fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
    //            fixDef.shape.SetAsBox(
    //                  Math.random() + 0.1 //half width
    //               ,  Math.random() + 0.1 //half height
    //            );
    //         } else {
    //            fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(
    //               Math.random() + 0.1 //radius
    //            );
    //         }
    //         bodyDef.position.x = Math.random() * 10;
    //         bodyDef.position.y = Math.random() * 10;
    //         physicsWorld.CreateBody(bodyDef).CreateFixture(fixDef);
    //      }


    var debugDraw = new Box2D.Dynamics.b2DebugDraw()
    debugDraw.SetSprite($('#board canvas')[0].getContext("2d"))
    debugDraw.SetDrawScale(30.0)
    debugDraw.SetFillAlpha(0.3)
    debugDraw.SetLineThickness(1.0)
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit)
    physicsWorld.SetDebugDraw(debugDraw)

    var ball = new Ball(stage)
    var players = []

    var tick = function() {
      time.update()
      physicsWorld.Step(
        1 / 60, // frame-rate
        10,     // velocity iterations
        10      // position iterations
      )
      physicsWorld.DrawDebugData()
      physicsWorld.ClearForces()

      ball.tick(time.delta)

      players.forEach(function(player) {
        player.tick(time.delta)
      })
    }

    var playerJoin = function(data) {
      var player = new Player(stage, physicsWorld)
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
    var renderer = new PIXI.CanvasRenderer(600, 400)

    board[0].appendChild(renderer.view)

    var assetLoader = new PIXI.AssetLoader(['/game/paddle.png', '/game/ball.png'])
    assetLoader.onComplete = function() {
      console.log('Assets loaded. Starting game.')
      var instance = window.game = new Game(stage)

      requestAnimFrame(function animate(delta) {
        instance.tick(delta)

        // renderer.render(stage)

        requestAnimFrame(animate)
      })
    }

    console.log('Loading assets')
    assetLoader.load()
  })
})()