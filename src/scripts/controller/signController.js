/*======================================================================================
Name: homeController.js
Description: 签到模块控制层
Author: Bob Gao
Date: 2017/02/16
=======================================================================================*/

angular.module('bsft.sign.controllers', [])
.controller('SignCtrl', ['$scope','httpHelper','webApi', function($scope,httpHelper,webApi){
    console.log('welcome to sign page.');  
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