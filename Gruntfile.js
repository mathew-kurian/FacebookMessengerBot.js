/* eslint strict: 0, global-require: 0 */

'use strict';

module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      compiled: ['./dist']
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/**.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'babel'
  ]);

  grunt.registerTask('default', 'build');
};
