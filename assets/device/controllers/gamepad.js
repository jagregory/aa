var routie = require('routie');
var player = require('../player');
var view = require('../views/gamepad.hbs');

module.exports = function() {

  if (player.get().pos == undefined) {
    routie.navigate('/lobby');
  }
  
  $('#page').attr('class', 'gamepad');
  $('#page').addClass('p' + player.get().pos);
  
  $('#page').html(view());
  
  $('#up').on('click', goUp);
  $('#down').on('click', goDown);
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

function sendAction(actionName) {
  $.ajax({
    type: 'PUT',
    url: '/game/' + player.get().id,
    data: JSON.stringify({action: actionName}),
    contentType: 'application/json'
  });
}

function forfeit(e) {
  e.preventDefault();
  routie.navigate('/thanks');
}
