var _ = require('../../3rdparty/underscore-min');
var world = require('./world');

var globalCount = 0;

var Entity = function() {
  
  this.id     = (++globalCount);
  this.body   = null
  this.sprite = null;
  
};

Entity.prototype.create = function(physicsEngine) {
  if (this.bodySpec) {
    this.bodySpec.fixture.userData = { entityId: this.id };
    this.body = physicsEngine.create(this.bodySpec.body, this.bodySpec.fixture);  
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
