
var raf =  window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           function (callback) {
             window.setTimeout(callback, 1000 / 60);
           };

var running = false;

exports.run = function(fn) {
  running = true;
  raf(function animate() {
    fn();
    if (running) {
      raf(animate);
    }
  });
};

exports.stop = function() {
  running = false;
};
