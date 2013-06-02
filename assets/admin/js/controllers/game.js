var routie = require('../../../3rdparty/routie');
var viewLobby = require('../../views/lobby.hbs');
var viewMatch = require('../../views/match.hbs');

module.exports = function() {
  
  $('nav li').removeClass('current');
  $('nav li.game').addClass('current');
  
  getLobby();
  //setInterval(getLobby, 5000);

};

function getLobby() {
  $.get('/lobby').then(renderLobby);
}

function renderLobby(data) {
  $('#page').html('');
  $('#page').append(viewMatch());
  $('#page').append(viewLobby(data));
}
