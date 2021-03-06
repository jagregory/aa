
var EntityTracker = function() {
  
  var entities = {};
  var lastId = 1;

  this.forEach = function(callback) {
    for (var id in entities) {
      callback(entities[id]);
    }
  };

  this.find = function(id) {
    return entities[id];
  };

  this.findMatching = function(regex) {
    return Object.keys(entities)
      .filter(function(id) { return id.match(regex) })
      .map(function(id) { return entities[id] })
  }

  this.track = function(entity) {
    //console.log('Tracking entity: ' + entity.id);
    var id = entity.id || (lastId += 1);
    entities[id] = entity;
    return id;
  };

  this.forget = function(entity) {
    delete entities[entity.id];
  };
  
  this.forgetAll = function() {
    entities = {};
  }
  
};

module.exports = EntityTracker;
