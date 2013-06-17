var _           = require('../../../../3rdparty/underscore-min');
var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');
var assets      = require('../../assets');

var PI = 3.14159;

function Cone(id, x, y) {
  this.id = id;
  this.x  = x;
  this.y  = y;
  this.sprite = GF.sprite(assets.image('cone'), 2.5, 4);
  this.sprite.position.x = world.toPixels(x);
  this.sprite.position.y = world.toPixels(y);
}

Cone.prototype = new Entity();

Cone.prototype.create = function(engine, game) {
  engine.graphics.add(this.sprite);
  this.createCompoundBody(engine, this.x, this.y);
};

Cone.prototype.destroy = function(engine, game) {
  engine.graphics.add(this.sprite);
  engine.physics.destroy(this.body1);
  engine.physics.destroy(this.body2);
};

Cone.prototype.update = function(engine, game, delta) {
  Entity.prototype.update.call(this, delta);
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 3;
};

Cone.prototype.createCompoundBody = function(engine, x, y) {
  var fixtureOps = {
    dynamics:   {density: 1, friction: 0, restitution: 1},
    category:   PF.categories.ARENA,
    collision:  PF.categories.ALL
  };
  
  var part1body    = PF.static({x: x, y: y + 0.4, angle: PI / 4.5});
  var part2body    = PF.static({x: x, y: y - 0.1});
  var part1fixture = PF.fixture(_.extend(fixtureOps, {shape: PF.shape.circle(0.7)}));
  var part2fixture = PF.fixture(_.extend(fixtureOps, {shape: PF.shape.box(0.7, 1.9)}));
  
  part1fixture.userData = this;
  part2fixture.userData = this;
  
  this.body1 = engine.physics.create(part1body, part1fixture);
  this.body2 = engine.physics.create(part2body, part2fixture);
};

module.exports = Cone;
