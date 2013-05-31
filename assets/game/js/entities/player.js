var PF          = require('../engines/physics-factory');
var GF          = require('../engines/graphics-factory');
var Entity      = require('../entity');
var world       = require('../world');
var hub         = require('../hub');

var paddleWidth  = 1;
var paddleHeight = 4;

var fixture = PF.fixture({
  shape:      PF.shape.box(paddleWidth, paddleHeight),
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
    body: PF.static({x: x, y: world.top}),
    fixture: PF.fixture({
      shape: PF.shape.box(1, 1),
      dynamics: {density: 0, friction: 0, restitution: 0},
    })
  };
  this.sprite = GF.sprite('/game/images/paddle.png', paddleWidth, paddleHeight);
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
  this.sprite.anchor.x = this.sprite.width  / 2;
  this.sprite.anchor.y = this.sprite.height / 2;
};

Player.prototype.collision = function(other, points) {    
  if (other.id === 'ball') {
    hub.send('sound:play', '/game/sounds/collision-2.mp3');
    // hub.send('particles:explosion', {
    //   source: points[0],
    //   intensity: 30
    // });
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
