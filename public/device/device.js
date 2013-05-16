
window.Pong = {}
window.Pong.Device = {};

Pong.Device = function() {
  
  routie({
      '/':         Pong.Device.Register,
      '/register': Pong.Device.Register,
      '/wait':     Pong.Device.Wait,
      '/join':     Pong.Device.Join,
      '/gamepad':  Pong.Device.Gamepad,
      '/thanks':   Pong.Device.Thanks,
  });
  
};

Pong.Device.Register = function() {
  var source   = $("#tmpl-register").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
};

Pong.Device.Wait = function() {
  var source   = $("#tmpl-wait").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
};

Pong.Device.Join = function() {
  var source   = $("#tmpl-join").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
};

Pong.Device.Gamepad = function() {
  var source   = $("#tmpl-gamepad").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
};

Pong.Device.Thanks = function() {
  var source   = $("#tmpl-thanks").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
};
