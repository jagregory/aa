
function Time() {
  this.delta = 1;
  this.lastTime = new Date();
  this.frames = 0;
}

Time.prototype.update = function() {
  this.frames++;
  var time = Date.now();
  this.frames = 0;
    
  var currentTime = time;
  var passedTime = currentTime - this.lastTime;
  
  this.delta = passedTime;
  this.lastTime = currentTime;

  return this.delta;
};

module.exports = Time;
