var staticbody = require('../physics/staticbody');
var dynamicbody = require('../physics/dynamicbody');

// size of a block in pixels (see image assets)
var WorldPerMetre = 16.0;

var Physics = function() {
  this.collisionCallback = null
  this.world = new Box2D.Dynamics.b2World(
    new Box2D.Common.Math.b2Vec2(0, 0),
    true
  )
  var contactListener = new Box2D.Dynamics.b2ContactListener
  contactListener.BeginContact = function(contact) {
    var worldManifold = new Box2D.Collision.b2WorldManifold()
    contact.GetWorldManifold(worldManifold)

    var fixtureA = contact.GetFixtureA()
    var fixtureB = contact.GetFixtureB()

    if (this.collisionCallback) {
      this.collisionCallback(fixtureA, fixtureB, worldManifold.m_points)
    }
  }.bind(this)
  this.world.SetContactListener(contactListener)
}

Physics.prototype.collision = function(callback) {
  this.collisionCallback = callback;
}

Physics.prototype.physics2world = function(val) {
  return val * WorldPerMetre;
}

Physics.prototype.world2physics = function(val) {
  return val / WorldPerMetre;
}

Physics.prototype.createStaticBody = function(options) {
  return staticbody.createPolygon(this.world, options);
}

Physics.prototype.createCircle = function(options) {
  return dynamicbody.createCircle(this.world, options);
}

Physics.prototype.createDynamicBody = function(options) {
  return dynamicbody.createPolygon(this.world, options);
}

Physics.prototype.debugDraw = function(canvas) {
  var debugDraw = new Box2D.Dynamics.b2DebugDraw();
  debugDraw.SetSprite(canvas.getContext("2d"));
  debugDraw.SetDrawScale(WorldPerMetre);
  debugDraw.SetFillAlpha(0.3);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
  this.world.SetDebugDraw(debugDraw);
}

Physics.prototype.update = function() {
  this.world.Step(
    1 / 60, // frame-rate
    10,     // velocity iterations
    10      // position iterations
  );
  this.world.DrawDebugData();
  this.world.ClearForces();
}

module.exports = Physics;
