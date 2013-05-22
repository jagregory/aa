var WarmUp = require('./states/warmup');
var KickOff = require('./states/kickoff');
var Play = require('./states/play');
var Scored = require('./states/scored');
var EndOfMatch = require('./states/endofmatch');

function Sequencer(game) {
  
  var states = {
    'warmup':     new WarmUp(game),
    'kickoff':    new KickOff(game),
    'play':       new Play(game),
    'scored':     new Scored(game),
    'endofmatch': new EndOfMatch(game)
  };

  var activeState = null;
  
  var fsm = StateMachine.create({
  
    initial: 'warmup',
  
    events: [
      {   name: 'ready',  from: 'warmup',                                 to: 'kickoff'      },
      {   name: 'go',     from: ['scored', 'kickoff'],                    to: 'play'         },
      {   name: 'score',  from: 'play',                                   to: 'scored'       },
      {   name: 'end',    from: ['warmup', 'kickoff', 'play', 'scored'],  to: 'endofmatch'   },
    ],
  
    callbacks: {
      onenterstate: function(transition, start, end) {
        console.log('[sequencer] ' + start + ' + ' + transition + ' = ' + end);
        states[start] && states[start].exit();
        states[end]   && states[end].enter();
        activeState = states[end];
      }
    }
  
  });
  
  this.transition = function(trans) {
    fsm[trans]();
  };
  
  this.active = function() {
    return activeState;
  };
  
}

module.exports = Sequencer;
