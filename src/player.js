var _ = require('underscore');
var uuid = require('node-uuid');
var db = require('./db');

// Load players from disk.. eventually this could be a DB
var players = [];

db.loadPlayers(function(err, list) {
  console.log('Loaded ' + list.length + ' players');
  players = list;
});

exports.create = function(fields) {
  var p = _.extend(fields, {
    id: uuid.v4(),
    pin: randomPin(),  
    topScore: 0
  });
  players.push(p);
  db.savePlayers(players);
  return p;
};

exports.saveAll = function() {
  db.savePlayers(players)
}

exports.withId = function(id) {
  return _.findWhere(players, {id: id});
};

exports.withPin = function(pin) {
  return _.findWhere(players, {pin: pin});
};

exports.all = function() {
  return players;
};

exports.delete = function(player) {
  players = _.reject(players, function(p) { return p.id === player.id; });
};

function randomPin() {
  return ('0000' + Math.floor(Math.random() * 1000)).substr(-4);
}

exports.randomPin = randomPin