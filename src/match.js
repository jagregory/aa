var _ = require('underscore');
var bridge = require('./bridge');

var actions = {
  up:   { vector: {x: 0, y: -10} },
  down: { vector: {x: 0, y: +10} }
}

exports.create = function(lobby) {
  
  var match = {};
  var players = lobby.state().players;
  
  bridge.send('match-start', players);
  
  match.hasPlayer = function(playerId) {
    return indexOf(playerId) != null;
  }
  
  match.send = function(playerId, action) {
    var idx = indexOf(playerId);
    if (idx) {
      var param = _.extend(actions[action], {pindex: idx});
      bridge.send('match-move', param);
    }
  }
  
  match.forfeit = function(playerId) {
    var idx = indexOf(playerId);
    if (idx) {
      bridge.send('match-forfeit', {pindex: idx});
    }
  }
  
  function indexOf(id) {
    if (players[0].id === id) { return 0; }
    if (players[1].id === id) { return 1; }
    return null;
  }
  
  return match;
  
};
