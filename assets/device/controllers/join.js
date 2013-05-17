var routie = require('routie');
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
