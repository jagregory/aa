
var users = {
  p1: null,
  p2: null
};

exports.hasPlayerWithId = function(id) {
  return users.p1 === id || users.p2 === id;
};

exports.needsPlayer = function() {
  return !(users.p1 && users.p2);
};

exports.newPlayerId = function() {
  return Math.floor(Math.random() * 10000);
};

exports.addPlayer = function(id) {
  users.p1 = id;
  return 'p1';
};
