module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                assets: '.grunt/connect/specimen/asset',
                data: ['bower.json', 'specimen/data/**/*.json'],
                helpers: 'specimen/helper/helper-*.js',
                layoutdir: 'specimen/layout',
                layout: 'default.hbs',
                partials: 'specimen/partial/**/*.hbs'
            },
            specimen: {
                cwd: 'specimen/page',
                expand: true,
                src: ['*.hbs'],
                dest: '.grunt/connect/specimen/'
            }
        },
        clean: {
            all: ['dist', '.grunt']
        },
        connect: {
            livereload: {
                options: {
                    open: true,
                    base: ['.grunt/connect/specimen']
                }
            }
        },
        copy: {
            main: {
                files: [{
                        expand: true,
                        cwd: 'src',
                        src: ['less/loop.less'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: 'specimen',
                    src: ['asset/*'],
                    dest: '.grunt/connect/specimen',
                    filter: 'isFile'
                }]
            }
        },
        'gh-pages': {
            options: {
                base: '.grunt/connect/specimen'
            },
            src: '**/*'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: ['Gruntfile.js']
        },
        less: {
            specimen: {
                files: [
                    {'.grunt/connect/specimen/asset/css/index.css': 'src/less/specimen.less'}
                ]
            }
        },
        release: {
            options: {
                file: 'bower.json'
            }
        },
        watch: {
            handlebars: {
                files: 'specimen/**/*.{hbs,json}',
                tasks: ['assemble']
            },
            less: {
                files: 'src/less/*.less',
                tasks: ['lesslint', 'less']
            },
            livereload: {
                files: [
                    '.grunt/connect/specimen/**/*'
                ]
            }
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['clean', 'test', 'copy']);
    grunt.registerTask('site', ['clean', 'test', 'copy:assets', 'less', 'assemble']);
    grunt.registerTask('deploy', ['site', 'gh-pages']);
    grunt.registerTask('live', ['site', 'connect', 'watch']);
};
