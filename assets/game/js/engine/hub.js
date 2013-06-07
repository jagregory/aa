var eve = require('../../../3rdparty/eve');

exports.interceptor = function(fn) { fn(); };

exports.send = function(message, args) {
  eve(message, null, args);
};

exports.on = function(message, callback) {
  eve.on(message, function() {
    var args = arguments;
    exports.interceptor(function() {
      callback.apply(this, args)
    });
  });
};

exports.unbindAll = function() {
  eve.off();
};
