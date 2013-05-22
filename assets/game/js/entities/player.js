var categories = require('../physics/categories');
var world      = require('../world');

function Player(game, physics, options) {
  
  options = $.extend({
    x: 5,
    y: 5,
    width: 1,
    height: 4
  }, options);

//  this.id = game.track(this);
  this.id = options.id;
  this.userId = options.userId;
  this.name = options.name;

  var physicsBody = physics.createDynamicBody({
    filterCategoryBits: categories.PLAYER,
    filterMaskBits: categories.ARENA | categories.BALL,
    density: 1000,
    fixedRotation: true,
    width: options.width,
    height: options.height,
    x: options.x,
    y: options.y,
    userData: {
      entityId: this.id
    }
  });
  
  var texture = PIXI.Texture.fromImage('/game/images/paddle.png');
  var sprite = new PIXI.Sprite(texture);
  sprite.height = world.toPixels(options.height);
  sprite.width = world.toPixels(options.width);
  sprite.anchor.x = sprite.width / 2.0;
  sprite.anchor.y = sprite.height / 2.0;

  game.stage.addChild(sprite);

  this.body = physicsBody;
  this.sprite = sprite;  

  this.moveBy = function(xDelta, yDelta) {
    if (xDelta || yDelta) {
      var force = new Box2D.Common.Math.b2Vec2(xDelta * -1, yDelta * -1)
      physicsBody.SetAwake(true)
      physicsBody.SetLinearVelocity(force)
    } else {
      physicsBody.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0,0));
      physicsBody.SetAngularVelocity(0);
    }
  };
  
  this.update = function(delta) {
    sprite.position.x = world.toPixels(physicsBody.GetPosition().x);
    sprite.position.y = world.toPixels(physicsBody.GetPosition().y);
    sprite.rotation = physicsBody.GetAngle();
  };

  this.collision = function(other, points) {    
    // soon we shouldn't have access to the game engine
    // these should jsut be broadcasted to the event hub
    if (other.id === 'ball') {
      game.broadcast('sound:play', '/game/sounds/collision-2.mp3');
      game.broadcast('particles:explosion', {
        source: points[0],
        intensity: 30
      });
    }
  };
  
}

module.exports = Player;
