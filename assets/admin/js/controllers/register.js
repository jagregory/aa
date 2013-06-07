var routie  = require('../../../3rdparty/routie');
var view    = require('../../views/register.hbs');

module.exports = function() {

  $('nav li').removeClass('current');
  $('nav li.register').addClass('current');

  $('#page').html(view());
  $('#register button').on('click', register);
  
};

function register(e) {
  var data = {
    firstName:    $('#firstName').val(),
    lastName:     $('#lastName').val(),
    phoneNumber:  $('#phoneNumber').val(),
    company:      $('#company').val(),
    role:         $('#role').val()
  };
  $.post('/player', data).then(displayPin).fail(error);
}

function displayPin(res) {
  routie.navigate('/pin/' + res.pin);
}

function error(res) {
  alert('Error: ' + res);
}