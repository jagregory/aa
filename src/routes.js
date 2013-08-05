var Player  = require('./player');
var game    = require('./game');
var _       = require('underscore');

exports.register = function(app) {

  // mobile landing page
  app.get('/', function(req, res) {
    res.header('Cache-Control', 'no-cache');
    res.redirect('/device')
  })

  // get all players (for leaderboard)
  app.get('/player', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    res.send(Player.all());
  });

  // create a player
  app.post('/player', function(req, res) {
    res.header('Cache-Control', 'no-cache');
    var p = Player.create(req.body);
    res.send(p);
  });

  // delete a player
  app.delete('/player/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache');
    var p = Player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else {
      Player.delete(p);
      Player.saveAll();
      res.send({deleted: p.id});
    }
  });

  // reset a player's score
  app.delete('/player/:playerId/score', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = Player.withId(req.params.playerId)
    if (p) {
      p.topScore = 0;
      Player.saveAll();
    }
    res.send()
  })

  // get the game state
  app.get('/game/status', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    res.send({
      inProgress: game.inProgress(),
      players: game.getPlayers()
    });
  });

  // finish the game (sent by the game itself)
  app.post('/game/status', function(req, res) {
    var players = req.body.players

    req.body.players.forEach(function(player) {
      var gamePlayer = Player.withId(player.id)

      if (gamePlayer) {
        gamePlayer.topScore += parseInt(player.score)
      }
    })

    Player.saveAll()

    game.clear();

    res.header('Cache-Control', 'no-cache')
    res.send({
      finished: game.inProgress(),
      players: game.getPlayers()
    });
  });

  // try to join the game
  app.post('/game/players', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = Player.withId(req.body.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else if (game.inProgress()) {
      res.status(409).send('Game in progress');
    } else {
      game.addPlayer(p);
      res.send({
        inProgress: game.inProgress()
      });
    }
  });

  // leave the game
  app.delete('/game/players/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = Player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else {
      game.removePlayer(p);
      res.send({
        players: game.getPlayers()
      });
    }
  });

  // send an action to the game
  app.post('/game/players/:playerId/:action', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = Player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else if (game.inProgress() === false) {
      res.status(404).send('No game in progress');
    } else if (game.hasPlayer(p) === false) {
      res.status(403).send('Player not in the current game');
    } else {
      game.send(p, req.params.action);
      res.send()
    }
  });

};
