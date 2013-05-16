module.exports = function() {
  
  var source   = $("#tmpl-register").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
  $('#register').on('click', function() {
    routie.navigate('/wait');
  });
  
};
