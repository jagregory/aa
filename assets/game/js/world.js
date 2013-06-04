
// in meters

var pixelsPerMeter = 16;
var blockSize = 0.5;
var width     = 50;
var height    = 30;

exports.width  = width;
exports.height = height;
exports.left   = blockSize;
exports.top    = blockSize;
exports.right  = width - blockSize;
exports.bottom = height - blockSize;

exports.pixelsPerMeter = pixelsPerMeter;
exports.physicsScale = 2.0;   // what is this for?

exports.toPixels = function(meters) {
  return meters * pixelsPerMeter;
};

exports.fromPixels = function(pixels) {
  return pixels / pixelsPerMeter;
};

exports.create = function() {
  return {
    width: 50,
    height: 30
  };
};
