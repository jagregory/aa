var routie = require('../../3rdparty/routie.min');
var view = require('../views/join.hbs');

module.exports = function() {
  
  $('body').attr('id', 'join');
  $('#page').html(view());
  $('#join').on('click', function() {
    routie.navigate('/gamepad');
  });
  
};
