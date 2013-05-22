var GF          = require('../engines/graphics-factory');
var categories  = require('../physics/categories');
var world       = require('../world');

var PADDLE_WIDTH  = 1;
var PADDLE_HEIGHT = 4;

function Player(game, physics, options) {
  
  options = $.extend({
    x: 5,
    y: 5,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
  }, options);

  this.id = options.id;
  this.userId = options.userId;
  this.name = options.name;

  this.body = physics.createDynamicBody({
    filterCategoryBits: categories.PLAYER,
    filterMaskBits: categories.ARENA | categories.BALL,
    density: 1000,
    fixedRotation: true,
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y,
    userData: {
      entityId: this.id
    }
  });
  
  // Anchor is always reset! But not if the sprite is a PIXI.TilingSprite :/
  this.sprite = GF.sprite('/game/images/paddle.png', PADDLE_WIDTH, PADDLE_HEIGHT);
  
  this.update = function(delta) {
    //this.sprite.anchor.x = this.sprite.width  / 2;
    //this.sprite.anchor.y = this.sprite.height / 2;
  };

  this.collision = function(other, points) {    
    // soon we shouldn't have access to the game engine
    // these should jsut be broadcasted to the event hub
    if (other.id === 'ball') {
      game.broadcast('sound:play', '/game/sounds/collision-2.mp3');
      game.broadcast('particles:explosion', {
        source: points[0],
        intensity: 30
      });
    }
  };
  
}

module.exports = Player;
