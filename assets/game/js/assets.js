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
];

var sounds = [
  'bounce',
  'crowd', 'crowd-end', 'crown-oh', 'crowd-organ', 'crowd-scored',
  'intro', 'multiball', 'sax', 'whistle'
];

exports.images = images.reduce(function(acc, name) {
  acc[name] = imagePath(name);
  return acc;
}, {});

exports.sounds = sounds.reduce(function(name, acc) {
  acc[name] = soundPath(name);
  return acc;
}, {});


function imagePath(name) {
  return '/game/images/' + name + '.png';
}

function soundPath(name) {
  return '/game/sounds/' + name + '.mp3';
}
