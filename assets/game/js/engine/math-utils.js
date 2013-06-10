exports.clampVelocity = function(body, min, max) {
  var vec = body.GetLinearVelocity();
  if (vec.x != 0 && vec.y != 0) {
    vec.x = exports.clampWithSign(vec.x, min, max);
    vec.y = exports.clampWithSign(vec.y, min, max);  
    body.SetLinearVelocity(vec);
  }
};

exports.clampWithSign = function(val, min, max) {
  if (val > 0) {
    return exports.clamp(val, min, max);
  } else {
    return exports.clamp(val, -max, -min);
  }
};

exports.clamp = function(val, min, max) {
  return Math.min(Math.max(val, min), max);
};

exports.randomBetween = function(min, max) {
  return Math.floor(Math.random() * max) + min;
};

exports.randomSign = function() {
  return Math.random() < 0.5 ? -1 : 1;
};

exports.distance = function(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
};