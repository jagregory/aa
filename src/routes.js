var game = require('./game');

exports.register = function(app) {

  app.get('/', function(req, res) {
    res.redirect('/device')
  })

  app.post('/register', function(req, res) {
    res.send({
      userId: game.newPlayerId()
    });
  });

  app.get('/lobby', function(req, res) {
    res.send({
      canJoin: game.needsPlayer()
    });
  });
  
  app.post('/game/:userId', function(req, res) {
    var id = req.param.userId;
    if (game.needsPlayer()) {
      res.send({
        player: game.addPlayer(id)
      });
    } else {
      res.status(409).send('Game full');
    }
  });
  
  app.put('/game/:userId', function(req, res) {
    var id = req.param.userId;
    if (game.hasPlayerWithId(id)) {
      res.send({
        processed: true
      });
    } else {
      res.status(404).send('User ' + id + ' not in the game');
    }
  });
  
  app.delete('/game/:userId', function(req, res) {
    var id = req.param.userId;
    if (game.hasPlayerWithId(id)) {
      res.send({
        leftGame: true
      });
    } else {
      res.status(404).send('User ' + id + ' not in the game');
    }
  });

};
