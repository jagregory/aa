var _ = require('underscore');
var view = require('./views/player.hbs');

window.Admin = function() {
  
  var players = [
    { id: '1', firstName: 'John', lastName: 'Doe', mobile: '0412345678', level: 3 },
    { id: '1', firstName: 'John', lastName: 'Doe', mobile: '0412345678', level: 3 },
    { id: '1', firstName: 'John', lastName: 'Doe', mobile: '0412345678', level: 3 },
    { id: '1', firstName: 'John', lastName: 'Doe', mobile: '0412345678', level: 3 },
    { id: '1', firstName: 'John', lastName: 'Doe', mobile: '0412345678', level: 3 }
  ];
  $('#players').html(view({
    players: players
  }));
  
};
