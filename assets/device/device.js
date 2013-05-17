var routie = require('routie');

window.Pong = {}
Pong.Device = function() {
  
  routie({
      '':            require('./controllers/register'),
      '/register':   require('./controllers/register'),
      '/lobby':      require('./controllers/lobby'),
      '/join':       require('./controllers/join'),
      '/gamepad':    require('./controllers/gamepad'),
      '/thanks':     require('./controllers/thanks')
  });
  
};
