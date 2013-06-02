var routie  = require('../../../3rdparty/routie');
var view    = require('../../views/game.hbs');

module.exports = function() {
  
  $('nav li').removeClass('current');
  $('nav li.game').addClass('current');
  
  getGameState();

};

function getGameState() {
  $.get('/game/status').then(renderGame);
}

function renderGame(data) {
  var matchPlayers = [{}, {}];
  $('#page').html(view(data));
  $('.evict').click(evict);
}

function evict(e) {
  var id = $(e.currentTarget).closest('tr').attr('id');
  $.ajax({
    type: 'DELETE',
    url: '/game/players/' + id
  }).then(renderGame).fail(failedToEvict);
}

function failedToEvict() {
  alert('Failed to evict player');
}
