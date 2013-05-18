var _ = require('underscore');
var uuid = require('node-uuid');

var players = [];

// should save new players to a DB
// and load all players on startup

exports.create = function(firstName, lastName, mobile) {
  var p = Object.freeze({
    id: uuid.v4(),
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    level: 1
  });
  players.push(p);
  return p;
};

exports.withId = function(id) {
  return _.findWhere(players, {id: id});
};

exports.all = function() {
  return players;
};

exports.delete = function(player) {
  players = _.reject(players, function(p) { return p.id === player.id; });
};
