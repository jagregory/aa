var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');

function Wall(id, x, y, width, height, rotation) {
  this.id = id;
  this.bodySpec = {
    body: PF.static({
      x: x,
      y: y,
      angle: rotation
    }),
    fixture: PF.fixture({
      shape:      PF.shape.box(width, height),
      dynamics:   {density: 1, friction: 0.1, restitution: 1},
      category:   PF.categories.ARENA,
      collision:  PF.categories.ALL
    })
  };
  this.sprite = GF.tile('/game/images/wall.png', width, height, rotation);
  this.sprite.position.x = world.toPixels(x);
  this.sprite.position.y = world.toPixels(y);
}

Wall.prototype = new Entity();

module.exports = Wall;
