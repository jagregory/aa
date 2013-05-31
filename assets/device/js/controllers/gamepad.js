var routie = require('../../../3rdparty/routie');
var player = require('../player');
var view = require('../../views/gamepad.hbs');

module.exports = function() {

  if (player.get().id == undefined) {
    routie.navigate('/register');
  }
  
  $('#page').attr('class', 'gamepad');
  $('#page').addClass('p' + player.get().pos);
  
  $('#page').html(view());

  if ('ontouchstart' in window) {
    $('#up').on('touchstart', goUp);
    $('#up').on('touchend', stop);
    $('#down').on('touchstart', goDown);
    $('#down').on('touchend', stop);
  } else {
    $('#up').on('mousedown', goUp);
    $('#up').on('mouseup', stop);
    $('#down').on('mousedown', goDown);
    $('#down').on('mouseup', stop);
  }

  $('#exit').on('click', forfeit);
  
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

function forfeit(e) {
  e.preventDefault();
  routie.navigate('/thanks');
}
