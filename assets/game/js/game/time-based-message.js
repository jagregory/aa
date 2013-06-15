var hub = require('../engine/hub');

function TimeBasedMessage(triggerTime, message, args) {

  this.triggerTime  = triggerTime;
  this.message      = message;
  this.args         = args;
  this.triggered    = false;

}

TimeBasedMessage.prototype.update = function(time) {
  if (this.triggered === false && time <= this.triggerTime) {
    hub.send(this.message, this.args);
    this.triggered = true;
  }
};

module.exports = TimeBasedMessage;
