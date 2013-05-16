var routie = require('../../3rdparty/routie.min');
var view = require('../views/thanks.hbs');

module.exports = function() {
  
  $('body').attr('id', 'thanks');
  $('#page').html(view());
  
  setTimeout(function() {
    routie.navigate('/register');
  }, 2000);
  
};
