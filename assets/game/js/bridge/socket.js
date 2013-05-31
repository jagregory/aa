var io = require('../../../3rdparty/socket.io.min');

exports.connect = function(matchStart, playerMove, playerStop) {

  var socket = io.connect('http://localhost:8080');
  socket.on('match-start', playerMove);
  socket.on('match-move', playerMove);

};
