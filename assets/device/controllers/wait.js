var routie = require('../../3rdparty/routie.min');
var view = require('../views/wait.hbs');

module.exports = function() {
  
  $('#page').attr('class', 'wait');
  $('#page').html(view());
  
  setTimeout(function() {
    routie.navigate('/join');
  }, 2000);

};
