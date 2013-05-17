var routie = require('../../3rdparty/routie.min');
var view = require('../views/thanks.hbs');

module.exports = function() {
  
  $('#page').attr('class', 'thanks');
  $('#page').html(view());
  
  setTimeout(function() {
    routie.navigate('/register');
  }, 4000);
  
};
