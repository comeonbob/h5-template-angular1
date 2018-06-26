/*======================================================================================
Name: common.js
Description: 基础库文件
Author: Bob Gao
Date: 2016/12/20
=======================================================================================*/

window.comn = (function(win) {
    win.debug = true;
    if(!win.debug){
        console.log = function(){};
    }

    var testVar = 'testVar';

    var testFun = function() {
        console.log('hello testFun!');
    };

    function navClick (type) {
        if(type === 'home'){
            location.href = location.origin + '/#!/'+ 'home';
        }else{
            location.href = location.origin + '/#!/code/'+ type; 
        }
    }

    return {
        testVar: testVar,
        testFun: testFun,
        navClick: navClick
    };
})(window);