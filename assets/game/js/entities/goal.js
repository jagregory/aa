var PF          = require('../engines/physics-factory');
var GF          = require('../engines/graphics-factory');
var Entity      = require('../entity');
var world       = require('../world');
var hub         = require('../hub');

function Goal(id, playerIndex, x, y, width, height, rotation) {
  this.id = id;
  this.playerIndex = playerIndex;
  this.bodySpec = {
    body: PF.static({
      x: x,
      y: y,
      angle: rotation
    }),
    fixture: PF.fixture({
      shape:      PF.shape.box(width, height),
      dynamics:   {density: 1, friction: 0, restitution: 1},
      category:   PF.categories.ARENA,
      collision:  PF.categories.ALL
    })
  };
  this.sprite = GF.sprite('/game/images/goal.png', width, height, rotation);
}

Goal.prototype = new Entity();

Goal.prototype.collision = function(other, points) {    
  if (other.id === 'ball') {
    hub.send('sound:play', '/game/sounds/explosion.mp3');
    hub.send('particles:explosion', {
      source: points[0],
      size: 'large'
    });
    hub.send('score', {against: this.playerIndex});
  }
};

Goal.prototype.update = function(delta) {
  Entity.prototype.update.call(this, delta);
  this.sprite.anchor.x = 128;
  this.sprite.anchor.y = 256;
};

module.exports = Goal;
