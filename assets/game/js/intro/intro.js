var _             = require('../../../3rdparty/underscore-min');
var Leaderboard   = require('./entities/Leaderboard');
var Title         = require('./entities/Title');
var hub           = require('../engine/hub');

function Intro(engine) {
  this.current = 0;
  this.switch(engine);
  this.switchTimer = window.setInterval(_.bind(this.switch, this, engine), 10000);
  hub.send('engine.sound.play', {file: '/game/sounds/intro.mp3', loop: true, volume: 0.8});
}

Intro.prototype.update = function(engine, delta) {
};

Intro.prototype.destroy = function(engine) {
  window.clearTimeout(this.switchTimer);
  engine.deleteEntity('leaderboard');
  engine.deleteEntity('title');
  hub.send('engine.sound.stop', {file: '/game/sounds/intro.mp3'});
};

Intro.prototype.switch = function(engine) {
  if (++this.current % 2) {
    engine.deleteEntity('title');
    engine.addEntity(new Leaderboard('leaderboard'));
  } else {
    engine.deleteEntity('leaderboard');
    engine.addEntity(new Title('title'));    
  }
};

module.exports = Intro;
