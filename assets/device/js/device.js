var routie = require('../../3rdparty/routie');
var tappable = require('../../3rdparty/tappable');

window.Pong = {}
Pong.Device = function() {
  
  routie({
      '':            require('./controllers/connect'),
      '/connect':    require('./controllers/connect'),
      '/wait':       require('./controllers/wait'),
      '/join':       require('./controllers/join'),
      '/lobby':      require('./controllers/lobby'),
      '/gamepad':    require('./controllers/gamepad'),
      '/thanks':     require('./controllers/thanks')
  });
  
};
