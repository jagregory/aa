var routie = require('../../3rdparty/routie');

window.Admin = function() {
  
  routie({
      '':            require('./controllers/players'),
      '/players':    require('./controllers/players'),
      '/game':       require('./controllers/game'),
  });
  
};
