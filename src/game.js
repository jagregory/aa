var _       = require('underscore');
var bridge  = require('./bridge');
var players = null;

exports.clear = function() {
  players = [ emptySlot(), emptySlot() ];
};

exports.getPlayers = function() {
  return players;
};

exports.addPlayer = function(p) {
  if (exports.hasPlayer(p)) {
    return;
  } else if (players[0].id === null) {
    players[0] = p;
  } else if (players[1].id === null) {
    players[1] = p;
  }
  if (exports.inProgress()) {
    bridge.send('match-start', players);
  }
};

exports.removePlayer = function(p) {
  if (players[0].id === p.id) {
    players[0] = emptySlot();
  } else if (players[1].id === p.id) {
    players[1] = emptySlot();
  }
};

exports.hasPlayer = function(player) {
  return players[0].id != null
      && players[1].id != null;
}

exports.inProgress = function() {
  return _.every(players, function(p) { return p.id !== null; });
};

exports.send = function(player, action) {
  var idx = indexOf(player.id);
  if (idx != null) {
    bridge.send('player-action', {pindex: idx, action: action});
  }
}

function emptySlot() {
  return {id: null};
}

function indexOf(id) {
  if (players[0].id === id) { return 0; }
  if (players[1].id === id) { return 1; }
  return null;
}

exports.clear();
