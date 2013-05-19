var Chromath = require('chromath')

var BackgroundFlash = function(fromColor, toColor, step, completeCallback) {
  var currentColor = new Chromath(fromColor)
  var complete = false

  this.color = currentColor.valueOf()

  this.update = function(delta) {
    if (!complete) {
      currentColor = currentColor.darken(step * delta)
      this.color = currentColor.valueOf()

      if (this.color == toColor) {
        complete = true
        completeCallback()
      }
    }
  }
}

module.exports = function(game) {
  var backgroundColor = 0x000000
  var currentFlash = null

  var currentBackgroundColor = function() {
    return currentFlash ? currentFlash.color : backgroundColor
  }

  this.flash = function(color) {
    currentFlash = new BackgroundFlash(color, backgroundColor, 0.05, function() {
      currentFlash = null
    })
  }

  this.update = function(delta) {
    if (currentFlash) {
      currentFlash.update(delta)
    }

    game.stage.setBackgroundColor(currentBackgroundColor())
  }
}