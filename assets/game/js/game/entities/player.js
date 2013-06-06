var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../world');
var hub         = require('../../engine/hub');

var fixture = PF.fixture({
  shape:      PF.shape.circle(2),
  dynamics:   {density: 1, friction: 0.5, restitution: 1},
  category:   PF.categories.PLAYER,
  collision:  PF.categories.ARENA | PF.categories.BALL
});

function Player(id, x, y) {
  this.id = id;
  this.bodySpec = {
    body: PF.dynamic({ x: x, y: y, fixedRotation: true }),
    fixture: fixture
  };
  this.constraintSpec = {
    body: PF.static({x: x, y: 0}),
    fixture: PF.fixture({
      shape: PF.shape.box(1, 1),
      dynamics: {density: 0, friction: 0, restitution: 0},
    })
  };
  if (this.id === 'p1') {
    this.sprite = GF.animation(['/game/images/cat.png', '/game/images/cat-up.png', '/game/images/cat-down.png'], 5, 5);
  } else {
    this.sprite = GF.animation(['/game/images/dog.png', '/game/images/dog-up.png', '/game/images/dog-down.png'], 5, 5);
  }
}

Player.prototype = new Entity();

Player.prototype.create = function(physicsEngine, graphicsEngine) {
  Entity.prototype.create.call(this, physicsEngine, graphicsEngine);
  this.constraintBody = physicsEngine.create(this.constraintSpec.body, this.constraintSpec.fixture);
  var verticalAxis = new Box2D.Common.Math.b2Vec2(0,1);
  var joint  = new Box2D.Dynamics.Joints.b2LineJointDef();
  joint.Initialize(this.constraintBody, this.body, this.body.GetPosition(), verticalAxis);
  physicsEngine.b2world.CreateJoint(joint);  
}

Player.prototype.update = function(delta) {
  Entity.prototype.update.call(this, delta);
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 2;
};

Player.prototype.collision = function(other, points) {    
  if (other.id === 'ball') {
    hub.send('sound:play', '/game/sounds/collision-2.mp3');
  } else if (other.id.match(/wall/)) {
    this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 10));
  }
};

Player.prototype.move = function(dir) {
  var y = (dir === 'up') ? -30 : 30;
  this.body.SetAwake(true);
  this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, y));
  if (y < 0) {
    this.sprite.gotoAndStop(1);
  } else {
    this.sprite.gotoAndStop(2);
  }
};

Player.prototype.stop = function() {
  this.body.SetAwake(false);
  this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
  this.sprite.gotoAndStop(0);
};


module.exports = Player;
