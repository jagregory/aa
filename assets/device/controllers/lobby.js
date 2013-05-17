var rx = require('rxjs');
var routie = require('routie');
var view = require('../views/lobby.hbs');
require('../../3rdparty/rx.zepto');

module.exports = function() {
  
  $('#page').attr('class', 'lobby');
  $('#page').html(view());

  var observable = rx.Observable
    .interval(5000)
    .select(observableLobby)
    .switchLatest()
    .where(canJoin)
    .subscribe(switchState);

};

function observableLobby() {
  return $.getJSONAsObservable('/lobby');
}

function canJoin(res) {
  return res.data.canJoin;
}

function switchState() {
  routie.navigate('/join');
}
