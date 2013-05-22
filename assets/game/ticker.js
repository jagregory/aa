
var raf =  window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           function (callback) {
             window.setTimeout(callback, 1000 / 60);
           };

exports.run = function(fn) {
  raf(function animate() {
    fn();
    raf(animate);
  });
};
