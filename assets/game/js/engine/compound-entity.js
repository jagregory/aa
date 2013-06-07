var _ = require('../../../3rdparty/underscore-min');
var Entity = require('./entity');

var globalCount = 0;

var CompoundEntity = function() {
  this.id       = (++globalCount);
  this.entities = [];
};

CompoundEntity.prototype.create = function(engine, game) {
  this.entities.forEach(function(entity) {
    entity.create(engine, game);
  });
};

CompoundEntity.prototype.destroy = function(engine, game) {
  this.entities.forEach(function(entity) {
    entity.destroy(engine, game);
  });
};

CompoundEntity.prototype.update = function(engine, game) {
  this.entities.forEach(function(entity) {
    entity.update(engine, game);
  });
};

CompoundEntity.prototype.collision = function(other, points) {
};

module.exports = CompoundEntity;
