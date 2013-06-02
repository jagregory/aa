var routie  = require('../../../3rdparty/routie');
var view    = require('../../views/register.hbs');

module.exports = function() {

  $('nav li').removeClass('current');
  $('nav li.register').addClass('current');

  $('#page').html(view());
  
};
