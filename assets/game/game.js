var Arena = require('./arena');
var Player = require('./player');
var Sequencer = require('./sequencer');

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

  this.track = function(entity) {
    var id = entity.id || (lastId += 1)
    entities[id] = entity;
    return id;
  };

  this.forget = function(entity) {
    delete entities[entity.id];
  };
  
};


var Game = function(engine, p1, p2) {
    
  // Temporary
  // until entities get refactored to not need the engine directly
  this.engine = engine;
  this.players = {
    p1: p1,
    p2: p2
  };
      
  this.track = function(entity) {
    tracker.track(entity);
  };

  this.forget = function(entity) {
    tracker.forget(entity);
  };
  
  this.transition = function(trans) {
    sequencer.transition(trans);
  };

  this.tick = function() {
    sequencer.active().tick();
    tracker.forEach(function(entity) {
      if (entity.update) { entity.update(); }
    });
  };

  this.input = function(message, args) {
    activeState.on(message, args);
  };

  var tracker = new EntityTracker();
  var sequencer = new Sequencer(this);

//  tracker.track(Arena.random(this, engine.physics));
//  tracker.track(new Player(this, engine.physics, {id: 12, name: 'bob', x: 20, y: 10 }));
//  tracker.track(new Player(this, engine.physics, {id: 34, name: 'bob', x: 40, y: 15 }));

};

module.exports = Game;
