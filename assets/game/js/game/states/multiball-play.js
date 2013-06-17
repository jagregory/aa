var TimeBasedMessage  = require('../time-based-message');
var mathUtils         = require('../../engine/math-utils');
var hub               = require('../../engine/hub');
var Ball              = require('../entities/ball');
var world             = require('../world');

function MultiBallPlay(engine, game) {
  
  this.enter = function() {
  };
  
  this.exit = function() {
  };
  
  this.update = function(delta) {
    game.timeRemaining = Math.max(game.timeRemaining - delta, 0);
    if (game.timeRemaining === 0) {
      hub.send('game.end');
    }
  };
  
}

module.exports = MultiBallPlay;
