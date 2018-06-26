/*======================================================================================
Name: codeController.js
Description: 技术栈模块控制层
Author: Bob Gao
Date: 2017/01/14
=======================================================================================*/

angular.module('bsft.code.controllers', [])
.controller('CodeCtrl', ['$scope', 'httpHelper', 'webApi', function($scope, httpHelper, webApi){
    console.log('welcome to code page.');    

    // 数据源
    // $scope.dataList = ['Java SE', '微信开发', 'React Native', 'CSS3', '人工智能', 'Hbase', 'IOS', 'MySql', 'Java EE'];
    $scope.dataList = [
        {id: 1, en_name: 'javase', ch_name: 'Java SE', desc: 'Java SE是Java平台标准版的简称，用于开发和部署桌面、服务器以及嵌入设备和实时环境中的Java应用程序。Java SE包括用于开发Java Web服务的类库，同时，Java SE为Java EE提供了基础。'},
        {id: 2, en_name: 'wechat', ch_name: '微信开发', desc: '微信开发即微信公众平台开发，将企业信息、服务、活动等通过微信网页的方式表现。开发者利用微信开放的技术接口可进行二次开发，将公众账号由一个媒体型营销工具转化成提供服务的产品。'},
        {id: 3, en_name: 'reactnative', ch_name: 'React Native', desc: 'React Native是一款基于JavaScript框架React.js来开发iOS和Android原生App的开源框架，着力于提高多平台开发的开发效率——仅需学习一次，编写任何平台。(Learn once,write anywhere)'},
        {id: 4, en_name: 'css3', ch_name: 'CSS3', desc: 'CSS3是最新的CSS标准，该标准是朝着模块化发展的，以前的规范作为一个模块实在是太庞大而且比较复杂，所以，把它分解为一些小的模块，更多新的模块也被加入进来。'},
        {id: 5, en_name: 'ai', ch_name: '人工智能', desc: '人工智能（Artificial Intelligence），英文缩写为AI。它是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。'},
        {id: 6, en_name: 'hbase', ch_name: 'Hbase', desc: 'HBase – Hadoop Database，是一个高可靠性、高性能、面向列、可伸缩的分布式存储系统，利用HBase技术可在廉价PC Server上搭建起大规模结构化存储集群。'},
        {id: 7, en_name: 'ios', ch_name: 'IOS', desc: 'iOS是由苹果公司开发的移动操作系统。原名叫iPhone OS，因为iPad，iPhone，iPod touch都使用iPhone OS，所以2010WWDC大会上宣布改名为iOS。'},
        {id: 8, en_name: 'mysql', ch_name: 'MySql', desc: 'MySQL是最流行的关系型数据库管理系统，在Web应用方面是最好的RDBMS应用软件之一，作为开放源码软件，可大大降低总体拥有成本。因其社区版的性能卓越，搭配PHP和Apache可组成良好的开发环境。'},
        {id: 9, en_name: 'javaee', ch_name: 'Java EE', desc: 'Java EE，全称Java 2 Platform Enterprise Edition。该平台使用分布式多层应用模型来创建企业级应用，主要用来开发“分布式应用”以及“互联网应用” 。'},
    ];

    $scope.filterData = [
        {id: 1, en_name:'mobile', ch_name:'移动开发', num: 8},
        {id: 2, en_name:'clound', ch_name:'云计算/大数据', num: 8},
        {id: 3, en_name:'codelang', ch_name:'编程语言', num: 13},
        {id: 4, en_name:'database', ch_name:'数据库', num: 3},
        {id: 5, en_name:'software', ch_name:'软件工程', num: 4},
        {id: 6, en_name:'frontend', ch_name:'前端开发', num: 7},
        {id: 7, en_name:'aihardware', ch_name:'智能硬件', num: 1},
        {id: 8, en_name:'basic', ch_name:'理论基础', num: 2},
        {id: 9, en_name:'os', ch_name:'操作系统', num: 2},
        {id: 10, en_name:'application', ch_name:'综合应用', num: 8}
    ];


    $scope.leftDisabled = false;
    $scope.rightDisabled = true;
    $scope.filterSize = $scope.filterData.length;
    $scope.filterLeft = 0;

    // 头部header
    $scope.userName = '';
    $scope.isLogin = false;

    // 获取用户名
    $scope.getUser = function() {
        var url = webApi.user;
        httpHelper.get(url)
        .then(function (res) {
            if (res.data.code === 0) {
                $scope.userName = res.data.data.username;
                $scope.isLogin = true;
            } else {
                console.log('getUser', res.data);
                $scope.isLogin = false;
            }
        })
        .catch(function (err) {
            console.log('getUser error', err);
            $scope.isLogin = false;
        });
    };
    $scope.getUser();

    // 过滤滚动栏样式
    $scope.filterStyle = {"left": $scope.filterLeft+'px', "width": $scope.filterSize*214+'px'};

    // 过滤栏动画
    $scope.moveClick = function(type){
        if(type === 'left'){
            if($scope.filterLeft > (-$scope.filterSize*214+1070)){
                 $scope.filterLeft = $scope.filterLeft - 214;
                 $scope.filterStyle = {"left": $scope.filterLeft+'px', "width": $scope.filterSize*214+'px'};  
                 $scope.rightDisabled = false;
                 if($scope.filterLeft === -$scope.filterSize*214+1070){
                    $scope.leftDisabled = true;
                 }               
            }
        }else if(type === 'right'){
            if($scope.filterLeft < 0 ){
                 $scope.filterLeft = $scope.filterLeft + 214;
                 $scope.filterStyle = {"left": $scope.filterLeft+'px', "width": $scope.filterSize*214+'px'};   
                 $scope.leftDisabled = false;
                 if($scope.filterLeft === 0){
                    $scope.rightDisabled = true;
                 }                                  
            }
        }
    };

    $scope.map = function (){
        // 省会名称
        var p = d3.select("body").select("#name");
        p.text("hello world!");

        // 省会临时变量 
        var pd = {};

        var rdRate = 100;

        // 画布大小
        var width = 1910;
        var height = 880;

        // 添加svg
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0, 0)");  

        // 投影函数
        var projection = d3.geo.mercator()
            .center([120, 35])
            .scale(900)
            .translate([width/2, height/2]);

        var path = d3.geo.path()
            .projection(projection);

        var color = d3.scale.category20();

        console.log('chinaMap', chinaMap);

        var drag = d3.behavior.drag()
            .origin(function(d){
                return d;
            })
            .on("drag", dragMove);   

        function dragMove(d) {
            d.dx += d3.event.dx;
            d.dy += d3.event.dy;
            d3.select(this)
                .attr("transform", "translate(" + d.dx + "," + d.dy + ")");
        }                

        // 构造地图 
        svg.selectAll("path")
            .data(chinaMap.features)
            .enter()
            .append("path")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", function(d, i){
                return color(i);
            })
            .attr("d", path)
            .attr("cursor","move")
            .each(function(d){
                var rd_x = Math.round(Math.random()*rdRate);
                var rd_y = Math.round(Math.random()*rdRate);
                console.log('rd_x', rd_x);
                console.log('rd_y', rd_y);
                d.dx =  rd_x + 0;
                d.dy =  rd_y + 0;
                d3.select(this)
                    .attr("transform", "translate(" + d.dx + "," + d.dy + ")");            
            })        
            .call(drag)
            .on("mouseover", function(d, i){
                svg.selectAll("path")
                    .attr("fill", function(d, i){
                        return color(i);
                    });

                var item = d3.select(this);
                item.attr("fill", "yellow");
                p.text(d.properties.name);
            })
            .on("mouseout", function(d, i){
                d3.select(this)
                    .attr("fill", color(i));
                // pd = {};                
            })
            .on("click", function(d, i){
                svg.selectAll("path")
                    .attr("fill", function(d, i){
                        return color(i);
                    })
                    .attr("stroke", "#000")
                    .attr("stroke-width", 1);

                var item = d3.select(this);
                item.attr("fill", "yellow")
                .attr("stroke", "green")
                .attr("stroke-width", 5);
                pd = d;
                p.text(d.properties.name);                        
            });    

        // 键盘事件 
        d3.select("body")
            .on("keydown", function(){
                var dx = 0;
                var dy = 0;
                var item = d3.select("body").select("svg").select("g").selectAll("path");
                console.log('this', event);
                if(event.key === "q"){
                    // 还原
                    dx = 0;
                    dy = 0;
                    item.each(function(d){
                        console.log('dx', dx);
                        console.log('dy', dy);
                        d.dx = dx;
                        d.dy = dy;
                        d3.select(this)
                            .attr("transform", "translate(" + d.dx + "," + d.dy + ")");
                    });                 
                }else{
                    if(event.key === "ArrowUp"){
                        dy += -1 ;
                    }else if(event.key === "ArrowDown"){
                        dy += 1 ;
                    }else if(event.key === "ArrowRight"){
                        dx += 1;
                    }else if(event.key === "ArrowLeft"){
                        dx += -1;
                    }

                item.each(function(d){
                    console.log('key event: d',d);
                    if(d.properties.id === pd.properties.id){
                        d.dx += dx;
                        d.dy += dy;
                        d3.select(this)
                            .attr("transform", "translate(" + d.dx + "," + d.dy + ")");
                    }
                }); 

                }
            });           



        // 向服务器请求文件并绘制地图
        // d3.json("http://localhost:6080/api/map/china", function(error, root){
        //     if (error){
        //         return console.error(error);
        //     }
        //     console.log('root.features', root.features);

        //     svg.selectAll("path")
        //         .data(root.features)
        //         .enter()
        //         .append("path")
        //         .attr("stroke", "#000")
        //         .attr("stroke-width", 1)
        //         .attr("fill", function(d, i){
        //             return color(i);
        //         })
        //         .attr("d", path)
        //         .on("mouseover", function(d, i){
        //             d3.select(this)
        //                 .attr("fill", "yellow");
        //         })
        //         .on("mouseout", function(d, i){
        //             d3.select(this)
        //                 .attr("fill", color(i));
        //         });
        // });

    };
    // $scope.map();

    // 首屏切换动画
    function handleScroll(){
        // 屏幕高度
        var divHeight = window.innerHeight;          

        // 开始滚屏时间  
        var startTime = 0;
        var endTime = 0;
        var now = 0;       

       if ((navigator.userAgent.toLowerCase().indexOf("firefox") != -1)){  
           //for firefox;  
           document.addEventListener("DOMMouseScroll",scrollFun,false);  
       }else if (document.addEventListener) {  
            document.addEventListener("mousewheel",scrollFun,false);  
       }else if (document.attachEvent) {            
            document.attachEvent("onmousewheel",scrollFun);   
        }else{  
             document.onmousewheel = scrollFun;  
         }

        function scrollFun(event) {
            startTime = new Date().getTime();  
    
            var delta = event.detail || event.wheelDelta;  
            var scrollTop = document.body.scrollTop;            

            if ((endTime - startTime) < -500) {  
                //1秒内执行一次翻页  
                if (delta < 0 && scrollTop < divHeight) { //向下翻页   
                        turnPage('down');  
                    }         
                    if (delta > 0 && scrollTop - delta < divHeight) { //向上翻页  
                        turnPage('up');  
                }  
                endTime = new Date().getTime();  
            }         
        }

        function turnPage(type) {
            if(type === 'up'){
                $('html,body').animate({scrollTop: '0px'}, 500); 
                now = document.body.scrollTop;
            }else if(type === 'down'){
                $('html,body').animate({scrollTop: divHeight+'px'}, 500);     
            }
        }                   
    }
    // handleScroll();

    // 导航栏跳转
    $scope.navClick = function(type){
        if(type === 'home'){
            location.href = location.origin + '/#!/'+ 'home';
        } else if (type === 'login') {
            location.href = location.origin + '/#!/'+ 'login';
        } else if (type === 'personal') {
            location.href = location.origin + '/#!/' + 'personal';
        }
        else {
            location.href = location.origin + '/#!/code/'+ type; 
        }
    };

}])
.controller('CodeMoreCtrl', ['$scope', function($scope){
    console.log('hello code more page.');
    $scope.navClick = comn.navClick;

    $scope.dataList = [
        {id: 1, en_name: 'javase', ch_name: 'Java SE', desc: 'Java SE是Java平台标准版的简称，用于开发和部署桌面、服务器以及嵌入设备和实时环境中的Java应用程序。Java SE包括用于开发Java Web服务的类库，同时，Java SE为Java EE提供了基础。'},
        {id: 2, en_name: 'wechat', ch_name: '微信开发', desc: '微信开发即微信公众平台开发，将企业信息、服务、活动等通过微信网页的方式表现。开发者利用微信开放的技术接口可进行二次开发，将公众账号由一个媒体型营销工具转化成提供服务的产品。'},
        {id: 3, en_name: 'reactnative', ch_name: 'React Native', desc: 'React Native是一款基于JavaScript框架React.js来开发iOS和Android原生App的开源框架，着力于提高多平台开发的开发效率——仅需学习一次，编写任何平台。(Learn once,write anywhere)'},
        {id: 4, en_name: 'css3', ch_name: 'CSS3', desc: 'CSS3是最新的CSS标准，该标准是朝着模块化发展的，以前的规范作为一个模块实在是太庞大而且比较复杂，所以，把它分解为一些小的模块，更多新的模块也被加入进来。'},
        {id: 5, en_name: 'ai', ch_name: '人工智能', desc: '人工智能（Artificial Intelligence），英文缩写为AI。它是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。'},
        {id: 6, en_name: 'hbase', ch_name: 'Hbase', desc: 'HBase – Hadoop Database，是一个高可靠性、高性能、面向列、可伸缩的分布式存储系统，利用HBase技术可在廉价PC Server上搭建起大规模结构化存储集群。'},
        {id: 7, en_name: 'ios', ch_name: 'IOS', desc: 'iOS是由苹果公司开发的移动操作系统。原名叫iPhone OS，因为iPad，iPhone，iPod touch都使用iPhone OS，所以2010WWDC大会上宣布改名为iOS。'},
        {id: 8, en_name: 'mysql', ch_name: 'MySql', desc: 'MySQL是最流行的关系型数据库管理系统，在Web应用方面是最好的RDBMS应用软件之一，作为开放源码软件，可大大降低总体拥有成本。因其社区版的性能卓越，搭配PHP和Apache可组成良好的开发环境。'},
        {id: 9, en_name: 'javaee', ch_name: 'Java EE', desc: 'Java EE，全称Java 2 Platform Enterprise Edition。该平台使用分布式多层应用模型来创建企业级应用，主要用来开发“分布式应用”以及“互联网应用” 。'},
    ];

}])
.controller('JavaSeCtrl',['$scope',function(){
     console.log('hello javase');
}])
.controller('WechatCtrl', ['$scope', function($scope){
    console.log('hello wechat');
}])
.controller('SkillCtrl', ['$scope', function($scope){
    console.log('hello skill');
}]);
