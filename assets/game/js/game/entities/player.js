var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../world');
var hub         = require('../../engine/hub');

var paddleWidth  = 4;
var paddleHeight = 4;

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
  this.sprite = GF.sprite(this.id === 'p1' ? '/game/images/cat.png' : '/game/images/koala.png', 7, 7);
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
};

Player.prototype.stop = function() {
  this.body.SetAwake(false);
  this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
};


module.exports = Player;
