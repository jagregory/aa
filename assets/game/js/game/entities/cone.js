var _           = require('../../../../3rdparty/underscore-min');
var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');
var assets      = require('../../assets');

var PI = 3.14159;

var fixtureOpts = {
  dynamics:   {density: 1.5, friction: 1, restitution: 1},
  category:   PF.categories.ARENA,
  collision:  PF.categories.ALL
};

function Cone(id, x, y) {
  this.id = id;
  this.sprite = GF.sprite(assets.image('cone'), 2.5, 4);
  this.bodySpec = {
    body: PF.dynamic({ x: x, y: y, fixedRotation: true }),
    fixture: PF.fixture(_.extend(fixtureOpts, {
      shape: PF.shape.circle(0.7, new Box2D.Common.Math.b2Vec2(0,0.6))
    }))
  };
}

Cone.prototype = new Entity();

Cone.prototype.create = function(engine, game) {
  Entity.prototype.create.call(this, engine, game);
  var otherFixture = PF.fixture(_.extend(fixtureOpts, {
    shape: PF.shape.box(0.7, 1.9, new Box2D.Common.Math.b2Vec2(0,-0.1))
  }));
  otherFixture.userData = this;
  this.body.CreateFixture(otherFixture);
  this.body.SetLinearDamping(6);
};

Cone.prototype.update = function(engine, game, delta) {
  Entity.prototype.update.call(this, delta);
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 3;
};

module.exports = Cone;
