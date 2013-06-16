var io = require('../../3rdparty/socket.io.min');

exports.connect = function(matchStart, playerMove) {

  var socket = io.connect('http://localhost:8080');

  socket.emit('identify')
  socket.on('match-start', matchStart);
  socket.on('player-action', playerAction);
  
  function playerAction(args) {
    if (args.action === 'up') {
      console.log('[socket] move '  + args.pindex + ' up');
      playerMove({pindex: args.pindex, dir: 'up'});
    } else if (args.action === 'down') {
      console.log('[socket] move '  + args.pindex + ' down');
      playerMove({pindex: args.pindex, dir: 'down'});
    }
  }

};
