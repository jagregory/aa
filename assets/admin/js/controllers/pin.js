var routie  = require('../../../3rdparty/routie');
var view    = require('../../views/pin.hbs');

module.exports = function(pin) {
  
  $('#page').html(view({pin: pin}));
  $('#pin button').on('click', backToRegister);
  
};

function backToRegister(res) {
  routie.navigate('/register');
}
