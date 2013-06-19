var _             = require('../../../3rdparty/underscore-min');
var Leaderboard   = require('./entities/Leaderboard');
var Title         = require('./entities/Title');
var About         = require('./entities/About');
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
  this.removeAll(engine);
  window.clearTimeout(this.switchTimer);
  hub.send('engine.sound.stop', {file: '/game/sounds/intro.mp3'});
};

Intro.prototype.switch = function(engine) {
  this.removeAll(engine);
  ++this.current;
  if (this.current % 3 === 1) engine.addEntity(new Leaderboard('leaderboard'));
  if (this.current % 3 === 2) engine.addEntity(new Title('title'));
  if (this.current % 3 === 0) engine.addEntity(new About('about'));
};

Intro.prototype.removeAll = function(engine) {
  engine.deleteEntity('title');
  engine.deleteEntity('leaderboard');
  engine.deleteEntity('about');
};

module.exports = Intro;
