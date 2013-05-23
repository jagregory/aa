var PF          = require('../engines/physics-factory');
var GF          = require('../engines/graphics-factory');
var Entity = require('../entity');
var world       = require('../world');

var paddleWidth  = 1;
var paddleHeight = 4;

var fixture = PF.fixture({
  shape:      PF.shape.box(paddleWidth, paddleHeight),
  dynamics:   {density: 1000, friction: 0, restitution: 1},
  category:   PF.categories.PLAYER,
  collision:  PF.categories.ARENA | PF.categories.BALL
});

function Player(id, x, y, game) {

  this.id       = id;
  
  this.bodySpec = {
    body: PF.dynamic({ x: x, y: y, fixedRotation: true }),
    fixture: fixture
  };
  
  this.sprite = GF.sprite('/game/images/paddle.png', paddleWidth, paddleHeight);  
  this.game = game;
  
}

Player.prototype = new Entity();

Player.prototype.update = function(delta) {
  Entity.prototype.update.call(this, delta);
  this.sprite.anchor.x = this.sprite.width  / 2;
  this.sprite.anchor.y = this.sprite.height / 2;
};

Player.prototype.collision = function(other, points) {    
  // soon we shouldn't have access to the game engine
  // these should jsut be broadcasted to the event hub
  if (other.id === 'ball') {
    this.game.broadcast('sound:play', '/game/sounds/collision-2.mp3');
    this.game.broadcast('particles:explosion', {
      source: points[0],
      intensity: 30
    });
  }
};


module.exports = Player;
