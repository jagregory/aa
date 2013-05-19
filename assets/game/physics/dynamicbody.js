var WorldScale = 2.0;

exports.createPolygon = function(world, options) {

  options = $.extend({
    density: 1.0,
    friction: 0.5,
    restitution: 0.2
  }, options);

  ['width', 'height', 'x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for static body';
    }
  })

  var fixDef = new Box2D.Dynamics.b2FixtureDef;
  fixDef.density = options.density;
  fixDef.friction = options.friction;
  fixDef.restitution = options.restitution;
  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixDef.shape.SetAsBox(options.width / WorldScale, options.height / WorldScale);
  fixDef.userData = options.userData;
  if (options.filterGroupIndex) {
    fixDef.filter.groupIndex = options.filterGroupIndex;
  }
  if (options.filterCategoryBits) {
    fixDef.filter.categoryBits = options.filterCategoryBits;
  }
  if (options.filterMaskBits) {
    fixDef.filter.maskBits = options.filterMaskBits;
  }

  var bodyDef = new Box2D.Dynamics.b2BodyDef;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  bodyDef.position.x = options.x;
  bodyDef.position.y = options.y;
  if (options.fixedRotation) {
    bodyDef.fixedRotation = options.fixedRotation;
  }
  
  var physicsBody = world.CreateBody(bodyDef);
  physicsBody.CreateFixture(fixDef);
  return physicsBody;

};


exports.createCircle = function(world, options) {

  options = $.extend({
    density: 0.0,
    friction: 0.5,
    restitution: 0.2
  }, options);

  ['radius', 'x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for static body';
    }
  })

  var fixDef = new Box2D.Dynamics.b2FixtureDef;
  fixDef.density = options.density;
  fixDef.friction = options.friction;
  fixDef.restitution = options.restitution;
  fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape;
  fixDef.shape.SetRadius(options.radius);
  fixDef.userData = options.userData;
  if (options.filterGroupIndex) {
    fixDef.filter.groupIndex = options.filterGroupIndex;
  }
  if (options.filterCategoryBits) {
    fixDef.filter.categoryBits = options.filterCategoryBits;
  }
  if (options.filterMaskBits) {
    fixDef.filter.maskBits = options.filterMaskBits;
  }

  var bodyDef = new Box2D.Dynamics.b2BodyDef;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  bodyDef.position.x = options.x;
  bodyDef.position.y = options.y;
  if (options.fixedRotation) {
    bodyDef.fixedRotation = options.fixedRotation;
  }
  if (options.filterCategoryBits) {
    fixDef.filter.categoryBits = options.filterCategoryBits;
  }
  if (options.filterMaskBits) {
    fixDef.filter.maskBits = options.filterMaskBits;
  }
  
  var physicsBody = world.CreateBody(bodyDef);
  physicsBody.CreateFixture(fixDef);
  return physicsBody;

};
