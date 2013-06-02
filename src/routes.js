var player = require('./player');
var lobby = require('./lobby');
var match = require('./match');

var matchInProgress = null;

exports.register = function(app) {

  // mobile landing page
  app.get('/', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    res.redirect('/device')
  })

  // get all players (for debugging)
  app.post('/connect/:pin', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    res.status(403).send('Invalid PIN');
  });

  // get all players (for debugging)
  app.get('/player', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    res.send(player.all());
  });

  // create a player
  app.post('/player', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = player.create(req.body);
    res.send(p);
  });

  // delete a player
  app.delete('/player/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else {
      player.delete(p);
      res.send({deleted: p.id});
    }
  });

  // get the lobby state
  app.get('/lobby', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    res.send(lobby.state());
  });

  // try to join the lobby
  app.post('/lobby/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    var p = player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else if (lobby.isFull()) {
      res.status(409).send('Lobby full');
    } else {
      lobby.addPlayer(p);
      if (lobby.isFull()) {
        matchInProgress = match.create(lobby);
      }
      res.send(lobby.state());
    }
  });

  // leave the lobby
  app.delete('/lobby/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache')

    var p = player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else {
      lobby.removePlayer(p);
      res.send(lobby.state());
    }
  });

  // send an action to the game
  app.post('/game/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache')

    console.log('POSTed')
    var p = player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else if (matchInProgress === null) {
      res.status(404).send('No match in progress');
    } else if (matchInProgress.hasPlayer(p) === false) {
      res.status(403).send('Player not in this match');
    } else {
      var action = req.body.action;
      matchInProgress.send(p, action);
      res.send({ processed: true })
    }
  });

  // forfeit the game
  app.delete('/game/:playerId', function(req, res) {
    res.header('Cache-Control', 'no-cache')
    
    var p = player.withId(req.params.playerId);
    if (!p) {
      res.status(404).send('Player unknown');
    } else if (matchInProgress === null) {
      res.status(404).send('No match in progress');
    } else if (matchInProgress.hasPlayer(p) === false) {
      res.status(403).send('Player not in this match');
    } else {
      var action = req.body.action;
      matchInProgress.forfeit(p);
      res.send({forfeit: true});
    }
  });

};
