/*
 * js-data-http
 * http://github.com/js-data/js-data-http
 *
 * Copyright (c) 2014-2015 Jason Dobry <http://www.js-data.io/js-data-http>
 * Licensed under the MIT license. <https://github.com/js-data/js-data-http/blob/master/LICENSE>
 */
module.exports = function (grunt) {
  'use strict';

  require('jit-grunt')(grunt, {
    coveralls: 'grunt-karma-coveralls'
  });
  require('time-grunt')(grunt);

  var webpack = require('webpack');
  var pkg = grunt.file.readJSON('package.json');
  var banner = 'js-data-http\n' +
    '@version ' + pkg.version + ' - Homepage <http://www.js-data.io/docs/dshttpadapter>\n' +
    '@author Jason Dobry <jason.dobry@gmail.com>\n' +
    '@copyright (c) 2014-2015 Jason Dobry \n' +
    '@license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
    '\n' +
    '@overview Http adapter for js-data.';

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    clean: {
      coverage: ['coverage/'],
      dist: ['dist/']
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
          banner: '/*!\n' +
          '* js-data-http\n' +
          '* @version <%= pkg.version %> - Homepage <http://www.js-data.io/docs/dshttpadapter>\n' +
          '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
          '* @copyright (c) 2014-2015 Jason Dobry\n' +
          '* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>\n' +
          '*\n' +
          '* @overview Http adapter for js-data.\n' +
          '*/\n'
        },
        files: {
          'dist/js-data-http.min.js': ['dist/js-data-http.js']
        }
      }
    },
    webpack: {
      dist: {
        entry: './src/index.js',
        output: {
          filename: './dist/js-data-http.js',
          libraryTarget: 'umd',
          library: 'DSHttpAdapter'
        },
        externals: {
          'js-data': {
            amd: 'js-data',
            commonjs: 'js-data',
            commonjs2: 'js-data',
            root: 'JSData'
          }
        },
        module: {
          loaders: [
            { test: /(src)(.+)\.js$/, exclude: /node_modules/, loader: 'babel-loader?blacklist=useStrict' }
          ],
          preLoaders: [
            {
              test: /(src)(.+)\.js$|(test)(.+)\.js$/, // include .js files
              exclude: /node_modules/, // exclude any and all files in the node_modules folder
              loader: "jshint-loader?failOnHint=true"
            }
          ]
        },
        plugins: [
          new webpack.BannerPlugin(banner)
        ]
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
            'node_modules/es6-promise/dist/es6-promise.js',
            'node_modules/js-data/dist/js-data.js',
            'dist/js-data-http.min.js',
            'karma.start.js',
            'test/**/*.js'
          ]
        }
      },
      ci: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS']
      },
      c9: {
        browsers: ['PhantomJS']
      }
    },
    coveralls: {
      options: {
        coverage_dir: 'coverage'
      }
    }
  });

  grunt.registerTask('standard', function () {
    var child_process = require('child_process');
    var done = this.async();
    grunt.log.writeln('Linting for correcting formatting...');
    child_process.exec('node node_modules/standard/bin/cmd.js --parser babel-eslint src/*.js src/**/*.js src/**/**/*.js', function (err, stdout) {
      console.log(stdout);
      if (err) {
        grunt.log.writeln('Failed due to ' + (stdout.split('\n').length - 2) + ' lint errors!');
        done(err);
      } else {
        grunt.log.writeln('Done linting.');
        done();
      }
    });
  });

  grunt.registerTask('version', function (filePath) {
    var file = grunt.file.read(filePath);

    file = file.replace(/<%= pkg\.version %>/gi, pkg.version);

    grunt.file.write(filePath, file);
  });

  grunt.registerTask('test', ['build', 'karma:ci', 'karma:min']);
  grunt.registerTask('test_c9', ['build', 'karma:c9']);
  grunt.registerTask('build', [
    'clean',
    'standard',
    'webpack',
    'uglify:main'
  ]);
  grunt.registerTask('go', ['build', 'watch:dist']);
  grunt.registerTask('default', ['build']);
};
