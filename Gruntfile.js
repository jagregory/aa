module.exports = function(grunt) {

  function processHandlebars(bundle) {
    bundle.transform(require('hbsfy'));
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      options: {
        compress: true
      },
      compile: {
        files: {
          'builtAssets/device/device.css': 'assets/device/device.styl'
        }
      }
    },
    browserify2: {
      dev: {
        entry: __dirname + '/assets/device/device.js',
        beforeHook: processHandlebars,
        compile: __dirname + '/builtAssets/device/device.js',
        debug: true
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'assets/device/', src: ['index.html'], dest: 'builtAssets/device/' },
          { expand: true, cwd: 'files/', src: ['**'], dest: 'builtAssets/'}
        ]
      }
    },
    watch: {
      js: {
        files: ['assets/**/*.js', 'assets/**/*.hbs'],
        tasks: ['browserify2:dev'],
      },
      css: {
        files: ['assets/**/*.styl'],
        tasks: ['stylus'],
      },
      files: {
        files: ['files/**/*', 'assets/**/*.html'],
        tasks: ['copy'],
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['stylus', 'browserify2:dev', 'copy']);

};
