var _ = require('underscore');
var bridge = require('./bridge');

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
  bridge.send('player-join', {pos: 1, id: id, name: 'Bob'});
  return 1;
};
