var Entity      = require('../../engine/entity');
var hub         = require('../../engine/hub');
var assets      = require('../../assets');

function Crowd() {
  this.id = 'crowd';
  hub.send('engine.sound.play', sound('crowd', true));
  hub.on('game.score', this.cheer.bind(this));
  hub.on('game.finishing', this.organ.bind(this));
  hub.on('game.end', this.end.bind(this));
}

Crowd.prototype = new Entity();

Crowd.prototype.destroy = function() {
  hub.send('engine.sound.stop', sound('crowd'));
};

Crowd.prototype.cheer = function(args) {
  if (args.againstIndex !== args.ball.kickedBy) {
    hub.send('engine.sound.play', sound('crowd-scored', false));
  } else {
    hub.send('engine.sound.play', sound('crowd-oh', false));
  }
};

Crowd.prototype.organ = function() {
  hub.send('engine.sound.play', sound('crowd-organ', false));
};

Crowd.prototype.end = function() {
  hub.send('engine.sound.stop', sound('crowd-organ'));
  hub.send('engine.sound.play', sound('crowd-end', false));
};

function sound(name, loop) {
  return {
    file: assets.sound(name),
    loop: loop
  };
}

module.exports = Crowd;
