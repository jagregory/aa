var WorldPerMetre = 16.0
var WorldScale = 2.0

var Physics = function() {
  this.collisionCallback = null
  this.world = new Box2D.Dynamics.b2World(
    new Box2D.Common.Math.b2Vec2(0, 0),
    true
  )
  var contactListener = new Box2D.Dynamics.b2ContactListener
  contactListener.BeginContact = function(contact, manifold) {
    var fixtureA = contact.GetFixtureA()
    var fixtureB = contact.GetFixtureB()

    if (this.collisionCallback) {
      this.collisionCallback(fixtureA, fixtureB)
    }
  }.bind(this)
  this.world.SetContactListener(contactListener)
}

Physics.prototype.collision = function(callback) {
  this.collisionCallback = callback
}

Physics.prototype.physics2world = function(val) {
  return val * WorldPerMetre
}

Physics.prototype.world2physics = function(val) {
  return val / WorldPerMetre
}

Physics.prototype.createStaticBody = function(options) {
  options = $.extend({
    density: 1.0,
    friction: 0.5,
    restitution: 0.2
  }, options)

  ;['width', 'height', 'x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for static body'
    }
  })

  var fixDef = new Box2D.Dynamics.b2FixtureDef
  fixDef.density = options.density
  fixDef.friction = options.friction
  fixDef.restitution = options.restitution
  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
  fixDef.shape.SetAsBox(options.width / WorldScale, options.height / WorldScale)
  
  var bodyDef = new Box2D.Dynamics.b2BodyDef
  bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody
  bodyDef.position.x = options.x
  bodyDef.position.y = options.y
  bodyDef.angle = options.rotation

  var physicsBody = this.world.CreateBody(bodyDef)
  physicsBody.CreateFixture(fixDef)
  return physicsBody
}

Physics.prototype.createDynamicBody = function(options) {
  options = $.extend({
    density: 1.0,
    friction: 0.5,
    restitution: 0.2
  }, options)

  ;['width', 'height', 'x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for static body'
    }
  })

  var fixDef = new Box2D.Dynamics.b2FixtureDef
  fixDef.density = options.density
  fixDef.friction = options.friction
  fixDef.restitution = options.restitution
  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
  fixDef.shape.SetAsBox(options.width / WorldScale, options.height / WorldScale)

  var bodyDef = new Box2D.Dynamics.b2BodyDef
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
  bodyDef.position.x = options.x
  bodyDef.position.y = options.y
  
  var physicsBody = this.world.CreateBody(bodyDef)
  physicsBody.CreateFixture(fixDef)
  return physicsBody
}

Physics.prototype.debugDraw = function(canvas) {
  var debugDraw = new Box2D.Dynamics.b2DebugDraw()
  debugDraw.SetSprite(canvas.getContext("2d"))
  debugDraw.SetDrawScale(WorldPerMetre)
  debugDraw.SetFillAlpha(0.3)
  debugDraw.SetLineThickness(1.0)
  debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit)
  this.world.SetDebugDraw(debugDraw)
}

Physics.prototype.update = function() {
  this.world.Step(
    1 / 60, // frame-rate
    10,     // velocity iterations
    10      // position iterations
  )
  this.world.DrawDebugData()
  this.world.ClearForces()
}

module.exports = Physics