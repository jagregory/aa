var w = require('../world');
var PI   = 3.14;

exports.name = 'Standard';

exports.background = '/game/images/grass.jpg';

exports.walls = [

  // outer box
  { x:  w.width / 2,     y:  w.top,           width:  w.width, height: 1              },
  { x:  w.width / 2,     y:  w.bottom,        width:  w.width, height: 1              },
  { x:  w.left + 2,      y:  w.height * 1/6,  width:  1,       height: w.height / 2.5 },
  { x:  w.left + 2,      y:  w.height * 5/6,  width:  1,       height: w.height / 2.5 },
  { x:  w.right - 2,     y:  w.height * 1/6,  width:  1,       height: w.height / 2.5 },
  { x:  w.right - 2,     y:  w.height * 5/6,  width:  1,       height: w.height / 2.5 },
];

exports.goals = {
  
  0: [
    { x:  w.left + 1,    y:  w.height / 2,    width:  4,       height: 8 },
  ],
  
  1: [
    { x:  w.right - 1,   y:  w.height / 2,    width:  4,       height: 8, rotation: PI },
  ]
  
};
