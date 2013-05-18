var _ = require('underscore');
var lobby = null;

exports.clear = function() {
  lobby = [ emptySlot(), emptySlot() ];
};

exports.isFull = function() {
  return _.every(lobby, function(p) { return p.id !== null; });
};

exports.state = function() {
  return {
    full: exports.isFull(),
    players: lobby
  };
};

exports.addPlayer = function(player) {
  if (lobby[0].id === null) {
    lobby[0] = player;
  } else if (lobby[1].id === null) {
    lobby[1] = player;
  }
};

exports.removePlayer = function(player) {
  if (lobby[0].id === player.id) {
    lobby[0] = emptySlot();
  } else if (lobby[1].id === player.id) {
    lobby[1] = emptySlot();
  }
};

function emptySlot() {
  return {id: null};
}

exports.clear();
