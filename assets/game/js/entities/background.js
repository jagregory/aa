var GF          = require('../engines/graphics-factory');
var Entity      = require('../entity');
var world       = require('../world');
var gameWorld   = require('../game-world');

function Background(image) {
  this.id = 'background';
  this.sprite = GF.tile(image, world.toPixels(gameWorld.width), world.toPixels(gameWorld.height), 0);
}

Background.prototype = new Entity();

module.exports = Background;



///
/// Old background flash code
/// Maybe we want to keep some of it
///

/*

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

*/