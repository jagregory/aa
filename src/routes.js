
exports.register = function(app) {

  app.get('/', function(req, res) {
    res.redirect('/device')
  })

  app.post('/register', function(req, res) {
    res.send({
      userId: 123
    });
  });

  app.get('/lobby', function(req, res) {
    res.send({
      canJoin: Math.random() > 0.6
    });
  });
  
  app.post('/game/:userId', function(req, res) {
    // if the spot is still free, HTTP 200
    // otherwise HTTP 409 conflict
    res.send({
      joined: true
    });
  });
  
  app.put('/game/:userId', function(req, res) {
    // req.body.action = UP / DOWN
    res.send({
      ok: true
    });
  });
  
  app.delete('/game/:userId', function(req, res) {
    res.send({
      left: true
    });
  });

};
