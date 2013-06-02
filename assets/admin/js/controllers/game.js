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
}
