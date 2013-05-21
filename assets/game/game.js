var Arena = require('./arena');
var Sequencer = require('./sequencer');
var Player = require('./player');


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
  
  var tracker = new EntityTracker();
  var sequencer = new Sequencer(this);
  
  this.track = function(entity) {
    tracker.track(entity);
  };

  this.forget = function(entity) {
    tracker.forget(entity);
  };
  
  this.transition = function(trans) {
    sequencer.transition(trans);
  };

  this.tick = function(delta) {
    activeState.tick(delta);
    tracker.forEach(function(entity) {
      entity.update();
    });
  };

  this.input = function(message, args) {
    activeState.on(message, args);
  };

  tracker.track(Arena.random(this, engine.physics));  
//  engine.track(new Player('p1', p1));
//  engine.track(new Player('p2', p1));

};

module.exports = Game;
