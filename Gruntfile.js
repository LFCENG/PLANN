var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            dev: {
                src: ['.env'],
            }
        },
        express:{
            dev: {
                options: {
                    server: path.resolve('./server/app'),
                    port:8080,
                    hostname:'0.0.0.0',
                    showStack: true
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-env');
    
    grunt.registerTask('dev', ['env:dev', 'express:dev','express-keepalive']);
    grunt.registerTask('release',['express:dev','express-keepalive']);
};
