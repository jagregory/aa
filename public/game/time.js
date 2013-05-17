Time = function() {
  this.delta = 1
  this.lastTime = new Date()
  this.frames = 0
}

Time.prototype.update = function() {
  this.frames++
  var time = Date.now()
  this.frames = 0
    
  var currentTime = time
  var passedTime = currentTime - this.lastTime
  
  this.delta = passedTime * 0.06
  
  if (this.delta > 2.3) {
    this.delta = 2.3
  }
  
  this.lastTime = currentTime

  return this.delta
}