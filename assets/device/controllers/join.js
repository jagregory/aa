var routie = require('routie');
var player = require('../player');
var view = require('../views/join.hbs');

module.exports = function() {
  
  if (player.get().id == undefined) {
    routie.navigate('/register');
  }
  
  $('#page').attr('class', 'join');
  $('#page').html(view());
  
  $('button').on('click', function(e) {
    e.preventDefault();
    $.post('/game/' + player.get().id).then(joinGame).fail(backToLobby);
  });

  function joinGame(data) {
    player.set({pos: data.pos});
    routie.navigate('/gamepad');
  }
  
  function backToLobby() {
    routie.navigate('/lobby');
  }

};
