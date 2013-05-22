var _ = require('../../../3rdparty/underscore-min');
var Wall = require('./wall')

var Arena = function(game, physics, definition) {
  
  console.log('Using arena: ' + definition.name);

  var bgTexture = PIXI.Texture.fromImage(definition.background);
  var tilingSprite = new PIXI.TilingSprite(bgTexture, $('canvas').width(), $('canvas').height());
  game.stage.addChild(tilingSprite);
  
  _.each(definition.walls, function(def, i) {
    def.id = 'wall' + i;
    var wall = new Wall(game, physics, def);
    game.addEntity(wall);
  });
  
};

var definitions = [
  require('../arenas/standard'),
  require('../arenas/angular'),
];

exports.random = function(game, physics) {
  var def = definitions[_.random(definitions.length-1)];
  return new Arena(game, physics, def);
};
