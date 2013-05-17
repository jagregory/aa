var forever = require('forever');

var options = {
  command: 'node',
  silent: false,
  minUptime: 5000,
  spinSleepTime: 500,
  watch: true,
  watchDirectory: './src',
  watchIgnoreDotFiles: true
};

var monitor = new forever.Monitor('server.js', options);

monitor.on('watch:restart', function(info) {
    return console.error("restarting script because " + info.file + " changed");
});

monitor.on('restart', function() {
    return console.error("Forever restarting script for " + monitor.times + " time");
});

monitor.on('exit:code', function(code) {
    return console.error("Forever detected script exited with code " + code);
});

monitor.start();
forever.startServer(monitor);
