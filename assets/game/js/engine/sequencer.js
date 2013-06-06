var _ = require('../../../3rdparty/underscore-min');

function Sequencer(engine, game) {
    
  var states = _.reduce(game.states, function(acc, fn, key) {
    acc[key] = new fn(game, engine);
    return acc;
  }, {});
  
  var activeState = null;
  
  var fsm = window.StateMachine.create({
  
    events: game.transitions,
  
    callbacks: {
      onenterstate: function(transition, start, end, args) {
        console.log('[sequencer] ' + start + ' + ' + transition + ' = ' + end);
        states[start] && states[start].exit();
        states[end]   && states[end].enter(args);
        activeState = states[end];
      }
    },
    
    error: function(eventName, from, to, args, errorCode, errorMessage) {
        console.log('[sequencer] ' + eventName + ' : ' + errorMessage);
    },
  
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
