var world = require('./world');

var frameRate   = 1 / 60;
var iterations  = 10;

var normaliseNan = function(n) {
  return n || 0
}

var normalisePoint = function(p) {
  return { x: normaliseNan(p.x), y: normaliseNan(p.y) }
}

function PhysicsEngine(debugCanvas) {
  
  this.collisionCallback = null;
  this.b2world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 0), true);
  
  var contactListener = new Box2D.Dynamics.b2ContactListener;
  
  contactListener.BeginContact = function(contact) {
    var worldManifold = new Box2D.Collision.b2WorldManifold();
    contact.GetWorldManifold(worldManifold);
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    if (this.collisionCallback) {
      this.collisionCallback(fixtureA, fixtureB, worldManifold.m_points.map(normalisePoint));
    }
  }.bind(this);
  
  this.b2world.SetContactListener(contactListener);
  
  if (debugCanvas) {
    this.debugDraw(debugCanvas);
  }
}

PhysicsEngine.prototype.create = function(bodyDef, fixtureDef) {
  var body = this.b2world.CreateBody(bodyDef);
  if (fixtureDef) {
    body.CreateFixture(fixtureDef);    
  }
  return body;
};

PhysicsEngine.prototype.destroy = function(body) {
  body.GetFixtureList().SetUserData(null);
  this.b2world.DestroyBody(body);
};

PhysicsEngine.prototype.collision = function(callback) {
  this.collisionCallback = callback;
}

PhysicsEngine.prototype.debugDraw = function(canvas) {
  var debugDraw = new Box2D.Dynamics.b2DebugDraw();
  debugDraw.SetSprite(canvas.getContext("2d"));
  debugDraw.SetDrawScale(world.getPixelsPerMeter());
  debugDraw.SetFillAlpha(0.3);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
  this.b2world.SetDebugDraw(debugDraw);
}

PhysicsEngine.prototype.update = function() {
  this.b2world.Step(frameRate, iterations, iterations);
  this.b2world.DrawDebugData();
  this.b2world.ClearForces();
};

module.exports = PhysicsEngine;
