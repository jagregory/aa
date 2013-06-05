//
// Needs fixing
// See how the "standard" arena is defined
//

var w = require('../game-world');

var PI   = 3.14;
var PEAK = 1.35;

exports.name = 'Angular';

exports.background = '/game/images/grass.jpg';

exports.walls = [
  
  // outer box
  { x:  w.width / 2, y:  w.top,        width:  w.width, height: 1        },
  { x:  w.width / 2, y:  w.bottom,     width:  w.width, height: 1        },
  { x:  w.left,      y:  w.height / 2, width:  1,       height: w.height },
  { x:  w.right,     y:  w.height / 2, width:  1,       height: w.height },

  // blocks
  { x:  w.width / 2, y:  w.top + 1,    width:  w.width / 5, height: 1 },
  { x:  w.width / 2, y:  w.bottom - 1, width:  w.width / 5, height: 1 },
  
  // peaks
  { x:  w.width / 2 - PEAK, y:  PEAK,            width: PEAK * 3.5, height: 1, rotation:  PI / 4 },
  { x:  w.width / 2 + PEAK, y:  PEAK,            width: PEAK * 3.5, height: 1, rotation: -PI / 4 },
  { x:  w.width / 2 - PEAK, y:  w.height - PEAK, width: PEAK * 3.5, height: 1, rotation: -PI / 4 },
  { x:  w.width / 2 + PEAK, y:  w.height - PEAK, width: PEAK * 3.5, height: 1, rotation:  PI / 4 },
  
];

exports.spinners = [

  { x:  w.width / 12 * 5,   y:  w.height / 3,     width:  2, height: 2, rotation: PI / 4 },
  { x:  w.width / 12 * 7,   y:  w.height / 3 * 2, width:  2, height: 2, rotation: PI / 4 },
  
];

exports.goals = {
  
  0: [
    { x:  w.left + 2,    y:  w.top    + 2,    width:  2,   height: 2 },
    { x:  w.left + 2,    y:  w.bottom - 2,    width:  2,   height: 2 },
    { x:  w.left + 2,    y:  w.height / 2,    width:  2,   height: 2 },
  ],
  
  1: [
    { x:  w.right - 2,   y:  w.top    + 2,    width:  2,   height: 2 },
    { x:  w.right - 2,   y:  w.bottom - 2,    width:  2,   height: 2 },
    { x:  w.right - 2,   y:  w.height / 2,    width:  2,   height: 2 },
  ]
  
};
