var routie = require('../../3rdparty/routie.min');
var view = require('../views/thanks.hbs');

module.exports = function() {
  
  $('#page').html(view());
  setTimeout(function() {
    routie.navigate('/');
  }, 2000);
  
};
