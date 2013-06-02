var routie = require('../../../3rdparty/routie');
var player = require('../player');
var view = require('../../views/connect.hbs');

module.exports = function() {
  
  if (player.get().id) {
    return routie.navigate('/wait');
  }
  
  $('#page').attr('class', 'connect');
  $('#page').html(view());
  
  $('input.pin').on('keypress', function(e) {
    e.preventDefault();
    connect();
  });
  
};

function connect() {
  $.post('/player', p).then(go);
}

function go(data) {
  player.set({
    id: data.id,
    name: data.name
  });
  routie.navigate('/wait');
}
