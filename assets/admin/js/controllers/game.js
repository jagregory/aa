var routie      = require('../../../3rdparty/routie');
var viewGame    = require('../../views/game.hbs');
var viewCurrent = require('../../views/game-current.hbs');
var viewLobby   = require('../../views/game-lobby.hbs');

module.exports = function() {
  
  $('nav li').removeClass('current');
  $('nav li.game').addClass('current');
  
  $('#page').html(viewGame());
  getLobby();

};

function getLobby() {
  $.get('/lobby').then(renderLobby);
}

function renderLobby(data) {
  $('#current').html(viewCurrent());
  $('#lobby').html(viewLobby(data));
}
