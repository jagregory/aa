var _ = require('underscore');
var view = require('./views/player.hbs');

window.Admin = function() {
  $.get('/player').then(render);
};

function render(data) {
  $('#players').html(view({
    players: data
  }));
}
