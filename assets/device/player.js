var _ = require('underscore');
var player = {};

exports.load = function() {
  player = JSON.parse(window.localStorage['player'] || '{}');
};

exports.save = function(attrs) {
  player = _.extend(player, attrs);
  window.localStorage = JSON.stringify(player)
};

exports.get = function() {
  return player;
};
