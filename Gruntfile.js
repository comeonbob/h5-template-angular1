/*======================================================================================
Name: Gruntfile.js
Description: grunt 配置文件
Author: Bob Gao
Date: 2016/12/18
=======================================================================================*/

module.exports = function(grunt) {
  // 监听端口号 
  var lrPort = 6699;
  // 生成脚本
  var lrSnippet = require('connect-livereload')({ port: lrPort });

  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var lrMiddleware = function(connect, options, middlwares) {
    return [
        lrSnippet,
        // 静态文件服务器的路径 原先写法：connect.static(options.base[0])
        serveStatic(options.base[0]),
        // 启用目录浏览(相当于IIS中的目录浏览) 原先写法：connect.directory(options.base[0])
        serveIndex(options.base[0])
    ];
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        files: ['Gruntfile.js', 'src/**/*.js', '!src/lib/*.js'],
        options: {
            jquery: true
        }
    },
    concat: {
        options: {

        },
        dist: {
            // 将要被合并的文件
            src: ['src/scripts/**/*.js', 'src/index.js', '!src/scripts/service/ieupdate.js'],
            // 合并后的JS文件的存放位置
            dest: 'build/<%= pkg.name%>.js'
        }
    },    
    uglify: {
      options: {
        // 此处定义的banner注释将插入到输出文件的顶部
        banner: '/*! <%= pkg.name %>.min.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= concat.dist.dest %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    watch: {
        files: ['src/**', 'Gruntfile.js'],
        options: {
            livereload: lrPort
        },
        tasks: ['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'copy:main']
    },
    connect: {
        options: {
            port: 9000,
            host: 'localhost',
            base: 'build'
        },
        livereload: {
            options: {
                open: true,
                // 通过LiveReload脚本，让页面重新加载。
                middleware: lrMiddleware
            }
        }
    },
    clean: {
        build: ['build/**']
    },
    copy: {
        main: { expand: true, cwd: 'src', src: '**', dest: 'build/'}
    },
    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: {
                'build/css/bsft.min.css': ['src/css/**/*.css']
            }
        }
    }

  });

  // 检查语法
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // 拼接文件
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 压缩文件
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 监听文件变化
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 静态文件服务器
  grunt.loadNpmTasks('grunt-contrib-connect');

  // 压缩css
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 清除文件
  grunt.loadNpmTasks('grunt-contrib-clean');

  // 复制文件
  grunt.loadNpmTasks('grunt-contrib-copy');


  // 默认被执行的任务列表。
  grunt.registerTask('default', ['jshint', 'clean:build', 'concat', 'uglify', 'cssmin', 'copy:main', 'connect:livereload', 'watch']);

};