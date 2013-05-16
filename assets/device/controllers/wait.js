var routie = require('../../3rdparty/routie.min');

module.exports = function() {
  
  var source   = $("#tmpl-wait").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
  setTimeout(function() {
    routie.navigate('/join');
  }, 2000);

};
