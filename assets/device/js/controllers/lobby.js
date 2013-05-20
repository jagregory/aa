var rx = require('rxjs');
var routie = require('../../../3rdparty/routie');
var player = require('../player');
var view = require('../../views/lobby.hbs');
require('../../../3rdparty/rx.zepto');

module.exports = function() {
  
  if (player.get().id == undefined) {
    routie.navigate('/register');
  }
  
  $('#page').attr('class', 'lobby');
  $('#page').html(view());
  $('#cancel').on('click', exitLobby);

  var observable = rx.Observable
    .interval(1000)
    .startWith(-1)
    .selectMany(observableLobby)
    .skipWhile(playerIsMissing)
    .take(1)
    .subscribe(startMatch, onError);

};

function observableLobby() {
  return $.getJSONAsObservable('/lobby');
}

function playerIsMissing(res) {
  return res.data.full === false;
}

function startMatch() {
  routie.navigate('/gamepad');
}

function onError() {
  console.log('Lobby not responding');
}

function exitLobby() {
  $.ajax({
    type: 'DELETE',
    url: '/lobby/' + player.get().id
  }).then(backToWait);
}

function backToWait() {
  routie.navigate('/wait');
}
