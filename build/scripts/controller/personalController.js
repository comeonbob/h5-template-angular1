/*======================================================================================
Name: homeController.js
Description: 签到模块控制层
Author: Bob Gao
Date: 2017/02/16
=======================================================================================*/

angular.module('bsft.personal.controllers', [])
.controller('PersonalCtrl', ['$scope','httpHelper','webApi', function($scope,httpHelper,webApi){
    console.log('welcome to personal ctrl.');  

    $scope.personList = [
        {name: '首页', url: 'home'},
        {name: '技术栈', url: 'code'},
        {name: '游戏栈', url: 'game'},
        {name: '个人主页', url: 'personal'}
    ];


    $scope.personDetail = [
        {name: 'name', value: '高志华'},
        {name: 'age', value: '26'},
        {name: 'birthday', value: '1991-9-9'},
        {name: 'gender', value: '男'},
        {name: 'address', value: '中国-广东省-深圳市'}
    ];

    $scope.nickName = 'Bob丶抱抱';

    $scope.tabList = [
        {name: '我的博客', isActiveTab: true},
        {name: '我的资料', isActiveTab: false},
        {name: '我的动态', isActiveTab: false},
        {name: '我的游戏', isActiveTab: false},
        {name: '我的关系', isActiveTab: false}
    ];

    // tab点击事件
    $scope.tabClick = function(index) {
        for (var i = 0; i < $scope.tabList.length; i++ ) {
            if ($scope.tabList[i].isActiveTab) {
                $scope.tabList[i].isActiveTab = false;
            }
        }
        $scope.tabList[index].isActiveTab = true;

        setContent(index);

        function setContent(index) {
            switch (index) {
                case 0: 
                $scope.tabContent = '暂无博客信息';
                break;
                case 1: 
                $scope.tabContent = '暂无资料信息';
                break;
                case 2: 
                $scope.tabContent = '暂无动态信息';
                break;
                case 3: 
                $scope.tabContent = '暂无游戏信息';
                break;
                case 4: 
                $scope.tabContent = '暂无关系信息';
                break;
                default:
                $scope.tabContent = '暂无信息';
            }
        }
    };

    $scope.tabContent = '';

    $scope.navClick = function(url) {
        location.href = location.origin + '/#!/' + url;
    };


    // 废弃
    // 日期
    var date = new Date();
    var today = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
    $scope.signdate = today.year+'-'+today.month+'-'+today.day; 
    console.log('date', $scope.signdate);

    $scope.signData = [];
    $scope.addData = {
        name: 'Bob',
        signdate: $scope.signdate,
        worktime: 2,
        workcontent: ''
    };

    // 获取数据
    $scope.getSigns = function(){
        var url = webApi.sign; 
        httpHelper.get(url).then(function(res){
            if(res.data.code === 0){
                $scope.signData = res.data.data;
            }else{
                console.log('get signData', res);
            }
        }, function(res){
                console.log('get signData error', res);
        });
    };
    $scope.getSigns();

    // 提交数据
    $scope.submit = function(){
        var url = webApi.sign; 
        httpHelper.post(url, $scope.addData).then(function(res){
            console.log('add sign res',res);
            if(res.data.code === 0){
                console.log('add success!');
                // 更新数据 
                $scope.getSigns();
            }else{
                console.log('add failed');
            }
        }, function(res){
            console.error(res);
        });
    };
}]);