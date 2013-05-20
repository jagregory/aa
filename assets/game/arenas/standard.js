var w = require('../physics/world');

exports.name = 'Standard';

exports.walls = [

  // outer box
  { x:  w.width / 2, y:  w.top,        width:  w.width, height: 1        },
  { x:  w.width / 2, y:  w.bottom,     width:  w.width, height: 1        },
  { x:  w.left,      y:  w.height / 2, width:  1,       height: w.height },
  { x:  w.right,     y:  w.height / 2, width:  1,       height: w.height },

];
