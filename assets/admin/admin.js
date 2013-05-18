var _ = require('underscore');
var viewPlayers = require('./views/players.hbs');
var viewLobby   = require('./views/lobby.hbs');

window.Admin = function() {
  $('#players').on('click', '.delete', deletePlayer);
  getPlayers();
  getLobby();
  setInterval(getLobby, 5000);
};

function getPlayers() {
  $.get('/player').then(renderPlayers);
}

function getLobby() {
  $.get('/lobby').then(renderLobby);
}

function renderPlayers(data) {
  $('#players').html(viewPlayers({players: data}));
}

function renderLobby(data) {
  $('#lobby').html(viewLobby(data));
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
