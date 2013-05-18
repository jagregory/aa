var _ = require('underscore');
var uuid = require('node-uuid');
var db = require('./db');

// Load players from disk.. eventually this could be a DB
var players = [];

db.loadPlayers(function(err, list) {
  console.log('Loaded ' + list.length + ' players');
  players = list;
});

exports.create = function(firstName, lastName, mobile) {
  var p = Object.freeze({
    id: uuid.v4(),
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    level: 1
  });
  players.push(p);
  db.savePlayers(players);
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
