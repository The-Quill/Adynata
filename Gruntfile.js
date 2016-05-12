module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        babel: {
            options: {
                presets: ['es2015'],
                plugins: [
                    'babel-plugin-transform-class-properties',
                    'babel-plugin-add-module-exports'
                ]
            },
            out: {
                files: [{
                    expand: true,
                    src: ['*.es6', '**/*.es6'],
                    dest: 'out/',
                    ext: '.js'
                }]
            }
        }
    });
    grunt.registerTask('default', ['babel']);
};
