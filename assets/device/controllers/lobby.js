var rx = require('rxjs');
var routie = require('routie');
var view = require('../views/lobby.hbs');
require('../../3rdparty/rx.zepto');

exports.on = function() {
  
  $('#page').attr('class', 'lobby');
  $('#page').html(view());

  var observable = rx.Observable
    .interval(5000)
    .select(observableLobby)
    .switchLatest()
    .skipWhile(gameIsFull)
    .take(1)
    .subscribe(switchState, onError);

};

exports.off = function() {
  
};

function observableLobby() {
  return $.getJSONAsObservable('/lobby');
}

function gameIsFull(res) {
  return res.data.canJoin === false;
}

function switchState() {
  routie.navigate('/join');
}

function onError() {
  console.log('Lobby not responding');
}
