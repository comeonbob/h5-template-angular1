/*======================================================================================
Name: loginController.js
Description: 登陆控制层
Author: Bob Gao
Date: 2017/01/04
=======================================================================================*/

angular.module('bsft.login.controllers', [])
.controller('LoginCtrl', ['$scope', 'httpHelper', 'webApi', function($scope, httpHelper, webApi){
    $scope.login = {};  //登录信息
    $scope.isOpen = false;  //密码输入框类型
    $scope.isLoginError = false; //登录错误
    $scope.isRegError = false;   //注册错误
    $scope.showRegister = false; //注册弹窗
    $scope.register = {};   //注册信息
    $scope.register.user = ''; //注册用户名
    $scope.register.pwd = '';  //注册密码
    $scope.register.cfpwd = ''; //注册确认密码
    $scope.register.userTipsPass = false;  //用户名正确
    $scope.register.userTipsErr = false;   //用户名错误
    $scope.register.userErrText = '';      //用户名错误信息
    $scope.register.pwdTipsPass = false;  //密码正确
    $scope.register.pwdTipsErr = false;   //密码错误
    $scope.register.pwdErrText = '';      //密码错误信息
    $scope.register.cfpwdTipsPass = false;  //确认密码正确
    $scope.register.cfpwdTipsErr = false;   //确认密码错误
    $scope.register.cfpwdErrText = '';      //确认密码错误信息

    $scope.register.resultSuc = '';  //注册成功结果
    $scope.register.resultErr = '';  //注册失败结果

    $scope.isShowFpw = false;   //忘记密码


    // 清除用户名
    $scope.clearUserClick = function(){
        $scope.login.user = '';
    };

    // 改变输入类型
    $scope.changeTypeClick = function(){
        var pwd_input = document.getElementById('pwd_input');
        if(pwd_input.type === 'text'){
            pwd_input.setAttribute('type','password'); 
            $scope.isOpen = false;       
        }else{
            pwd_input.setAttribute('type','text');
            $scope.isOpen = true;       
        }
    };

    // 登录
    $scope.loginSubmit = function(){
        var url  = webApi.login;
        var data = {
            username: $scope.login.user,
            password: $scope.login.password
        };

        httpHelper.post(url, data).then(function(res){
            if(res.data.code === 1){
                $scope.isLoginError = true;
            }else if( res.data.code === 0) {
                console.log('登录成功');
                location.href = location.origin + '/#!/'+ 'home';
            }else {
                $scope.isLoginError = true;
            }
        }, function(res){
                console.log('error', res);
        });

        // // test
        // if(data.userName === 'Bob' && data.password === "123456"){
        //     location.href = location.origin + '/#!/'+ 'home';
        // }else{
        //     $scope.isLoginError = true;
        // }
    };

    // 返回首页
    $scope.backup = function() {
        location.href = location.origin + '/#!/'+ 'home';
    };

    // 返回签到页
    $scope.goSign = function(){

    };

    // 注册弹窗
    $scope.registerClick = function() {
        $scope.showRegister = true;
        $scope.register.user = ''; //注册用户名
        $scope.register.pwd = '';  //注册密码
        $scope.register.cfpwd = ''; //注册确认密码
        $scope.register.userTipsPass = false;  //用户名正确
        $scope.register.userTipsErr = false;   //用户名错误
        $scope.register.userErrText = '';      //用户名错误信息
        $scope.register.pwdTipsPass = false;  //密码正确
        $scope.register.pwdTipsErr = false;   //密码错误
        $scope.register.pwdErrText = '';      //密码错误信息
        $scope.register.cfpwdTipsPass = false;  //确认密码正确
        $scope.register.cfpwdTipsErr = false;   //确认密码错误
        $scope.register.cfpwdErrText = '';      //确认密码错误信息
        $scope.register.resultSuc = '';  //注册成功结果
        $scope.register.resultErr = '';  //注册失败结果
    };

    // 提交注册
    $scope.regSubmit = function() {
        if (!$scope.register.userTipsPass || !$scope.register.pwdTipsPass || !$scope.register.cfpwdTipsPass) {
            return;
        }
        var url  = webApi.loginRegister;
        var data = {};
        data.username = $scope.register.user;
        data.pwd = $scope.register.cfpwd;
        // data.verifyCode = $scope.register.verifyCode;
        httpHelper.post(url, data).then(function(res){
            if(res.data.code === 1){
                $scope.isRegError = true;
                $scope.register.resultErr = '用户已存在!';
            }else if( res.data.code === 0) {
                $scope.isRegError = false;
                $scope.register.resultSuc = '注册成功!';
                // closeWin();
            }else {
                $scope.isRegError = true;
                $scope.register.resultErr = '注册错误，请联系管理员.';
            }
        }, function(res){
                console.log('error', res);
        });       
    };

    /**
     * 关闭注册弹窗 TODO
     */
    function closeWin() {
        setTimeout(function(){
            $scope.$apply(function () {
                $scope.showRegister = false;
                console.log('$scope.showRegister', $scope.showRegister);
            });
        }, 3000);
    }

    // 获取验证码
    $scope.getVerify = function() {
        var url  = webApi.loginCheckUser;
        var data = {};
        data.username = $scope.register.user;
        httpHelper.post(url, data).then(function(res){
            if(res.data.code === 1){
                $scope.isRegError = true;
                $scope.RegError = '用户已存在';
            }else if( res.data.code === 2) {
                //用户不存在，发送验证码
                sendVerifyCode();
            }else {
                $scope.isRegError = true;
                $scope.RegError = '用户名错误，请联系管理员';
            }
        }, function(res){
                console.log('get signData error', res);
        });
    };

    // 发送验证码
    function sendVerifyCode() {
        var url  = webApi.loginSendVirifyCode;
        var data = {};
        data.username = $scope.register.user;
        httpHelper.post(url, data).then(function(res){
            if(res.data.code === 0){
                $scope.isRegError = true;
                $scope.RegError = '验证码已发送成功';
            }else {
                $scope.isRegError = true;
                $scope.RegError = '验证码发送失败，请联系管理员';
            }
        }, function(res){
                console.log('error', res);
        });        
    }

    /**
     * 检查用户名
     */
    $scope.checkUser = function() {
        var url = webApi.loginCheckUser;
        var data = {};
        data.username = $scope.register.user;
        if (data.username === '' || data.username === undefined) {
            $scope.register.userTipsPass = false;
            $scope.register.userTipsErr = true;
            $scope.register.userErrText = '请输入用户名';
            return;
        }
        httpHelper.post(url, data).then(function(res) {
            // 用户不存在
            if (res.data.code === 1){
                $scope.register.userTipsPass = true;
                $scope.register.userTipsErr = false;
            } else if (res.data.code === 0){
                // 用户存在
                $scope.register.userTipsPass = false;
                $scope.register.userTipsErr = true;
                $scope.register.userErrText = '用户已存在';
            } else {
                $scope.register.userTipsPass = false;
                $scope.register.userTipsErr = true;
                $scope.register.userErrText = '数据错误，请联系管理员';
            }
        });
    };

    /**
     * 检查密码
     */
    $scope.checkPwd = function() {
        if ($scope.register.pwd === '' || $scope.register.pwd === undefined) {
            $scope.register.pwdTipsPass = false;
            $scope.register.pwdTipsErr = true;
            $scope.register.pwdErrText = '请输入密码';
            return;
        }
        if ($scope.register.pwd.length < 6) {
            $scope.register.pwdTipsPass = false;
            $scope.register.pwdTipsErr = true;
            $scope.register.pwdErrText = '请输入至少6位密码';
        } else {
            $scope.register.pwdTipsPass = true;
            $scope.register.pwdTipsErr = false;
            $scope.register.pwdErrText = '';
        }
    };
    /**
     * 检查确认密码
     */
    $scope.checkCfPwd = function() {
        if ($scope.register.pwdTipsErr || !$scope.register.pwdTipsPass) {
            $scope.register.cfpwdTipsPass = false;
            $scope.register.cfpwdTipsErr = false;
            $scope.register.cfpwdErrText = '';
            return;
        }
        if ($scope.register.cfpwd !== $scope.register.pwd) {
            $scope.register.cfpwdTipsPass = false;
            $scope.register.cfpwdTipsErr = true;
            $scope.register.cfpwdErrText = '密码不一致';
        } else {
            $scope.register.cfpwdTipsPass = true;
            $scope.register.cfpwdTipsErr = false;
            $scope.register.cfpwdErrText = '';
        }
    };

    /**
     * 当用户输入时，清除错误信息
     */
    $scope.$watch('login.user', function(){
        if($scope.isLoginError){
            $scope.isLoginError = false;
        }
    });
    $scope.$watch('login.password', function(){
        if($scope.isLoginError){
            $scope.isLoginError = false;
        }
    });
    $scope.$watch('register.user', function(){
        $scope.register.userTipsPass = false;  //用户名正确
        $scope.register.userTipsErr = false;   //用户名错误
        $scope.register.userErrText = '';      //用户名错误信息
    });
    $scope.$watch('register.pwd', function(){
        $scope.register.pwdTipsPass = false;  //密码正确
        $scope.register.pwdTipsErr = false;   //密码错误
        $scope.register.pwdErrText = '';      //密码错误信息
        $scope.register.cfpwdTipsPass = false;  //确认密码正确
        $scope.register.cfpwdTipsErr = false;   //确认密码错误
        $scope.register.cfpwdErrText = '';      //确认密码错误信息
    });
    $scope.$watch('register.cfpwd', function(){
        $scope.register.cfpwdTipsPass = false;  //确认密码正确
        $scope.register.cfpwdTipsErr = false;   //确认密码错误
        $scope.register.cfpwdErrText = '';      //确认密码错误信息
    });

    $scope.registerDivClick = function(e){
        console.log('222222');
        e.stopPropagation();      //阻止事件冒泡
        // e.preventDefault();    //阻止事件关联的默认动作
    };

    document.onmousedown = function(event){ 
        console.log('$scope.showRegister,',$scope.showRegister);
        console.log('event',event);
        if($scope.showRegister === true){
            $scope.$apply($scope.showRegister = false);
        }
    };

}]);