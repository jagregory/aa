var hub = require('./hub');

function Sound() {
  
  function play(file) {
    var sound = new Audio();
    sound.setAttribute('src', file);
    sound.play();
  };
 
  hub.on('sound:play', play);
  
}

module.exports = Sound;
