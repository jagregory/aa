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
    if (isValid()) {
      $.post('/register').then(go);
    } else {
      window.alert('Please fill out the form');
    }
  }
  
  function isValid() {
    return $('form').get(0).checkValidity();
  }
  
  function go(data) {
    window.localStorage['userId'] = data.userId;
    routie.navigate('/lobby');
  }
  
};
