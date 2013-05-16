var routie = require('../../3rdparty/routie.min');

module.exports = function() {
  
  var source   = $("#tmpl-gamepad").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
  $('#exit').on('click', function() {
    routie.navigate('/thanks');
  });
  
};
