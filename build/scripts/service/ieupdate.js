/*======================================================================================
Name: ieupdate.js
Description: 检查ie浏览器版本
Author: Bob Gao
Date: 2017/11/13
=======================================================================================*/
(function() {
  var o = navigator.userAgent.match(/MSIE (\d+)/);
  o = o && o[1];
  console.log('o', o);
  // ie9 以下 || o != null
  if (!!o && o < 9) {
    var newUrl = location.protocol + '//' + location.host + '/views/static/ieupdate/index.html';
    location.href =  newUrl;
  }
})();