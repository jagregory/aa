;(function(global) {
  global.Player = function(stage, physics, options) {
    options = $.extend({
      x: 50,
      y: 50,
      width: 10,
      height: 40
    }, options)

    var texture = PIXI.Texture.fromImage('/game/paddle.png')
    var sprite = new PIXI.Sprite(texture)
    stage.addChild(sprite)

    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()

    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.width = options.width
    sprite.height = options.height
    sprite.position.x = options.x
    sprite.position.y = options.y

    var physicsBody = physics.createDynamicBody({
      width: options.width,
      height: options.height,
      x: options.x,
      y: options.y
    })

    var update = function(delta) {
      sprite.position.x = physics.physics2world(physicsBody.GetPosition().x)
      sprite.position.y = physics.physics2world(physicsBody.GetPosition().y)
      sprite.rotation = physicsBody.GetAngle()
    }

    return {
      id: options.id,
      name: options.name,
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
})(window)