var _ = require('../../3rdparty/underscore-min');
var Entity = require('./entity');

var globalCount = 0;

var CompoundEntity = function() {
  this.id       = (++globalCount);
  this.entities = [];
};

CompoundEntity.prototype.create = function(physicsEngine, graphicsEngine) {
  this.entities.forEach(function(entity) {
    entity.create(physicsEngine, graphicsEngine);
  });
};

CompoundEntity.prototype.destroy = function(physicsEngine, graphicsEngine) {
  this.entities.forEach(function(entity) {
    entity.destroy(physicsEngine, graphicsEngine);
  });
};

CompoundEntity.prototype.update = function(physicsEngine, graphicsEngine) {
  this.entities.forEach(function(entity) {
    entity.update(physicsEngine, graphicsEngine);
  });
};

CompoundEntity.prototype.collision = function(other, points) {
};

module.exports = CompoundEntity;
