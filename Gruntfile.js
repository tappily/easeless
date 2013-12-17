module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                assets: 'dist/specimen/',
                data: ['bower.json'],
                styles: ['<%=pkg.name%>.css'],
                helpers: 'specimen/helper/helper-*.js',
                layoutdir: 'specimen/layout',
                partials: 'specimen/partial/**/*.hbs'
            },
            specimen: {
                options: {
                    data: ['specimen/data/*.json'],
                    layout: 'default.hbs'
                },
                cwd: 'specimen/page',
                expand: true,
                src: ['*.hbs'],
                dest: 'dist/specimen/'
            }
        },
        clean: {
            dist: ['dist']
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: ['dist/specimen']
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
            specimen: {
                files: [{
                    expand: true,
                    cwd: 'specimen',
                    src: ['asset/*'],
                    dest: 'dist/specimen',
                    filter: 'isFile'
                }]
            }
        },
        'gh-pages': {
            options: {
                base: 'dist/specimen'
            },
            src: '**/*'
        },
        lesslint: {
            options: {
                formatters: [{
                        id: 'csslint-xml',
                        dest: 'report/lesslint.xml'
                    }]
            },
            main: {
                src: ['src/less/main.less']
            },
            specimen: {
                src: ['src/less/specimen.less']
            }
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
                    {'dist/specimen/css/<%=pkg.name%>.css': 'src/less/specimen.less'}
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
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'dist/**/*'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'test',
        'build'
    ]);

    grunt.registerTask('test', ['jshint', 'lesslint']);
    grunt.registerTask('build', ['clean', 'test', 'less', 'copy']);
    grunt.registerTask('build:specimen', ['clean', 'jshint', 'lesslint:specimen', 'copy:specimen', 'less:specimen', 'assemble']);
    grunt.registerTask('deploy:specimen', ['build:specimen', 'gh-pages']);
    grunt.registerTask('live', ['build:specimen', 'connect:livereload', 'watch']);
};
