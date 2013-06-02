var routie = require('../../3rdparty/routie');

window.Admin = function() {
  
  routie({
      '':            require('./controllers/register'),
      '/register':   require('./controllers/register'),
      '/players':    require('./controllers/players'),
      '/game':       require('./controllers/game'),
  });
  
};
