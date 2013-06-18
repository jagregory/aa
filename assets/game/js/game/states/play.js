var TimeBasedMessage  = require('../time-based-message');
var mathUtils         = require('../../engine/math-utils');

function Play(engine, game) {
  
  var multiBall       = new TimeBasedMessage(15000, 'game.multiball');
  var endOfMatch      = new TimeBasedMessage(0, 'game.end');
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining = Math.max(game.timeRemaining - delta, 0);
    multiBall.update(game.timeRemaining);
    endOfMatch.update(game.timeRemaining);
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = Play;
