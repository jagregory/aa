var fs = require('fs');

var DB_FILE = './players.json';

exports.loadPlayers = function(callback) {
  fs.exists(DB_FILE, function(exists) {
    if (exists) {
      fs.readFile(DB_FILE, function (err, data) {
        if (err) {
          return callback(err);
        }
        callback(null, JSON.parse(data).players);
      });
    } else {
      callback(null, []);
    }
  });
};

exports.savePlayers = function(players, callback) {
  var content = JSON.stringify({players: players}, null, '\t');
  fs.writeFile(DB_FILE, content, function (err) {
    if (callback) {
      if (err) callback(err);
      else callback(null);
    }
  });
};
