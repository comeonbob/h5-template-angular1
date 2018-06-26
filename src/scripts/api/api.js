/*======================================================================================
Name: api.js
Description: 处理本地和服务器api前缀文件
Author: Bob Gao
Date: 2016/02/17
=======================================================================================*/

angular.module('bsft.webApi', [])
    .value('webApi', function(){
        var webApiRoute = '';
        if(window.location.hostname === 'localhost'){
            webApiRoute = "http://localhost:3068/api";
        }else{
            webApiRoute = window.location.origin + '/api';
        }

        var webApis = {
            sign: webApiRoute + '/sign',
            loginCheckUser: webApiRoute + '/login/check',
            loginSendVirifyCode: webApiRoute + '/login/verifycode',
            loginRegister: webApiRoute + '/login/register',
            login: webApiRoute + '/login',
            user: webApiRoute + '/login/user'
        };
        return webApis;
    }());