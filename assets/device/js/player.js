var _ = require('underscore');
var player = null;

exports.get = function() {
  if (!player) {
    load();
  }
  return player;
};

exports.set = function(attrs) {
  player = _.extend(player || {}, attrs);
  save();
};

function load() {
  player = JSON.parse(window.localStorage.getItem('player') || '{}');
}

function save() {
  window.localStorage.setItem('player', JSON.stringify(player));
}
