var _               = require('../../../3rdparty/underscore-min');
var CompoundEntity  = require('../compound-entity');
var Background      = require('./background');
var Wall            = require('./wall');
var Spinner         = require('./spinner');
var Goal            = require('./goal');

var definitions = [
  require('../arenas/standard'),
//  require('../arenas/angular'),
];

function Arena() {
  
  var that = this;
  var picked = definitions[_.random(definitions.length-1)];

  this.id = 'arena';
  
  this.entities.push(new Background(picked.background));
  
  _.each(picked.walls, function(w, i) {
      var wall = new Wall(w.id || 'wall' + i, w.x, w.y, w.width, w.height, w.rotation || 0);
      that.entities.push(wall);
  });

  _.each(picked.spinners, function(w, i) {
      var spinner = new Spinner('spinner' + i, w.x, w.y, w.width, w.height);
      that.entities.push(spinner);
  });

  _.each(picked.goals, function(goals, playerIndex) {
    _.each(goals, function(g, i) {
        var goal = new Goal('p' + (playerIndex + 1) + 'goal' + i, playerIndex, g.x, g.y, g.width, g.height, g.rotation || 0);
        that.entities.push(goal);
    });
  });
  
}

Arena.prototype = new CompoundEntity();

module.exports = Arena;
