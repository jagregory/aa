var routie = require('routie');
var view = require('../views/join.hbs');

module.exports = function() {
  
  $('#page').attr('class', 'join');
  $('#page').html(view());
  
  var userId = window.localStorage['userId'];
  
  $('button').on('click', function(e) {
    e.preventDefault();
    $.post('/game/' + userId).then(joinGame).fail(backToLobby);
  });

  function joinGame(data) {
    window.localStorage['player'] = data.player;
    routie.navigate('/gamepad');
  }
  
  function backToLobby() {
    routie.navigate('/lobby');
  }

};
