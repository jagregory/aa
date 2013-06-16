var _ = require('../../../3rdparty/underscore-min');

function Sequencer(engine, game, states, transitions) {
    
  var states = _.reduce(states, function(acc, fn, key) {
    acc[key] = new fn(engine, game);
    return acc;
  }, {});
  
  var that = this;
  this.activeState = null;
  
  this.fsm = window.StateMachine.create({
  
    events: transitions,
  
    callbacks: {
      onenterstate: function(transition, start, end, args) {
        console.log('[sequencer] ' + start + ' + ' + transition + ' = ' + end);
        states[start] && states[start].exit();
        states[end]   && states[end].enter(args);
        that.activeState = states[end];
      }
    },
    
    // error: function(eventName, from, to, args, errorCode, errorMessage) {
    //   if (errorCode === StateMachine.Error.INVALID_CALLBACK) {
    //     throw errorMessage;
    //   } else {
    //     console.log('[sequencer] ' + eventName + ' : ' + errorMessage);
    //   }
    // },
  
  });
  
}

Sequencer.prototype.start = function() {
  this.fsm.startup();
};

Sequencer.prototype.transition = function(trans, args) {
  if (this.fsm.can(trans)) {
    this.fsm[trans](args);
  } else {
    console.log('Invalid transition (this is probably a ball going in after one already has)')
  }
};

Sequencer.prototype.active = function() {
  return this.activeState;
};

module.exports = Sequencer;
