
function Sound() {
  
  this.play = function(file) {
    var sound = new Audio();
    sound.setAttribute('src', file);
    sound.play();
  };
  
}

module.exports = Sound;
