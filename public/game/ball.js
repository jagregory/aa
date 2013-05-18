;(function(global) {
  global.Ball = function(stage) {
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
})(window)