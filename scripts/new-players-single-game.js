var async = require('async');
var superagent = require('superagent');
var faker = require('Faker');

function createPlayer(next) {
  var player = {
    firstName:  faker.Name.firstName(),
    lastName: faker.Name.lastName(),
    mobile: faker.Helpers.replaceSymbolWithNumber('04## ### ###')
  };
  console.log('Creating player ' + player.firstName);
  superagent.post('http://localhost:8080/player').send(player).end(function(err, res) {
    next(err, res);
  });
}

function joinLobby(player) {
  return function(next) {
    console.log(player.firstName + ' joining lobby');
    superagent.post('http://localhost:8080/lobby/' + player.id).end(function(err, res) {
      next(err, res);
    });
  };
}

function movePlayer(player, next) {
  var action = (Math.random() > 0.5) ? 'up' : 'down';
  console.log(player.firstName + ' moving ' + action);
  superagent.post('http://localhost:8080/game/' + player.id).send({action: action}).end();
}

async.series([createPlayer, createPlayer], function(err, res) {
  var p1 = res[0].body;
  var p2 = res[1].body;
  async.series([joinLobby(p1), joinLobby(p2)], function(err, res) {
    setInterval(function() {
      movePlayer(p1);
      movePlayer(p2);
    }, 1000);
  });
});
