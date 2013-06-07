var Sequencer   = require('./sequencer');
var world       = require('./world');

function Game(engine, playerInfo) {

  var states = {
    'warmup':     require('./states/warmup'),
    'kickoff':    require('./states/kickoff'),
    'play':       require('./states/play'),
    'scored':     require('./states/scored'),
    'endofmatch': require('./states/endofmatch')
  };

  var transitions = [
      {   name: 'startup',  from: 'none',                                   to: 'warmup'       },
      {   name: 'ready',    from: ['warmup', 'scored'],                     to: 'kickoff'      },
      {   name: 'go',       from: 'kickoff',                                to: 'play'         },
      {   name: 'scored',   from: 'play',                                   to: 'scored'       },
      {   name: 'end',      from: ['warmup', 'kickoff', 'play', 'scored'],  to: 'endofmatch'   },
  ];
  
  this.duration  = 15;
  this.sequencer = new Sequencer(engine, this, states, transitions);
  this.sequencer.start();
  
  // two players in the current match
  // or maybe this belongs in the Player entity?
  this.players = playerInfo.map(function(p) {
    return {
      id: p.id,
      name: p.firstName + ' ' + p.lastName,
      score: 0
    }
  });

}

Game.prototype.update = function(engine, delta) {
  this.sequencer.active().update(delta);
};

Game.prototype.transition = function(name, args) {
  this.sequencer.transition(name, args);
};

Game.prototype.message = function(message, args) {
  this.sequencer.active().on(message, args);
};

Game.prototype.score = function(playerIndex) {
    this.players[playerIndex].score += 1;
};

module.exports = Game;
