/*======================================================================================
Name: homeController.js
Description: 首页模块控制层
Author: Bob Gao
Date: 2017/01/14
=======================================================================================*/

angular.module('bsft.home.controllers', [])
.controller('HomeCtrl', ['$scope', function($scope){
    console.log('welcome to home page.');    
    $scope.isHomeMove = false;
    $scope.festivalAction = {"background-position-x": "0px"};
    var positionX = 0;
    var positionTotal = -27000;
    var num = 0;

    /*
    setInterval(function(){
        $scope.$apply(function(){
            if(positionX === positionTotal){
                positionX = 0;
                num = 0;
            }else{
                num ++;            
                positionX = positionX - 270;
            }
            $scope.festivalAction = {"background-position-x": -270*num+"px"};
        });
    }, 100);

    setTimeout(function () {
        scrollAnimation();
    }, 3000);


    var totalHeight = document.body.scrollHeight;
    var time = 100;
    var everyHeight = totalHeight/time;
    var currentHeight = everyHeight;
    function scrollAnimation () {
        var t = setTimeout( function () {
            window.scrollTo(0, currentHeight);
            currentHeight += everyHeight;
            if (currentHeight < totalHeight) {
                scrollAnimation();
            } else {
                clearTimeout(t);
            }
        }, 10);
    }
    */

}]);