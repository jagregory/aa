var routie = require('../../3rdparty/routie');

window.Admin = function() {
  
  routie({
      '':            require('./controllers/game'),
      '/game':       require('./controllers/game'),
      '/players':    require('./controllers/players'),
      '/register':   require('./controllers/register'),
  });
  
};
