var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');
var assets      = require('../../assets');
var gameWorld   = require('../world');

function Background(image) {
  this.id = 'background';
  this.sprite = GF.animation(assets.images('stadium', 'stadium-shake-right', 'stadium-shake-left'), gameWorld.width, gameWorld.height);
}

Background.prototype = new Entity();

Background.prototype.shake = function(againstPlayerIndex) {
  this.sprite.gotoAndStop(againstPlayerIndex === 0 ? 2 : 1);
  setTimeout(function() {
    this.sprite.gotoAndStop(againstPlayerIndex === 0 ? 1 : 2);
  }.bind(this), 50);
  setTimeout(function() {
    this.sprite.gotoAndStop(0);
  }.bind(this), 100);
};

module.exports = Background;
