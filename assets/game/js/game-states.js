var WarmUp      = require('./states/warmup');
var KickOff     = require('./states/kickoff');
var Play        = require('./states/play');
var Scored      = require('./states/scored');
var EndOfMatch  = require('./states/endofmatch');
var hub         = require('./hub');

function GameStates(game) {
    
  var states = {
    'warmup':     new WarmUp(game),
    'kickoff':    new KickOff(game),
    'play':       new Play(game),
    'scored':     new Scored(game),
    'endofmatch': new EndOfMatch(game)
  };

  var activeState = null;
  
  var fsm = StateMachine.create({
  
    events: [
      {   name: 'startup',  from: 'none',                                   to: 'warmup'       },
      {   name: 'ready',    from: ['warmup', 'scored'],                     to: 'kickoff'      },
      {   name: 'go',       from: 'kickoff',                                to: 'play'         },
      {   name: 'scored',   from: 'play',                                   to: 'scored'       },
      {   name: 'end',      from: ['warmup', 'kickoff', 'play', 'scored'],  to: 'endofmatch'   },
    ],
  
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

module.exports = GameStates;
