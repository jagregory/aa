var _ = require('underscore');
var view = require('./views/player.hbs');

window.Admin = function() {
  $('#players').on('click', '.delete', deletePlayer);
  getPlayers();
};

function getPlayers() {
  $.get('/player').then(render);
}

function render(data) {
  $('#players').html(view({
    players: data
  }));
}

function deletePlayer(e) {
  var id = $(e.currentTarget).closest('tr').attr('id');
  $.ajax({
    type: 'DELETE',
    url: '/player/' + id
  }).then(getPlayers).fail(failedToDelete);
}

function failedToDelete() {
  alert('Failed to delete player');
}
