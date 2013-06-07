var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');

function Cone(id, x, y) {
  this.id = id;
  this.bodySpec = {
    body: PF.static({
      x: x,
      y: y
    }),
    fixture: PF.fixture({
      shape:      PF.shape.box(2, 2.5),
      dynamics:   {density: 1, friction: 0, restitution: 1},
      category:   PF.categories.ARENA,
      collision:  PF.categories.ALL
    })
  };
  this.sprite = GF.sprite('/game/images/cone.png', 2, 3.3);
  this.sprite.position.x = world.toPixels(x);
  this.sprite.position.y = world.toPixels(y);
}

Cone.prototype = new Entity();

Cone.prototype.update = function(engine, game, delta) {
  Entity.prototype.update.call(this, delta);
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 3;
};

module.exports = Cone;
