var TimeBasedMessage  = require('../time-based-message');
var mathUtils         = require('../../engine/math-utils');

function Play(engine, game) {
  
  var finalCountdown  = new TimeBasedMessage(8000, 'game.finishing');
  var multiBall       = new TimeBasedMessage(55000, 'game.multiball');
  var endOfMatch      = new TimeBasedMessage(0,    'game.end');
  // TimeBasedMessage  half-time!
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining = Math.max(game.timeRemaining - delta, 0);
    finalCountdown.update(game.timeRemaining);
    multiBall.update(game.timeRemaining);
    endOfMatch.update(game.timeRemaining);
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = Play;
