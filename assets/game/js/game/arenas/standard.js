var world = require('../world');

exports.name        = 'Standard';

var PI     = 3.14;
var width  = world.width;
var height = world.height;
var top    = 3;
var left   = 0.5;
var right  = world.width  - 0.5;
var bottom = world.height - 1.5;


exports.walls = [

  // top
  { x:  width / 2,     y:  top,           width:  width,   height: 1             },
  
  // bottom
  { x:  width / 2,     y:  bottom,        width:  width,   height: 1             },
  
  // left
  { x:  left  + 2,     y:  height * 1/6,  width:  1,       height: height / 2.5  },
  { x:  left  + 2,     y:  height * 5/6,  width:  1,       height: height / 2.5  },
  
  // right
  { x:  right - 2,     y:  height * 1/6,  width:  1,       height: height / 2.5  },
  { x:  right - 2,     y:  height * 5/6,  width:  1,       height: height / 2.5  },
  
];

exports.spinners = [

  { x:  width / 12 * 5,   y:  height / 3,     width:  2, height: 2, rotation: PI / 4 },
  { x:  width / 12 * 7,   y:  height / 3 * 2, width:  2, height: 2, rotation: PI / 4 },
  
];

exports.goals = {
  
  0: [
    { x:  left + 1,   y:  height / 2,   width:  4,  height: 8 },
  ],
  
  1: [
    { x:  right - 1,  y:  height / 2,   width:  4,   height: 8, rotation: PI },
  ]
  
};
