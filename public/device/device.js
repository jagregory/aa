
window.Pong = {}

window.Pong.Mobile = function() {
  
  var source   = $("#tmpl-register").html();
  var template = Handlebars.compile(source);
  
  $('#page').html(template());
  
};
