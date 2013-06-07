var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../../engine/world');

function Spinner(id, x, y, width, height) {
  this.id = id;
  this.bodySpec = {
    body: PF.dynamic({
      x: x,
      y: y
    }),
    fixture: PF.fixture({
      shape:      PF.shape.box(width, height),
      dynamics:   {density: 1, friction: 0, restitution: 1},
      category:   PF.categories.ARENA,
      collision:  PF.categories.ALL
    })
  };
  this.sprite = GF.tile('/game/images/wall.png', width, height, 0);
  this.sprite.position.x = world.toPixels(x);
  this.sprite.position.y = world.toPixels(y);
}

Spinner.prototype = new Entity();

Spinner.prototype.create = function(engine, game) {
  Entity.prototype.create.call(this, engine, game);
//  this.body.SetAngularVelocity(new Box2D.Common.Math.b2Vec2(1, 1));    

  var thisPos = this.body.GetWorldCenter();
  var pivotDef = PF.static({x: thisPos.x, y: thisPos.y});
  var pivot = engine.physics.create(pivotDef, null);

  var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
  jointDef.Initialize(pivot, this.body, this.body.GetPosition());
  jointDef.motorSpeed     = 1;
  jointDef.maxMotorTorque = 10000000;
  jointDef.enableMotor    = true;
  jointDef.enableLimit    = false;

  var joint = engine.physics.b2world.CreateJoint(jointDef);

};

module.exports = Spinner;
