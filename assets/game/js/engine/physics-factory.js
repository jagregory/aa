var _ = require('../../../3rdparty/underscore-min');

exports.static = function(options) {
  return bodyDef(Box2D.Dynamics.b2Body.b2_staticBody, options);
};

exports.dynamic = function(options) {
  return bodyDef(Box2D.Dynamics.b2Body.b2_dynamicBody, options);
};

exports.fixture = function(options) {
  var fixDef = new Box2D.Dynamics.b2FixtureDef;
  fixDef.density = options.dynamics.density;
  fixDef.friction = options.dynamics.friction;
  fixDef.restitution = options.dynamics.restitution;
  fixDef.shape = options.shape;
  if (options.category)  { fixDef.filter.categoryBits = options.category; }
  if (options.collision) { fixDef.filter.maskBits = options.collision;    }
  return fixDef;
};

exports.shape = {
  circle: function(radius, pos) {
    var cs = new Box2D.Collision.Shapes.b2CircleShape;
    cs.SetRadius(radius);
    if (pos) {
      cs.SetLocalPosition(pos);
    }
    return cs;
  },
  box: function(width, height, pos, angle) {
    var ps = new Box2D.Collision.Shapes.b2PolygonShape;
    var pos = pos || new Box2D.Common.Math.b2Vec2(0,0);
    var angle = angle || 0;
    ps.SetAsOrientedBox(width / 2, height / 2, pos, angle);   // half-width, half-height
    return ps;
  }
};

exports.categories = {
  ALL:       -1,
  ARENA:     0x0001,
  PLAYERS:   0x0002,
  BALL:      0x0004,
  PARTICLES: 0x0008
};




function bodyDef(type, options) {
  options = _.extend({
    x: 0,
    y: 0,
    angle: 0,
    fixedRotation: false
  }, options);
  var bd = new Box2D.Dynamics.b2BodyDef;
  bd.type = type;
  bd.position.x = options.x;
  bd.position.y = options.y;
  bd.angle = options.angle;
  bd.fixedRotation = options.fixedRotation;
  return bd;
}
  
