var routie = require('../../3rdparty/routie.min');
var view = require('../views/register.hbs');

module.exports = function() {
  
  $('#page').attr('class', 'register');
  $('#page').html(view());
  
  $('button').on('click', function(e) {
    e.preventDefault();
    register();
  });

  function register() {
    if ($('form').get(0).checkValidity()) {
      routie.navigate('/wait');
    } else {
      window.alert('Please fill out the form');
    }
  }
  
};
