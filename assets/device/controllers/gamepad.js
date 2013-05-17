var routie = require('routie');
var view = require('../views/gamepad.hbs');

module.exports = function() {
  
  $('#page').attr('class', 'gamepad p1');
  $('#page').html(view());
  
  $('#exit').on('click', function() {
    routie.navigate('/thanks');
    return false;
  });
  
};
