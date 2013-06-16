var Sequencer   = require('./sequencer');
var world       = require('./world');
var hub         = require('../engine/hub');

var Ball        = require('./entities/ball');
var world       = require('./world');
var ActionText  = require('./entities/action-text');

function Game(engine, playerInfo) {

  // two players in the current match
  // or maybe this belongs in the Player entity?
  this.players = playerInfo.map(function(p) {
    return {
      id: p.id,
      name: p.firstName + ' ' + p.lastName.substr(0,1),
      score: 0
    }
  });
  this.roundNumber = 1

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
      {   name: 'go',       from: ['scored', 'kickoff'],                    to: 'play'         },
      {   name: 'scored',   from: 'play',                                   to: 'scored'       },
      {   name: 'end',      from: ['warmup', 'kickoff', 'play', 'scored'],  to: 'endofmatch'   },
  ];
  
  this.duration = 60;
  this.timeRemaining = this.duration * 1000;
  this.ballsInPlay = []
  
  this.engine = engine;
  this.sequencer = new Sequencer(engine, this, states, transitions);
  this.sequencer.start();

  hub.on('game.score', function(data) {
    this.score(1 - data.againstIndex);
    this.sequencer.transition('scored', data);
  }.bind(this));

  hub.on('game.end', function() {
    this.sequencer.transition('end');
  }.bind(this));

  hub.on('game.multiball', function() {
    this.multiball()
  }.bind(this))
}

Game.prototype.update = function(engine, delta) {
  this.sequencer.active().update(delta);
};

Game.prototype.destroy = function(engine) {
  
};

Game.prototype.transition = function(name, args) {
  this.sequencer.transition(name, args);
};

Game.prototype.message = function(message, args) {
  this.sequencer.active().on(message, args);
};

Game.prototype.score = function(playerIndex) {
  this.roundNumber += 1
  this.players[playerIndex].score += 1;
};

Game.prototype.move = function(pindex, dir) {
  var player = this.engine.getEntity(pindex === 0 ? 'p1' : 'p2');
  player.move(dir);
};

Game.prototype.multiball = function() {
  var text = new ActionText('multiball', 'Multi-ball!');
  this.engine.addEntity(text)

  hub.send('engine.sound.play', { file: '/game/sounds/multiball.mp3' })
  setTimeout(function() {
    hub.send('engine.sound.play', { file: '/game/sounds/sax.mp3' });
  }, 2000);

  setTimeout(function() {
    this.engine.deleteEntity(text.id)
    
    var ball = this.createBall(-1, 1)
    ball.kick(1)

    ball = this.createBall(1, 1)
    ball.kick(-1)

    ball = this.createBall(0, -1)
    ball.kick(-1)
  }.bind(this), 1000)
}

Game.prototype.clearBalls = function() {
  this.ballsInPlay.forEach(function(ball) {
    this.removeBall(ball)
  }.bind(this))
  this.ballsInPlay = []
}

Game.prototype.removeBall = function(ball) {
  this.engine.deleteEntity(ball.id)
  this.ballsInPlay = this.ballsInPlay.filter(function(b) { return b !== ball })
}

Game.prototype.createBall = function(x, y) {
  var ballStartY = null
  var ballStartX = null

  if (x === -1) {
    ballStartX = world.width / 5
  } else if (x === 0) {
    ballStartX = world.width / 2
  } else {
    ballStartX = (world.width / 5) * 4
  }

  if (y === -1) {
    ballStartY = world.height / 5
  } else if (y === 0) {
    ballStartY = world.height / 2
  } else {
    ballStartY = (world.height / 5) * 4
  }

  var ball = new Ball('ball:'+this.ballsInPlay.length, ballStartX, ballStartY)

  this.engine.addEntity(ball)
  this.ballsInPlay.push(ball)

  return ball
}

module.exports = Game;
