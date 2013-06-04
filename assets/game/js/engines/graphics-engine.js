var userInterface   = require('../user-interface');

var ORIGINAL_WIDTH  = 960;
var ORIGINAL_HEIGHT = 600;

function GraphicsEngine(gameView, debugView) {
  this.renderer     = PIXI.autoDetectRenderer(ORIGINAL_WIDTH, ORIGINAL_HEIGHT, gameView);
  this.stage        = new PIXI.Stage();
  this.view         = this.renderer.view;
  this.debugView    = debugView;
}

GraphicsEngine.prototype.resize = function(width, height) {
  var ratio = height / ORIGINAL_HEIGHT;
  if (this.debugView) {
    this.debugView.style.width  = Math.floor(ORIGINAL_WIDTH * ratio) + 'px';
    this.debugView.style.height = height + 'px';
  }
  this.renderer.view.style.width  = width + 'px';
  this.renderer.view.style.height = height + 'px';
  this.renderer.resize(width / ratio, ORIGINAL_HEIGHT);
  userInterface.resize(width / ratio, ORIGINAL_HEIGHT);
};

GraphicsEngine.prototype.render = function() {
  this.renderer.render(this.stage);
};

GraphicsEngine.prototype.add = function(sprite) {
  this.stage.addChild(sprite);
};

GraphicsEngine.prototype.remove = function(sprite) {
  this.stage.removeChild(sprite);
};

module.exports = GraphicsEngine;
