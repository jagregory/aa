var routie = require('routie');
var player = require('../player');
var view = require('../views/register.hbs');

module.exports = function() {
  
  if (player.get().id) {
    return routie.navigate('/wait');
  }
  
  $('#page').attr('class', 'register');
  $('#page').html(view());
  
  $('button').on('click', function(e) {
    e.preventDefault();
    register();
  });
  
};

function register() {
  if (isValid()) {
    var p = {
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      mobile: $("#mobile").val()
    };
    $.post('/player', p).then(go);
  } else {
    window.alert('Please fill out the form');
  }
}

function isValid() {
  return $('form').get(0).checkValidity();
}

function go(data) {
  player.set({
    id: data.id,
    name: data.name
  });
  routie.navigate('/lobby');
}
