var _ = require('../../../3rdparty/underscore-min');

function Sequencer(game, definition) {
    
  var states = _.reduce(definition.states, function(acc, fn, key) {
    acc[key] = new fn(game);
    return acc;
  }, {});
  
  var activeState = null;
  
  var fsm = window.StateMachine.create({
  
    events: definition.transitions,
  
    callbacks: {
      onenterstate: function(transition, start, end, args) {
        console.log('[sequencer] ' + start + ' + ' + transition + ' = ' + end);
        states[start] && states[start].exit();
        states[end]   && states[end].enter(args);
        activeState = states[end];
      }
    }
  
  });
  
  this.start = function() {
    fsm.startup();
  };
  
  this.transition = function(trans, args) {
    fsm[trans](args);
  };
  
  this.active = function() {
    return activeState;
  };
  
}

module.exports = Sequencer;
