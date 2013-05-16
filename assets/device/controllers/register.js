var routie = require('../../3rdparty/routie.min');
var view = require('../views/register.hbs');

module.exports = function() {
  
  $('#page').html(view());
  $('#register').on('click', function() {
    routie.navigate('/wait');
  });
  
};
