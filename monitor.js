var forever = require('forever');

var options = {
  command: 'node',
  silent: false,
  minUptime: 5000,
  spinSleepTime: 500
};

var monitor = new forever.Monitor('server.js', options);

monitor.on('restart', function() {
    return console.error("Forever restarting script for " + monitor.times + " time");
});

monitor.on('exit:code', function(code) {
    return console.error("Forever detected script exited with code " + code);
});

monitor.start();
forever.startServer(monitor);
