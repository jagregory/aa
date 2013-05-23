var _ = require('../../3rdparty/underscore-min');
var world = require('./world');

var globalCount = 0;

var Entity = function() {
  this.id     = (++globalCount);
  this.body   = null
  this.sprite = null;
};

Entity.prototype.create = function(physicsEngine, graphicsEngine) {
  if (this.bodySpec) {
    this.bodySpec.fixture.userData = { entityId: this.id };
    this.body = physicsEngine.create(this.bodySpec.body, this.bodySpec.fixture);  
  }
  if (this.sprite) {
    graphicsEngine.stage.addChild(this.sprite);
  }
};

Entity.prototype.destroy = function(physicsEngine, graphicsEngine) {
  if (this.body) {
    physicsEngine.destroy(this.body);
  }
  if (this.sprite) {
    graphicsEngine.removeChild(this.sprite);
  }
};

Entity.prototype.update = function(delta) {
  if (this.sprite && this.body) {
    this.sprite.position.x = world.toPixels(this.body.GetPosition().x);
    this.sprite.position.y = world.toPixels(this.body.GetPosition().y);
    this.sprite.rotation = this.body.GetAngle();
  }
};

Entity.prototype.collision = function(other, points) {
  // nothing
};

module.exports = Entity;
