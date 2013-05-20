var config = {};

//
// CSS
//
config.stylus = {
  options: {
    compress: true
  },
  compile: {
    files: {
      'builtAssets/device/device.css':  'assets/device/css/device.styl',
      'builtAssets/admin/admin.css':    'assets/admin/admin.styl',
      'builtAssets/game/game.css':      'assets/game/game.styl'
    }
  }
};

//
// JS
//
config.browserify2 = {
  admin: {
    entry: __dirname + '/assets/admin/admin.js',
    beforeHook: function(bundle) {
      bundle.transform(require('hbsfy'));
    },
    compile: __dirname + '/builtAssets/admin/admin.js',
    debug: true
  },
  device: {
    entry: __dirname + '/assets/device/js/device.js',
    beforeHook: function(bundle) {
      bundle.transform(require('hbsfy'));
    },
    compile: __dirname + '/builtAssets/device/device.js',
    debug: true
  },
  game: {
    entry: __dirname + '/assets/game/gameview.js',
    beforeHook: function(bundle) {
      bundle.transform(require('hbsfy'));
    },
    compile: __dirname + '/builtAssets/game/gameview.js',
    debug: true
  }
};

//
// Static files
//
config.copy = {
  main: {
    files: [
      { expand: true, cwd: 'files/', src: ['**'], dest: 'builtAssets/' }
    ]
  }
};

//
// Reload when files change
//
config.watch = {
  js: {
    files: ['assets/**/*.js', 'assets/**/*.hbs'],
    tasks: ['browserify2:admin', 'browserify2:device', 'browserify2:game']
  },
  css: {
    files: ['assets/**/*.styl'],
    tasks: ['stylus']
  },
  files: {
    files: ['files/**/*'],
    tasks: ['copy']
  },
  tests: {
    files: ['test/**/*', 'src/**/*'],
    tasks: ['simplemocha']
  }
};

//
// Unit tests
//

config.simplemocha = {
  options: {
    globals: ['should', 'sinon'],
    require: ['test/spec-helper.js'],
    timeout: 3000,
    ignoreLeaks: true,
    ui: 'bdd',
    reporter: 'spec'
  },
  all: { src: ['test/**/*.js'] }
};

module.exports = function(grunt) {
  
  config.pkg = grunt.file.readJSON('package.json');
  grunt.initConfig(config);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['stylus', 'browserify2:admin', 'browserify2:device', 'browserify2:game', 'copy']);
  grunt.registerTask('test',    ['simplemocha']);

};
