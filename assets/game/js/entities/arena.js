var _               = require('../../../3rdparty/underscore-min');
var CompoundEntity  = require('../compound-entity');
var Wall            = require('./wall');
var Background      = require('./background');

var definitions = [
  require('../arenas/standard'),
  require('../arenas/angular'),
];

function Arena() {
  var picked = definitions[_.random(definitions.length-1)];  
  this.id = 'arena';
  this.entities.push(new Background(picked.background));
  var that = this;
  var walls = _.map(picked.walls, function(w, i) {
      var wall = new Wall('wall' + i, w.x, w.y, w.width, w.height, w.rotation || 0);
      that.entities.push(wall);
  });
}

Arena.prototype = new CompoundEntity();

module.exports = Arena;
