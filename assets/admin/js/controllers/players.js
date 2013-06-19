var routie  = require('../../../3rdparty/routie');
var view    = require('../../views/players.hbs');

module.exports = function() {

  $('nav li').removeClass('current');
  $('nav li.players').addClass('current');

  $('#page').on('click', '#players .delete', deletePlayer);
  $('#page').on('click', '#players .new-pin', newPin);
  getPlayers();
  
};

function getPlayers() {
  $.get('/player').then(renderPlayers);
}

function renderPlayers(data) {
  $('#page').html(view({players: data}));
  $('#page table').dataTable({bLengthChange: false});
}

function deletePlayer(e) {
  var id = $(e.currentTarget).closest('tr').attr('id');
  $.ajax({
    type: 'DELETE',
    url: '/player/' + id
  }).then(getPlayers).fail(failedToDelete);
}

function newPin(e) {
  var id = $(e.currentTarget).closest('tr').attr('id')
  $.ajax({
    type: 'PUT',
    url: '/player/' + id
  }).then(getPlayers).fail(failedToCreateNewPin)
}

function failedToDelete() {
  alert('Failed to delete player');
}

function failedToCreateNewPin() {
  alert('Failed to create new pin');
}
