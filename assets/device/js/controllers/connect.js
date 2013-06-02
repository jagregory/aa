var routie = require('../../../3rdparty/routie');
var player = require('../player');
var view = require('../../views/connect.hbs');

module.exports = function() {
  
  if (player.get().id) {
    return routie.navigate('/wait');
  }
  
  $('#page').attr('class', 'connect');
  $('#page').html(view());
  
  $('#pin').on('keyup', function(e) {
    connect();
  });
  
};

function connect() {
  var pin = $('#pin').val();
  $.post('/connect/' + pin).then(go);
}

function go(data) {
  player.set({
    id: data.id,
    name: data.name
  });
  routie.navigate('/wait');
}
