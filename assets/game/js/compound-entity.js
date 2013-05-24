var _ = require('../../3rdparty/underscore-min');
var Entity = require('./entity');
var world = require('./world');

var globalCount = 0;

var CompoundEntity = function() {
  this.id       = (++globalCount);
  this.entities = [];
};

//
// TODO
//
// Collisions should register on both the compound entity and the child entity
// Maybe the user data can store both the entity ID and compound ID
// this.entites[0].body.GetFixtureList().GetUserData().entityId = 'parent';
//

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
