var EntityTracker = require('./entitytracker');
var Sequencer = require('./sequencer');


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

  this.getEntity = function(id) {
    return tracker.find(id);
  };

  this.tick = function() {
    sequencer.active().tick();
    tracker.forEach(function(entity) {
      if (entity.update) { entity.update(); }
    });
  };

  this.input = function(message, args) {
    sequencer.active().on(message, args);
  };

  var tracker = new EntityTracker();
  var sequencer = new Sequencer(this);

};

module.exports = Game;
