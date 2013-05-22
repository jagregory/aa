var WorldScale = 2.0;

exports.createPolygon = function(world, options) {

  var options = $.extend({
    density: 1.0,
    friction: 1,
    restitution: 0
  }, options);

  ['width', 'height', 'x', 'y'].forEach(function(opt) {
    if (typeof options[opt] === 'undefined') {
     throw 'No ' + opt + ' specified for static body';
    }
  });

  var fixDef = new Box2D.Dynamics.b2FixtureDef;
  fixDef.density = options.density;
  fixDef.friction = options.friction;
  fixDef.restitution = options.restitution;
  fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
  fixDef.shape.SetAsBox(options.width / WorldScale, options.height / WorldScale);
  fixDef.userData = options.userData;
  
  var bodyDef = new Box2D.Dynamics.b2BodyDef;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
  bodyDef.position.x = options.x;
  bodyDef.position.y = options.y;
  bodyDef.angle = options.rotation;

  var physicsBody = world.CreateBody(bodyDef);
  physicsBody.CreateFixture(fixDef);
  return physicsBody;

};
