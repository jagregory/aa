var Entity      = require('../../engine/entity');
var hub         = require('../../engine/hub');

function Crowd() {
  this.id = 'crowd';
  hub.send('engine.sound.play', '/game/sounds/crowd.mp3');
  hub.on('game.score', this.cheer.bind(this));
  hub.on('game.finishing', this.organ.bind(this));
  hub.on('game.end', this.end.bind(this));
}

Crowd.prototype = new Entity();

Crowd.prototype.cheer = function() {
  hub.send('engine.sound.play', '/game/sounds/crowd-scored.mp3');
};

Crowd.prototype.organ = function() {
  hub.send('engine.sound.play', '/game/sounds/crowd-organ.mp3');
};

Crowd.prototype.end = function() {
  hub.send('engine.sound.play', '/game/sounds/crowd-end.mp3');
};

module.exports = Crowd;
