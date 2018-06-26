/*======================================================================================
Name: index.js
Description: 前端入口文件
Author: Bob Gao
Date: 2016/12/18
=======================================================================================*/

var app = angular.module('bsft', ['ngRoute', 'bsft.services','bsft.login.controllers', 'bsft.home.controllers',
            'bsft.code.controllers','bsft.sign.controllers','bsft.personal.controllers','bsft.mobile.controllers', 'bsft.demo.controllers', 'bsft.webApi']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/login', {
            templateUrl: './views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/home', {
            templateUrl: './views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/code', {
            templateUrl: './views/code/code_md.html',
            controller: 'CodeCtrl'
        })
        .when('/code/more', {
            templateUrl: './views/code/code_more.html',
            controller: 'CodeMoreCtrl'
        })
        .when('/code/javase',{
            templateUrl: './views/code/code_javase.html',
            controller: 'JavaSeCtrl'
        })
        .when('/code/wechat', {
            templateUrl: './views/code/code_wechat.html',
            controller: 'WechatCtrl'
        })        
        .when('/code/skill', {
            templateUrl: './views/code/code_skill.html',
            controller: 'SkillCtrl'
        })
        .when('/sign', {
            templateUrl: './views/sign/sign.html',
            controller: 'SignCtrl'
        })
        .when('/mobile/demo', {
            templateUrl: './views/mobile/demo.html',
            controller: 'DemoCtrl'
        })
        .when('/demo/banner', {
            templateUrl: './views/demo/banner.html',
            controller: 'BannerCtrl1'
        })
        .when('/demo/banner2', {
            templateUrl: './views/demo/banner2.html',
            controller: 'BannerCtrl2'
        })
        .when('/demo/banner3', {
            templateUrl: './views/demo/banner3.html',
            controller: 'BannerCtrl3'
        })
        .when('/personal', {
            templateUrl: './views/personal/index.html',
            controller: 'PersonalCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}])
;
