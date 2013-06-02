var routie = require('../../../3rdparty/routie');
var view = require('../../views/players.hbs');

module.exports = function() {

  $('#page').on('click', '#players .delete', deletePlayer);
  getPlayers();
  
};

function getPlayers() {
  $.get('/player').then(renderPlayers);
}

function renderPlayers(data) {
  $('#page').html(view({players: data}));
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
