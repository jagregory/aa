var Sequencer   = require('./sequencer');
var world       = require('./world');
var hub         = require('../engine/hub');

function Game(engine, playerInfo) {

  // two players in the current match
  // or maybe this belongs in the Player entity?
  this.players = playerInfo.map(function(p) {
    return {
      id: p.id,
      name: p.firstName + ' ' + p.lastName,
      score: 0
    }
  });
  
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
  
  this.duration = 60;
  this.timeRemaining = this.duration * 1000;
  
  this.engine = engine;
  this.sequencer = new Sequencer(engine, this, states, transitions);
  this.sequencer.start();

  hub.on('state:transition', function(params) {
    this.sequencer.transition(params.name, params.args);
  }.bind(this));

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

Game.prototype.move = function(pindex, dir) {
  var player = this.engine.getEntity(pindex === 0 ? 'p1' : 'p2');
  player.move(dir);
};

module.exports = Game;
