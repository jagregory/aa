var userInterface   = require('./user-interface');
var world2          = require('./world');

function GraphicsEngine(world, gameView, debugView) {
  this.renderer     = PIXI.autoDetectRenderer(gameView.width, gameView.height, gameView);
  this.stage        = new PIXI.Stage();
  this.view         = this.renderer.view;
  this.debugView    = debugView;
  
  var worldRatio  = world.width / world.height;
  var screenRatio = gameView.width / gameView.height;
  
  var width, height;
  if (screenRatio > worldRatio) {
    width  = Math.floor(gameView.height * worldRatio);
    height = gameView.height;
  } else {
    width  = gameView.width;
    height = Math.floor(gameView.width / worldRatio);
  }
  
  gameView.width  = debugView.width  = width;
  gameView.height = debugView.height = height
  userInterface.resize(gameView.width, gameView.height);
  this.renderer.resize(gameView.width, gameView.height);
  
  world2.setPixelsPerMeter(Math.floor(gameView.height / world.height));
}

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
