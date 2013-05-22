var io = require('../../../3rdparty/socket.io.min');

exports.connect = function(matchStart, matchMove) {

  var socket = io.connect('http://localhost:8080');
  socket.on('match-start', matchStart);
  socket.on('match-move', matchMove);

};
