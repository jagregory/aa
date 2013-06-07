var _ = require('../../../3rdparty/underscore-min');
var world = require('./world');

var globalCount = 0;

var Entity = function() {
  this.id     = (++globalCount);
  this.body   = null
  this.sprite = null;
};

Entity.prototype.create = function(engine, game) {
  if (this.bodySpec) {
    this.bodySpec.fixture.userData = this;
    this.body = engine.physics.create(this.bodySpec.body, this.bodySpec.fixture);  
  }
  if (this.sprite) {
    engine.graphics.add(this.sprite);
  }
};

Entity.prototype.destroy = function(engine, game) {
  if (this.body) {
    engine.physics.destroy(this.body);
  }
  if (this.sprite) {
    engine.graphics.remove(this.sprite);
  }
};

Entity.prototype.update = function(engine, game, delta) {
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
