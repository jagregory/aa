
var pixelsPerMeter = 16;

exports.toPixels = function(meters) {
  return meters * pixelsPerMeter;
};

exports.setPixelsPerMeter = function(val) {
  pixelsPerMeter = val;
};

exports.getPixelsPerMeter = function() {
  return pixelsPerMeter;
};
