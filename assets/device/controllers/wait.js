var rx = require('rxjs');
var routie = require('routie');
var player = require('../player');
var view = require('../views/wait.hbs');
require('../../3rdparty/rx.zepto');

module.exports = function() {
  
  if (player.get().id == undefined) {
    routie.navigate('/register');
  }
  
  $('#page').attr('class', 'wait');
  $('#page').html(view());

  var observable = rx.Observable
    .interval(3000)
    .select(observableLobby)
    .switchLatest()
    .skipWhile(gameIsFull)
    .take(1)
    .subscribe(switchState, onError);

};

function observableLobby() {
  return $.getJSONAsObservable('/lobby');
}

function gameIsFull(res) {
  return res.data.full === true;
}

function switchState() {
  routie.navigate('/join');
}

function onError() {
  console.log('Lobby not responding');
}
