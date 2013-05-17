var routie = require('../../3rdparty/routie.min');
var view = require('../views/join.hbs');

module.exports = function() {
  
  $('#page').attr('class', 'join');
  $('#page').html(view());
  
  var userId = window.localStorage['userId'];
  
  $('button').on('click', function() {
    routie.navigate('/gamepad');
    return false;
  });
  
};
