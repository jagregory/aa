var routie  = require('../../../3rdparty/routie');
var view    = require('../../views/players.hbs');

module.exports = function() {

  $('nav li').removeClass('current');
  $('nav li.players').addClass('current');

  $('#page').on('click', '#players .delete', deletePlayer);
  $('#page').on('click', '#players .reset-score', resetScore);
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
  }).then(getPlayers).fail(function() {
    alert('Failed to delete player');
  });
  return false
}

function resetScore(e) {
  var id = $(e.currentTarget).closest('tr').attr('id')
  $.ajax({
    type: 'DELETE',
    url: '/player/' + id + '/score'
  }).then(getPlayers).fail(function() {
    alert('Falied to reset score')
  })
  return false
}
