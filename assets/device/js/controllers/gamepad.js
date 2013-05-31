var routie = require('../../../3rdparty/routie');
var player = require('../player');
var view = require('../../views/gamepad.hbs');

module.exports = function() {

  if (player.get().id == undefined) {
    routie.navigate('/register');
  }
  
  $('#page').attr('class', 'gamepad');
  
  $('#page').html(view({
    index: player.get().pos || 1
  }));

  if ('ontouchstart' in window) {
    $('button.up').on('touchstart', goUp);
    $('button.up').on('touchend', stop);
    $('button.down').on('touchstart', goDown);
    $('button.down').on('touchend', stop);
  } else {
    $('button.up').on('mousedown', goUp);
    $('button.up').on('mouseup', stop);
    $('button.down').on('mousedown', goDown);
    $('button.down').on('mouseup', stop);
  }
  
};

function goUp(e) {
  e.preventDefault();
  sendAction('up');
}

function goDown(e) {
  e.preventDefault();
  sendAction('down');
}

function stop(e) {
  e.preventDefault();
  sendAction('stop');
}

function sendAction(actionName) {
  $.ajax({
    type: 'POST',
    url: '/game/' + player.get().id,
    data: JSON.stringify({action: actionName}),
    contentType: 'application/json'
  });
}

