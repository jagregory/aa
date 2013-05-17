var routie = require('routie');
var player = require('../player');
var view = require('../views/gamepad.hbs');

module.exports = function() {

  if (player.get().pos == undefined) {
    routie.navigate('/lobby');
  }
  
  $('#page').attr('class', 'gamepad');
  $('#page').addClass('p' + player.get().pos);
  
  $('#page').html(view());
  
  $('#exit').on('click', function(e) {
    e.preventDefault();
    routie.navigate('/thanks');
  });
  
};
