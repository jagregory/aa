var _ = require('../../3rdparty/underscore-min');

var images = [
  'ball',
  'boom-circle', 'boom-line', 'boom-splash',
  'cat', 'cat-down', 'cat-up',
  'cone',
  'dog', 'dog-down', 'dog-up',
  'end-draw', 'end-winner',
  'leaderboard',
  'particle-ball',
  'stadium', 'stadium-shake-left', 'stadium-shake-right',
  'title'
].reduce(imagePath, {});

var sounds = [
  'bounce',
  'crowd', 'crowd-end', 'crowd-oh', 'crowd-organ', 'crowd-scored',
  'intro', 'multiball', 'sax', 'whistle'
].reduce(soundPath, {});

function imagePath(acc, name) {
  acc[name] = '/game/images/' + name + '.png';
  return acc;
}

function soundPath(acc, name) {
  acc[name] = '/game/sounds/' + name + '.mp3';
  return acc;
}

exports.image = function(name) {
  return images[name];
};

exports.images = function(/*varargs*/) {
  return Array.prototype.slice.apply(arguments).map(function(name) {
    return images[name];
  })
};

exports.allImages = function() {
  return _.values(images);
}

exports.sound = function(name) {
  return sounds[name];
};
