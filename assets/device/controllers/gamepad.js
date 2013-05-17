var routie = require('routie');
var view = require('../views/gamepad.hbs');

module.exports = function() {
  
  var player = window.localStorage['player'];
  if (!player) {
    return routie.navigate('/lobby');
  }
  
  $('#page').attr('class', 'gamepad');
  $('#page').addClass(player);
  
  $('#page').html(view());
  
  $('#exit').on('click', function(e) {
    e.preventDefault();
    routie.navigate('/thanks');
  });
  
};
