var world = require('./world');

function Game(playerInfo) {

  // seconds
  this.duration = 15;

  // meters
  this.world = world;

  // different states the game can be in
  this.states = {
    'warmup':     require('./states/warmup'),
    'kickoff':    require('./states/kickoff'),
    'play':       require('./states/play'),
    'scored':     require('./states/scored'),
    'endofmatch': require('./states/endofmatch')
  };

  // how to go from one state to another
  this.transitions = [
      {   name: 'startup',  from: 'none',                                   to: 'warmup'       },
      {   name: 'ready',    from: ['warmup', 'scored'],                     to: 'kickoff'      },
      {   name: 'go',       from: 'kickoff',                                to: 'play'         },
      {   name: 'scored',   from: 'play',                                   to: 'scored'       },
      {   name: 'end',      from: ['warmup', 'kickoff', 'play', 'scored'],  to: 'endofmatch'   },
  ];
  
  // two players in the current match
  this.players = playerInfo.map(function(p) {
    return {
      id: p.id,
      name: p.firstName + ' ' + p.lastName,
      score: 0
    }
  });
  
  this.score = function(playerIndex) {
    this.players[playerIndex].score += 1;
  };

}

module.exports = Game;
