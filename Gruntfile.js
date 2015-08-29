'use strict';

var webpackDistConfig = require('./webpack.dist.config.js'),
  webpackDevConfig = require('./webpack.config.js'),
  mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt)

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/'
      },

      start: {
        keepAlive: true
      }
    },

    connect: {
      options: {
        port: 8000
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: [ '<%= pkg.src %>/*' ],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: [ '<%= pkg.src %>/images/*' ],
            dest: '<%= pkg.dist %>/images/'
          }
        ]
      }
    },

    clean: {
      dist: {
        files: [ {
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        } ]
      }
    },
    shell: {
      deploy: {
        command: 'scp -r ./dist/* deployer@single.dog:~/apps/husky'
      },
      // FIXME: try a better way to do this
      replace: {
        command: 'node ./scripts/replace-bundle-hash.js'
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run([ 'build', 'connect:dist' ]);
    }

    grunt.task.run([
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('build', [ 'clean', 'copy', 'webpack', 'shell:replace' ]);
  grunt.registerTask('deploy', [ 'build', 'shell:deploy' ]);

  grunt.registerTask('default', [ 'serve' ]);
};
