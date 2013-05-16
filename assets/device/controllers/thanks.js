var routie = require('../../3rdparty/routie.min');

module.exports = function() {
  
  var source   = $("#tmpl-thanks").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
  setTimeout(function() {
    routie.navigate('/');
  }, 2000);
  
};
