var Flash = function(fromColor, toColor, duration) {
  this.color = fromColor
  
  this.update = function(delta) {

  }
}

module.exports = function(game) {
  var backgroundColor = 0x000000
  var currentFlash = null

  this.flash = function(color, duration) {
    currentFlash = new Flash(color, backgroundColor, duration)
  }

  this.update = function(delta) {
    if (currentFlash) {
      currentFlash.update(delta)
      game.stage.setBackgroundColor(currentFlash.color)
    } else {
      game.stage.setBackgroundColor(backgroundColor)
    }
  }
}