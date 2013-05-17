var _ = require('underscore');

var players = [
  null,
  null
];

exports.hasPlayerWithId = function(id) {
  return _.findWhere(players, {id: id}) != null;
};

exports.needsPlayer = function() {
  return _.any(players, function(p) { return p === null; })
};

exports.newPlayerId = function() {
  return Math.floor(Math.random() * 10000);
};

exports.addPlayer = function(id) {
  players[0] = {id: id};
  return 0;
};
