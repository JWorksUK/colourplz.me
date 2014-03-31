module.exports = function(grunt){
    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            build: {
                files: {
                    'www/assets/css/style.min.css': 'components/sass/style.scss'
                }
            }
        },
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true
                },
                files: {
                    'www/assets/css/style.min.css': 'www/assets/css/style.min.css'
                }
            }
        },
        cssmin: {
            build: {
                src: 'www/assets/css/style.min.css',
                dest: 'www/assets/css/style.min.css'
            }
        },
        jshint: {
            uses_defaults: ['components/js/site.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['components/js/**/*.js'],
                dest: 'www/assets/js/site.min.js'
            }
        },
        uglify: {
            build: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'www/assets/js/site.min.js': ['www/assets/js/site.min.js']
                }
            }
        },
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['www/index.html']
            }
        },
        watch: {
            html: {
                files: ['www/index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['components/js/site.js'],
                tasks: ['buildjs']
            },
            css: {
                files: ['components/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
    });

    grunt.registerTask('default',   []);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
    grunt.registerTask('buildjs',   ['jshint', 'concat', 'uglify']);
};
