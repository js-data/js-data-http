/*
 * js-data-http
 * http://github.com/js-data/js-data-http
 *
 * Copyright (c) 2014 Jason Dobry <http://www.js-data.io/js-data-http>
 * Licensed under the MIT license. <https://github.com/js-data/js-data-http/blob/master/LICENSE>
 */
module.exports = function (grunt) {
  'use strict';

  require('jit-grunt')(grunt, {
    coveralls: 'grunt-karma-coveralls'
  });
  require('time-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    clean: {
      coverage: ['coverage/'],
      dist: ['dist/']
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/*.js'],
      jshintrc: '.jshintrc'
    },
    watch: {
      dist: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    },
    uglify: {
      main: {
        options: {
          report: 'min',
          sourceMap: true,
          sourceMapName: 'dist/js-data-http.min.map',
          banner: '/**\n' +
          '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
          '* @file js-data-http.min.js\n' +
          '* @version <%= pkg.version %> - Homepage <http://www.js-data.io/docs/dshttpadapter>\n' +
          '* @copyright (c) 2014 Jason Dobry\n' +
          '* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
          '*\n' +
          '* @overview My Adapter.\n' +
          '*/\n'
        },
        files: {
          'dist/js-data-http.min.js': ['dist/js-data-http.js']
        }
      }
    },
    browserify: {
      options: {
        browserifyOptions: {
          standalone: 'DSHttpAdapter'
        },
        external: ['js-data']
      },
      dist: {
        files: {
          'dist/js-data-http.js': ['src/index.js']
        }
      }
    },
    karma: {
      options: {
        configFile: './karma.conf.js'
      },
      dev: {
        browsers: ['Chrome'],
        autoWatch: true,
        singleRun: false,
        reporters: ['spec'],
        preprocessors: {}
      },
      min: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        options: {
          files: [
            'bower_components/js-data/dist/js-data.min.js',
            'dist/js-data-http.min.js',
            'karma.start.js',
            'test/**/*.js'
          ]
        }
      },
      ci: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS']
      }
    },
    coveralls: {
      options: {
        coverage_dir: 'coverage'
      }
    }
  });

  grunt.registerTask('version', function (filePath) {
    var file = grunt.file.read(filePath);

    file = file.replace(/<%= pkg\.version %>/gi, pkg.version);

    grunt.file.write(filePath, file);
  });

  grunt.registerTask('banner', function () {
    var file = grunt.file.read('dist/js-data-http.js');

    var banner = '/**\n' +
      '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
      '* @file js-data-http.js\n' +
      '* @version ' + pkg.version + ' - Homepage <http://www.js-data.io/docs/dshttpadapter>\n' +
      '* @copyright (c) 2014 Jason Dobry \n' +
      '* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
      '*\n' +
      '* @overview My Adapter.\n' +
      '*/\n';

    file = banner + file;

    grunt.file.write('dist/js-data-http.js', file);
  });

  grunt.registerTask('test', ['build', 'karma:ci', 'karma:min']);
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'browserify',
    'banner',
    'uglify:main'
  ]);
  grunt.registerTask('go', ['build', 'watch:dist']);
  grunt.registerTask('default', ['build']);
};
