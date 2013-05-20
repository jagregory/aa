var _ = require('../3rdparty/underscore-min');
var Wall = require('./wall')

var Arena = function(game, physics, name, walls) {
  console.log('Using arena: ' + name);
  walls.forEach(function(def) {
    new Wall(game, physics, def);
  });
};

var definitions = [
  require('./arenas/standard'),
  require('./arenas/angular'),
];

exports.createRandom = function(game, physics) {
  var def = definitions[_.random(definitions.length-1)];
  return new Arena(game, physics, def.name, def.walls);
};
