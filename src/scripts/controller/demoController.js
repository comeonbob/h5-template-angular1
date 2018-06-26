/*======================================================================================
Name: demoController.js
Description: demo控制层
Author: Bob Gao
Date: 2017/10/25
=======================================================================================*/

angular.module('bsft.demo.controllers', [])
.controller('BannerCtrl1', ['$scope', function ($scope) {
  console.log('BannerCtrl');
  $scope.isPageActiveZero = false;
  $scope.isPageActiveFir = true;
  $scope.isPageActiveSec = false;
  $scope.isPageActiveTir = false;
  $scope.isPageActiveFou = false;
  $scope.pageIndex = 0;
  var intervalId = -1;
  /**
   * 点击分页
   */
  $scope.pagiClick = function (index) {
    switch (index) {
      case 0: 
      $scope.isPageActiveZero = true;
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = true;
      $scope.isPageActiveFou = false;
      $scope.pageIndex = 2;
      break;
      case 1: 
      $scope.isPageActiveZero = false;
      $scope.isPageActiveFir = true;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = false;
      $scope.pageIndex = 0;
      break;
      case 2: 
      $scope.isPageActiveZero = false;
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = true;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = false;
      $scope.pageIndex = 1;
      break;
      case 3:
      $scope.isPageActiveZero = false;
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = true;
      $scope.isPageActiveFou = false;
      $scope.pageIndex = 2;
      break;
      case 4:
      $scope.isPageActiveZero = false;
      $scope.isPageActiveFir = true;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = true;
      $scope.pageIndex = 0;
      break;
      default:
      $scope.isPageActiveZero = false;
      $scope.isPageActiveFir = true;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = false;
      $scope.pageIndex = 0;
    }
  };

  /**
   * 点击箭头
   */
  $scope.arrowClick = function (index) {
    if (index === 0) {
      // left
      $scope.pageIndex --;
      // if ($scope.pageIndex === -1) {
      //   $scope.pageIndex = 2;
      // }
      console.log('$scope.pageIndex', $scope.pageIndex);
      $scope.pagiClick($scope.pageIndex + 1);
    } else {
      // right
      $scope.pageIndex ++;
      // if ($scope.pageIndex === 3) {
      //   $scope.pageIndex = 0;
      // }
      $scope.pagiClick($scope.pageIndex + 1);
    }
  };

  // 开始轮播动画
  $scope.startInterval = function() {
    clearInterval(intervalId);
    intervalId = setInterval(function(){
      $scope.$apply(function() {
        $scope.arrowClick(1);
      });
    }, 3*1000);
  };

  // 结束轮播动画 
  $scope.stopInterval = function() {
    clearInterval(intervalId);
  };

  $scope.startInterval();

}])
.controller('BannerCtrl2', ['$scope', 'httpHelper', 'webApi', function($scope, httpHelper, webApi){
  console.log('BannerCtrl');
  $scope.isPageActiveFir = true;
  $scope.isPageActiveSec = false;
  $scope.isPageActiveTir = false;
  $scope.isPageActiveFou = false;
  $scope.isPageActiveFiv = false;
  $scope.pageIndex = 0;
  var intervalId = -1;
  $scope.isPause = false;
  /**
   * 点击分页
   */
  $scope.pagiClick = function (index) {
    $scope.pageIndex = index;
    handlePage();
    var imgDiv = document.getElementById('img_div');
    imgDiv.style.left = ($scope.pageIndex + 1) * -1280 + 'px';
  };

  /**
   * 处理底部分页
   */
  function handlePage () {
    if ($scope.pageIndex === 5) {
      $scope.pageIndex = 0;
    }
    if ($scope.pageIndex === -1) {
      $scope.pageIndex = 4;
    }
    console.log($scope.pageIndex);
    if ($scope.pageIndex === 0) {
      $scope.isPageActiveFir = true;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = false;
      $scope.isPageActiveFiv = false;
    }
    if ($scope.pageIndex === 1) {
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = true;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = false;
      $scope.isPageActiveFiv = false;
    }
    if ($scope.pageIndex === 2) {
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = true;
      $scope.isPageActiveFou = false;
      $scope.isPageActiveFiv = false;
    }
    if ($scope.pageIndex === 3) {
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = true;
      $scope.isPageActiveFiv = false;
    }
    if ($scope.pageIndex === 4) {
      $scope.isPageActiveFir = false;
      $scope.isPageActiveSec = false;
      $scope.isPageActiveTir = false;
      $scope.isPageActiveFou = false;
      $scope.isPageActiveFiv = true;
    }
  }

  /**
   * 点击箭头
   */
  $scope.arrowClick = function (index) {
    if (index === 0) {
      // left
      $scope.pageIndex --;
      handlePage();
      animate(1280);
    } else {
      // right
      $scope.pageIndex ++;
      handlePage();
      animate(-1280);
    }
  };

  /**
   * 实现动画
   */
  function animate(offset) {
    var imgDiv = document.getElementById('img_div');
    var left = parseInt(imgDiv.style.left) + offset;
    var len = 5;

    // 增加样式
    imgDiv.style.left = left + 'px';

    // 处理边界值
    if (left === 0) {
      setTimeout(function(){
        $scope.$apply(function() {
          // 先暂停， 再改样式， 最后恢复过渡效果
          $scope.isPause = true;
          imgDiv.style.left = -1280 * len + 'px';
          setTimeout(function() {
            $scope.isPause = false;
          }, 1);
        });
      }, 600);
    }
    if (left === (-1280 * (len+1) )) {
      setTimeout(function(){
        $scope.$apply(function() {
          $scope.isPause = true;
          imgDiv.style.left = '-1280px';
          setTimeout(function() {
            $scope.isPause = false;
          }, 1);
        });
      }, 600);
    }
  }

  // 开始轮播动画
  $scope.startInterval = function() {
    clearInterval(intervalId);
    intervalId = setInterval(function(){
      $scope.$apply(function() {
        $scope.arrowClick(1);
      });
    }, 3*1000);
  };

  // 结束轮播动画 
  $scope.stopInterval = function() {
    clearInterval(intervalId);
  };

  $scope.startInterval();

}]);