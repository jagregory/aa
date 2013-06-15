var Leaderboard   = require('./entities/Leaderboard');
var hub           = require('../engine/hub');

function Intro(engine) {
  engine.addEntity(new Leaderboard());
  hub.send('engine.sound.play', {file: '/game/sounds/intro.mp3'});
}

Intro.prototype.update = function(engine, delta) {

};

Intro.prototype.destroy = function(engine) {
  engine.deleteEntity(new Leaderboard());
  hub.send('engine.sound.stop', {file: '/game/sounds/intro.mp3'});
};

module.exports = Intro;
