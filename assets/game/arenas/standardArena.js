var Arena = require('../arena')

Arena.define('Standard', [
  { x: 1.5, y: 15, width: 1, height: 30 },
  { x: 38.5, y: 15, width: 1, height: 30 },
  { x: 20, y: .5, width: 36, height: 1 },
  { x: 20, y: 29.5, width: 36, height: 1 },
])

Arena.define('Shapely', [
  { x: 1.5, y: 15, width: 1, height: 30 }, // left
  { x: 38.5, y: 15, width: 1, height: 30 }, // right
  { x: 11, y: 1, width: 18, height: 1, rotation: .05 }, // top left
  { x: 29, y: 1, width: 18, height: 1, rotation: -.05 }, // top right
  { x: 11, y: 29, width: 18, height: 1, rotation: -.05 }, // bottom left
  { x: 29, y: 29, width: 18, height: 1, rotation: .05 }, // bottom right
  { x: 20, y: 15, width: 1, height: 6 }, // middle
])