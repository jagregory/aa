var arena = require('../arena')
var w = require('../physics/world');

arena.define('Standard', [
  { x:  w.width / 2, y:  w.top,        width:  w.width, height: 1        },
  { x:  w.width / 2, y:  w.bottom,     width:  w.width, height: 1        },
  { x:  w.left,      y:  w.height / 2, width:  1,       height: w.height },
  { x:  w.right,     y:  w.height / 2, width:  1,       height: w.height },
])

/*
Arena.define('Shapely', [
  { x: 1.5, y: 15, width: 1, height: 30 }, // left
  { x: 38.5, y: 15, width: 1, height: 30 }, // right
  { x: 11, y: 1, width: 18, height: 1, rotation: .05 }, // top left
  { x: 29, y: 1, width: 18, height: 1, rotation: -.05 }, // top right
  { x: 11, y: 29, width: 18, height: 1, rotation: -.05 }, // bottom left
  { x: 29, y: 29, width: 18, height: 1, rotation: .05 }, // bottom right
  { x: 20, y: 15, width: 1, height: 6 }, // middle
])
*/
