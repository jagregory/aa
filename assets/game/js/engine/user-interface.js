
exports.width  = 0;
exports.height = 0;

exports.resize = function(w, h) {
  exports.width  = w;
  exports.height = h;
};

exports.unit = function(n) {
  return (exports.width / 100) * n
}