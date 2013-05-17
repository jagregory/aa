
var socket = null;

exports.connect = function(s) {
  socket = s;
};

exports.send = function(msg, params) {
  if (socket) {
    socket.emit(msg, params);
  } else {
    console.log('No game client connected');
  }
};
