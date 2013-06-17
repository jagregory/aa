var PF          = require('../../engine/physics-factory');
var GF          = require('../../engine/graphics-factory');
var Entity      = require('../../engine/entity');
var world       = require('../world');
var hub         = require('../../engine/hub');
var assets      = require('../../assets');

var fixture = PF.fixture({
  shape:      PF.shape.circle(1.7),
  dynamics:   {density: 1, friction: 0.5, restitution: 1},
  category:   PF.categories.PLAYER,
  collision:  PF.categories.ARENA | PF.categories.BALL
});

var ANIM_REST = 0;
var ANIM_UP   = 1;
var ANIM_DOWN = 2;

function Player(id, index, name, x, y) {
  
  this.id    = id;
  this.index = index;
  this.name  = name;
  
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
    this.sprite = GF.animation(assets.images('cat', 'cat-up', 'cat-down'), 6, 6);
  } else {
    this.sprite = GF.animation(assets.images('dog', 'dog-up', 'dog-down'), 6, 6);
  }
  
}

Player.prototype = new Entity();

Player.prototype.create = function(engine, game) {
  Entity.prototype.create.call(this, engine, game);
  this.body.SetLinearDamping(2);
  this.constraintBody = engine.physics.create(this.constraintSpec.body, this.constraintSpec.fixture);
  var verticalAxis = new Box2D.Common.Math.b2Vec2(0,1);
  var joint  = new Box2D.Dynamics.Joints.b2LineJointDef();
  joint.Initialize(this.constraintBody, this.body, this.body.GetPosition(), verticalAxis);
  engine.physics.b2world.CreateJoint(joint);  
}

Player.prototype.destroy = function(engine, game) {
  Entity.prototype.destroy.call(this, engine, game);
  engine.physics.destroy(this.constraintBody);
};

Player.prototype.update = function(engine, game, delta) {
  Entity.prototype.update.call(this, engine, game, delta);
  // We should be able to specify "0.5", and not have to update it constantly
  // Need to check our changes to PIXI
  this.sprite.anchor.x = this.sprite.texture.width  / 2;
  this.sprite.anchor.y = this.sprite.texture.height / 2;
};

Player.prototype.collision = function(other, points) {    
  if (other.id.match(/ball/)) {
    other.kickedBy = this.index;
    hub.send('engine.sound.play', {file: '/game/sounds/bounce.mp3'});
  } else if (other.id.match(/wall/)) {
    this.sprite.gotoAndStop(ANIM_REST);
    this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 5));
  }
};

Player.prototype.move = function(dir) {
  window.clearTimeout(this.endFlame);
  var y = (dir === 'up') ? -32: 32;
  this.body.SetAwake(true);
  this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, y));
  if (y < 0) {
    this.sprite.gotoAndStop(ANIM_UP);
  } else {
    this.sprite.gotoAndStop(ANIM_DOWN);
  }
  this.endFlame = setTimeout(function() {
    this.sprite.gotoAndStop(0);
  }.bind(this), 200);
};

module.exports = Player;
