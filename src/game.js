var _ = require('underscore');
var bridge = require('./bridge');

var players = [
  {id: null},
  {id: null}
];

exports.hasPlayerWithId = function(id) {
  return _.findWhere(players, {id: id}) != null;
};

exports.needsPlayer = function() {
  return _.findWhere(players, {id: null}) != null;
};

exports.newPlayerId = function() {
  return Math.floor(Math.random() * 10000);
};

exports.addPlayer = function(id) {
  players[0] = {id: id};
  bridge.send('player-join', {id: id, pos: 1, name: 'Bob'});
  return 1;
};

exports.movePlayer = function(id, direction) {
  var y = (direction === 'up') ? -10 : 10;
  bridge.send('player-move', {id: id, xDelta: 0, yDelta: y});
};
