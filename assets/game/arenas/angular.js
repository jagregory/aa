var w = require('../physics/world');

exports.name = 'Angular';

exports.walls = [
  
  // outer box
  { x:  w.width / 2, y:  w.top,        width:  w.width, height: 1        },
  { x:  w.width / 2, y:  w.bottom,     width:  w.width, height: 1        },
  { x:  w.left,      y:  w.height / 2, width:  1,       height: w.height },
  { x:  w.right,     y:  w.height / 2, width:  1,       height: w.height },
  
  // peaks
  { x:  w.width / 2, y:  w.top + 1,    width:  w.width / 4, height: 1 },
  { x:  w.width / 2, y:  w.bottom - 1, width:  w.width / 4, height: 1 },
  
  // inner diamonds
  { x:  w.width / 3,     y:  w.height / 3,     width:  1, height: 1 },
  { x:  w.width /3 * 2,  y:  w.height / 3 * 2, width:  1, height: 1 },
  
];
