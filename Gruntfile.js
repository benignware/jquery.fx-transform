module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    // Lint definitions
    jshint: {
      all: ["src/**.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/jquery.fx-transform.min.js': [ 'dist/jquery.fx-transform.js']
        }
      }
    }, 
    copy: {
      build: {
        expand: true,
        cwd: 'src',
        src: ['jquery.fx-transform.js'], 
        dest: 'dist',
        flatten: true,
        filter: 'isFile'
      }
    },
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: false
          }
        },
        files: {
          'dist/jquery.fx-transform.js': 'src/jquery.fx-transform.js'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-browserify");

  grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);
  
};