"use strict";angular.module("app",["ngAnimate","ngCookies","ngSanitize","ngResource","ui.router","tm.pagination"]),angular.module("app").animation(".ease",function(){return{enter:function(e,a){},leave:function(e,a){},addClass:function(e,a,t){},removeClass:function(e,a,t){}}}),angular.module("app").controller("AppLayoutCtrl",["$scope","utils",function(e,a){var t=e.vm={};e.$on("$stateChangeSuccess",function(e,r){t.controllerCss=a.getControllerCss(r.controller),console.log(t)})}]),angular.module("app").directive("appLayout",function(){return{restrict:"EA",scope:{},templateUrl:"components/layout/_layout.html",controller:"AppLayoutCtrl"}}),angular.module("app").controller("LayoutFooterCtrl",["$scope",function(e){e.vm={}}]),angular.module("app").directive("layoutFooter",function(){return{restrict:"EA",scope:{},templateUrl:"components/layout/footer.html",controller:"LayoutFooterCtrl"}}),angular.module("app").controller("LayoutHeaderCtrl",["$scope",function(e){e.vm={}}]),angular.module("app").directive("layoutHeader",function(){return{restrict:"EA",scope:{},templateUrl:"components/layout/header.html",controller:"LayoutHeaderCtrl"}}),angular.module("app").controller("LayoutMenuCtrl",["$scope","$rootScope",function(e,a){e.ACTION=a.ACTION,e.$on("$stateChangeSuccess",function(t,r){e.ACTION=a.ACTION})}]),angular.module("app").directive("layoutMenu",["$rootScope",function(e){return{restrict:"EA",scope:{},templateUrl:"components/layout/menu.html",controller:"LayoutMenuCtrl"}}]),angular.module("app").config(function(){}),angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,a,t){e.state("default",{url:"",templateUrl:"controllers/home/index.html",controller:"HomeIndexCtrl",action:"home"}),e.state("home",{url:"/",templateUrl:"controllers/home/index.html",controller:"HomeIndexCtrl",action:"home"}),e.state("buy",{url:"/buy",template:"<div ui-view></div>","abstract":!0,action:"buy"}),e.state("buy.list",{url:"/list?BrandID&SeriesID&PriceID&Style&SearchValue&&Value&CarNo",templateUrl:"controllers/buy/list.html",controller:"BuyListCtrl as bl",action:"buy"}),e.state("buy.info",{url:"/info/:CarNo.html",templateUrl:"controllers/buy/info.html",controller:"BuyInfoCtrl as bi",action:"buy"}),e.state("report",{url:"/report/:ReportCode.html",templateUrl:"controllers/buy/report.html",controller:"ReportCtrl as vr",action:"buy"}),e.state("sell",{url:"/sell.html",templateUrl:"controllers/home/sell.html",controller:"SellPageCtrl as sp",action:"sell"}),e.state("my",{url:"/my",template:"<div ui-view></div>","abstract":!0,action:"my"}),e.state("my.main",{url:"/main.html",templateUrl:"controllers/my/main.html",controller:"MyMainCtrl as mm",action:"my"}),e.state("notFound",{url:"/notFound",templateUrl:"controllers/home/notFound.html",controller:"HomeNotFoundCtrl"}),a.otherwise("/notFound"),t.html5Mode(!0)}]),angular.module("app").run(["$rootScope","$state","$stateParams",function(e,a,t){e.state=a,e.stateParams=t,e.$on("$stateChangeSuccess",function(){a.current.action?e.ACTION=a.current.action:e.ACTION="home"})}]),angular.module("app").constant("api",{root:"/api",apiOf:function(e){if(!e.match("^/"))throw"path must start by /";return this.root+e}}),angular.module("app").controller("BuyInfoCtrl",["$scope","$rootScope","BuyInfoData",function(e,a,t){e.title="车辆信息",e.isload=!0;var r=mui(".mui-slider");r.slider(),e.GetCarInfo=function(){return a.stateParams.CarNo?void t.get({CarNo:a.stateParams.CarNo},function(a){if("1"==a.status){e.isload=!1;for(var t,r,o,n=0,s=a.data.length;s>n;n++){var c=a.data[n].name;switch(c){case"Car":e.carinfodata=a.data[n].value[0],1==e.carinfodata.CarFlag?(e.theprice="交易中...",e.newsprice=e.carinfodata.NewCarPrice/1e4+"万"):(e.theprice=e.carinfodata.Price/1e4+"万",e.newsprice=e.carinfodata.NewCarPrice/1e4+"万");break;case"CarPic":e.carinfoimg=a.data[n].value;break;case"TestReportList":ReportPageList=a.data[n].value;break;case"Test_Report":e.treportdata=a.data[n].value[0];break;case"Test_ReportDetail":e.ReportDetail=a.data[n].value,t=a.data[n].value;break;case"Test_ReportCarSurfaceCase":r=a.data[n].value;break;case"Test_ReportPic":o=a.data[n].value}}if(null==e.carinfodata.AllianceCode||""==e.carinfodata.AllianceCode?e.carinfodata.role="个人":e.carinfodata.role="商家",e.RP_CarPic=[],e.RP_ProcudPic=[],e.RP_FlawPic=[],e.RP_ProofPic=[],angular.forEach(o,function(a,t){0==a.PictureFlag&&e.RP_CarPic.push(a),1==a.PictureFlag&&e.RP_ProcudPic.push(a),2==a.PictureFlag&&e.RP_FlawPic.push(a),3==a.PictureFlag&&e.RP_ProofPic.push(a)}),void 0==e.carinfoimg&&(e.carinfoimg=[{CarNo:e.carinfodata.CarNo,CarPicID:"",IsDeleted:"False",PicAddr:e.carinfodata.HomePicID},{CarNo:e.carinfodata.CarNo,CarPicID:"",IsDeleted:"False",PicAddr:e.carinfodata.HomePicID}]),e.carimglist=[],void 0!=e.carinfoimg){for(var i=0,n=0,s=e.carinfoimg.length-1;s>=n;n++)6>n&&(e.carimglist[n]=e.carinfoimg[n]),i++;e.imgcount=i}if(void 0!=r)for(var l in r)1==r[l].ProblemFlag&&void 0!=r[l].X&&$("#guacha").append("<div class='e_guacha' style=\"left:"+parseInt(r[l].X/1.65)+"px; top:"+parseInt(r[l].Y/1.65)+'px;"></div>'),2==r[l].ProblemFlag&&void 0!=r[l].X&&$("#guacha").append("<div class='e_pengzhuang' style=\"left:"+parseInt(r[l].X/1.65)+"px; top:"+parseInt(r[l].Y/1.65)+'px;"></div>');var u={zdpzwt:0,pswt:0,sbwt:0,wgnswt:0,aqwt:0,fdwt:0,dzwt:0};if(void 0!=t){var p="";for(var l in t)p=parseInt(t[l].AbnormalColumn),18>=p||123==p||124==p?0==parseInt(t[l].Flag)?$("#report-"+p).addClass("report-check-wu"):($("#report-"+p).addClass("report-check-no"),$("#accident-"+p).removeClass("gcc_"+p),$("#accident-"+p).addClass("acc_"+p),u.zdpzwt++):p>=19&&31>=p?0==parseInt(t[l].Flag)?$("#report-"+p).addClass("report-check-wu"):($("#report-"+p).addClass("report-check-no"),u.zdpzwt++):p>=130&&137>=p?0==parseInt(t[l].Flag)?$("#report-"+p).addClass("report-check-wu"):($("#report-"+p).addClass("report-check-no"),u.aqwt++):p>114&&123>p||p>=158&&161>=p?0==parseInt(t[l].Flag)?$("#report-"+p).addClass("report-check-wu"):($("#report-"+p).addClass("report-check-no"),u.sbwt++,u.fdwt++):93==p||100==p||101==p||104==p||108==p||110==p||111==p||112==p||113==p||138==p||139==p||149==p||152==p?0==parseInt(t[l].Flag)||"-1"==t[l].DeviceType?($("#report-"+p).addClass("report-check-wu"),$("#report-txt-"+p).html("无")):1==parseInt(t[l].Flag)?($("#report-txt-"+p).html(t[l].Description||" "),$("#report-"+p).addClass("report-check-no"),u.sbwt++,u.dzwt++):$("#report-txt-"+p).html(t[l].Description||" "):140==p||144==p?($("#report-txt-"+p).html(t[l].Description),1==parseInt(t[l].Flag)?($("#report-"+p+"-"+t[l].DeviceType).addClass("report-check-no"),u.sbwt++,u.dzwt++):($("#report-"+p).addClass("report-check-wu"),$("#report-txt-"+p).html("无"))):157==p?($("#report-txt-"+p).html(t[l].Description||" "),$("#report-"+p).addClass("report-check-wu")):p>=64&&88>=p&&(3==parseInt(t[l].Param1)?($("#AIcheck_"+p).addClass("carAISC_"+p),u.wgnswt++):2==parseInt(t[l].Param1)?($("#AIcheck_"+p).addClass("carAIGH_"+p),u.wgnswt++):($("#AIcheck_"+p).addClass("carAIblue_"+p),u.wgnswt++))}switch(e.report_tj=u,e.AppraiserFlag_1={backgroundImage:"url(/images/shangjia-1.png)"},e.AppraiserFlag_2={backgroundImage:"url(/images/pinggushi-1.png)"},e.AppraiserFlag_3={backgroundImage:"url(/images/chetongxiang-1.png)"},parseInt(e.carinfodata.AppraiserFlag)){case 1:e.AppraiserFlag_1={backgroundImage:"url(/images/shangjia-2.png)",color:"#ff6a00"};break;case 2:e.AppraiserFlag_2={backgroundImage:"url(/images/pinggushi-2.png)",color:"#ff6a00"};break;case 3:e.AppraiserFlag_3={backgroundImage:"url(/images/chetongxiang-2.png)",color:"#ff6a00"}}}else"2"==a.status&&(window.location.href=a.data)},function(e){console.log(e.status+"错误")}):!1},e.GetCarInfo()}]),angular.module("app").controller("BuyListCtrl",["$scope","$rootScope","BuyCarList",function(e,a,t){e.title="我要买车",e.CityName="厦门",e.CarList={},e.isload=!0,e.MAction=a.state.current.action,e.GetCarList=function(){e.isload=!0,e.loadmsg="车辆加载中，请稍后...";var r={Brand:a.stateParams.BrandID||null,CarNo:a.stateParams.CarNo||null,PriceID:a.stateParams.PriceID||null,SearchValue:a.stateParams.SearchValue||null,SeriesID:a.stateParams.SeriesID||null,Style:a.stateParams.Style||null,Value:a.stateParams.Value||null,CityID:null,IncludeFlag:null,IsMobile:"1",PageNo:e.paginationConf.currentPage,PageNum:e.paginationConf.itemsPerPage||"20"};t.get(r,function(a){"1"==a.status?(e.isload=!1,e.CarList=a.data[0].value,e.CarTotal=a.count,e.paginationConf.totalItems=a.count):e.loadmsg="暂无相关车源..."},function(a){e.loadmsg="异常错误...",console.log(a.status+"错误")})},e.paginationConf={currentPage:1,itemsPerPage:20},e.$watch("paginationConf.currentPage + paginationConf.itemsPerPage",e.GetCarList)}]),angular.module("app").directive("filtercar",["$rootScope",function(e){return{restrict:"EA",transclude:!0,link:function(a,t,r){var o=e.stateParams.SearchValue||e.stateParams.Value,n=e.stateParams.BrandID,s=e.stateParams.PriceID,c=e.stateParams.Style,i=e.stateParams.SeriesID,l=e.stateParams.CarNo;(n||i)&&$(".tui-filter-result").addClass("active").find("i.tui-filter-brandTxt").text(o),s&&$(".tui-filter-result").addClass("active").find("i.tui-filter-priceTxt").text(o),c&&$(".tui-filter-result").addClass("active").find("i.tui-filter-moreTxt").text(o),l&&$(".tui-filter-result").addClass("active").find("i.tui-filter-brandTxt").text("车源号:"+l),mui(".tui-filter-nav").on("tap","a.tui-nav-item",function(){var e=$(this).attr("data-for");$(this).toggleClass("active");var a=this.classList.contains("active");a?$(".tui-mask").addClass("active"):$(".tui-mask").removeClass("active"),$(".tui-filter-type[data-role="+e+"]").toggleClass("active"),$(".tui-filter-type:not([data-role="+e+"])").removeClass("active"),$(".tui-nav-item:not([data-for="+e+"])").removeClass("active"),$(".tui-filter-result").removeClass("active")})},templateUrl:"/controllers/buy/filtercar.html",replace:!1}}]),angular.module("app").controller("ReportCtrl",["$scope","$rootScope","ReportData",function(e,a,t){mui.init(),e.isload=!0,e.GetReport=function(){var r=a.stateParams.ReportCode;if(""==r||void 0==r||null==r)return console.log("无传递检测报告编号"),!1;var o={TestReportCode:r||"6052610155736"};t.get(o,function(a){if("1"==a.status){e.isload=!1;var t,r,o;if(void 0==a.data||""==a.data)return"";for(var n=0,s=a.data.length;s>n;n++){var c=a.data[n].name;switch(c){case"Car":e.carinfodata=a.data[n].value[0];break;case"TestReportList":ReportPageList=a.data[n].value;break;case"Test_Report":e.treportdata=a.data[n].value[0];break;case"Test_ReportDetail":t=a.data[n].value;break;case"Test_ReportCarSurfaceCase":r=a.data[n].value;break;case"Test_ReportPic":o=a.data[n].value}}if(e.RP_CarPic=[],e.RP_ProcudPic=[],e.RP_FlawPic=[],e.RP_ProofPic=[],angular.forEach(o,function(a,t){0==a.PictureFlag&&e.RP_CarPic.push(a),1==a.PictureFlag&&e.RP_ProcudPic.push(a),2==a.PictureFlag&&e.RP_FlawPic.push(a),3==a.PictureFlag&&e.RP_ProofPic.push(a)}),void 0!=r)for(var i in r)1==r[i].ProblemFlag&&void 0!=r[i].X&&$("#guacha").append("<div class='e_guacha' style=\"left:"+parseInt(r[i].X/1.65)+"px; top:"+parseInt(r[i].Y/1.65)+'px;"></div>'),2==r[i].ProblemFlag&&void 0!=r[i].X&&$("#guacha").append("<div class='e_pengzhuang' style=\"left:"+parseInt(r[i].X/1.65)+"px; top:"+parseInt(r[i].Y/1.65)+'px;"></div>');var l={zdpzwt:0,pswt:0,sbwt:0,wgnswt:0,aqwt:0,fdwt:0,dzwt:0};if(void 0!=t){var u="";for(var i in t)u=parseInt(t[i].AbnormalColumn),18>=u||123==u||124==u?0==parseInt(t[i].Flag)?$("#report-"+u).addClass("report-check-wu"):($("#report-"+u).addClass("report-check-no"),$("#accident-"+u).removeClass("gcc_"+u),$("#accident-"+u).addClass("acc_"+u),l.zdpzwt++):u>=19&&31>=u?0==parseInt(t[i].Flag)?$("#report-"+u).addClass("report-check-wu"):($("#report-"+u).addClass("report-check-no"),l.zdpzwt++):u>=130&&137>=u?0==parseInt(t[i].Flag)?$("#report-"+u).addClass("report-check-wu"):($("#report-"+u).addClass("report-check-no"),l.aqwt++):u>114&&123>u||u>=158&&161>=u?0==parseInt(t[i].Flag)?$("#report-"+u).addClass("report-check-wu"):($("#report-"+u).addClass("report-check-no"),l.sbwt++,l.fdwt++):93==u||100==u||101==u||104==u||108==u||110==u||111==u||112==u||113==u||138==u||139==u||149==u||152==u?0==parseInt(t[i].Flag)||"-1"==t[i].DeviceType?($("#report-"+u).addClass("report-check-wu"),$("#report-txt-"+u).html("无")):1==parseInt(t[i].Flag)?($("#report-txt-"+u).html(t[i].Description||" "),$("#report-"+u).addClass("report-check-no"),l.sbwt++,l.dzwt++):$("#report-txt-"+u).html(t[i].Description||" "):140==u||144==u?($("#report-txt-"+u).html(t[i].Description),1==parseInt(t[i].Flag)?($("#report-"+u+"-"+t[i].DeviceType).addClass("report-check-no"),l.sbwt++,l.dzwt++):($("#report-"+u).addClass("report-check-wu"),$("#report-txt-"+u).html("无"))):157==u?($("#report-txt-"+u).html(t[i].Description||" "),$("#report-"+u).addClass("report-check-wu")):u>=64&&88>=u&&(3==parseInt(t[i].Param1)?($("#AIcheck_"+u).addClass("carAISC_"+u),l.wgnswt++):2==parseInt(t[i].Param1)?($("#AIcheck_"+u).addClass("carAIGH_"+u),l.wgnswt++):($("#AIcheck_"+u).addClass("carAIblue_"+u),l.wgnswt++))}e.report_tj=l}},function(e){console.log(e.status+"错误")})},e.GetReport()}]),angular.module("app").controller("HomeIndexCtrl",["$scope","$rootScope","HomeLoveCar",function(e,a,t){e.title="首页",e.CityName="厦门";var r=mui(".mui-slider");r.slider({interval:3e3}),$(window).on("scroll",function(e){if("home"!=a.ACTION)return!1;var t=$(window).scrollTop()+45,r=$("#toolbar").offset().top;t>r?$(".home-nav-tab").addClass("home-nav-fixed"):$(".home-nav-tab").removeClass("home-nav-fixed")}),e.LoveData={NewsList:{},JiShouList:{},ZhunXinList:{},SUVList:{}},e.LoadLoveData=function(a){return""==a&&(a=0),e.isload=!0,e.loadmsg="车辆加载中，请稍后...",e.LoveData.NewsList[0]&&"0"==a?(e.isload=!1,e.LoveData.LoveList=e.LoveData.NewsList,!0):e.LoveData.JiShouList[0]&&"1"==a?(e.isload=!1,e.LoveData.LoveList=e.LoveData.JiShouList,!0):e.LoveData.ZhunXinList[0]&&"2"==a?(e.isload=!1,e.LoveData.LoveList=e.LoveData.ZhunXinList,!0):e.LoveData.SUVList[0]&&"4"==a?(e.isload=!1,e.LoveData.LoveList=e.LoveData.SUVList,!0):void t.get({CarType:a,City:"0"},function(t){"1"==t.status?(e.isload=!1,e.LoveData.LoveList=t.data,"0"==a?e.LoveData.NewsList=t.data:"1"==a?e.LoveData.JiShouList=t.data:"2"==a?e.LoveData.ZhunXinList=t.data:"4"==a&&(e.LoveData.SUVList=t.data)):e.loadmsg="暂无相关车源..."},function(a){e.loadmsg="异常错误...",console.log(a.status+"错误")})},e.LoadLoveData(0),e.LoadLoveData(1),e.LoadLoveData(2),e.LoadLoveData(4)}]),angular.module("app").controller("HomeNotFoundCtrl",["$scope",function(e){e.vm={}}]),angular.module("app").controller("SellPageCtrl",["$scope","$rootScope","SellCarTotal","SellCarJoin",function(e,a,t,r){e.title="我要卖车",scroll(0,0),e.GetCarTotal=function(){t.then(function(a){"200"==a.status&&(e.carcount=a.data)})},e.sell=function(){var a={ContactPhone:e.phone,EventFlag:0,Contact:"",CityID:"",CityName:""};e.phone&&r.get(a,function(e){"1"==e.status?console.log("您的卖车邀请已提交，客服人员将与您联系！"):console.log("提交错误")},function(e){console.log(e.status+"错误")})}}]),angular.module("app").controller("MyMainCtrl",["$scope","$rootScope","BuyInfoData",function(e,a,t){}]),angular.module("app").filter("page",function(){return function(e,a,t){if(!e)return e;if(0>a||0>=t)return[];var r=a*t,o=(a+1)*t;return e.slice(r,o)}}).filter("DateTimeFormat",function(){return function(e,a){if(e){e=e.replace(/\-/g,"/");var t=new Date(e);return t.Format(a)}return"未知"}}).filter("bigimg",function(){return function(e){var a;if(void 0==e||null==e)return"";var t=e.lastIndexOf("."),r=e.substring(0,t),o=e.substring(t,e.length);return a=r+"_Big"+o}}).filter("FilterCarNo",function(){return function(e){if(!e)return"";var a=new String,t=0;a=e,t=a.length;var r=a.substring(0,1)+" "+a.substring(1,5)+" "+a.substring(5,9)+" "+a.substring(9,t);return r}}).filter("CDateFormat",function(){return function(e,a,t){if(e){var r=new Date(e),o="";if(t){if(!(t>=2))return o=r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate();r.setDate(r.getDate()+t)}switch(a){case 0:o=r.getFullYear();break;case 1:o=r.getMonth()+1;break;case 2:o=r.getDate();break;default:o=r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate()}return o}}}).filter("FilterCarGearBox",function(){return function(e){var a="";if(e>8)return"未知";switch(e+=""){case"0":a="未知";break;case"1":a="手动";break;case"2":a="自动"}return a}}).filter("ColorFilter",function(){return function(e){var a="";switch(e=parseInt(e)){case 0:a="未知";break;case 1:a="黑色";break;case 2:a="白色";break;case 3:a="银灰色";break;case 4:a="深灰色";break;case 5:a="红色";break;case 6:a="橙色";break;case 7:a="多彩色";break;case 8:a="绿色";break;case 9:a="蓝色";break;case 10:a="咖啡色";break;case 11:a="紫色";break;case 12:a="香槟色";break;case 3:a="黄色";break;case 14:a="其它"}return a}}).filter("OwnerType",function(){return function(e){var a="";switch(e+=""){case"0":a="个人";break;case"1":a="个人";break;case"2":a="公用";break;case"3":a="租赁"}return a}}).filter("UseType",function(){return function(e){var a="";switch(e+=""){case"0":a="非营运";break;case"1":a="非营运";break;case"2":a="营运";break;case"3":a="营转非";break;case"4":a="军转挂"}return a}}),angular.module("tm.pagination",[]).directive("tmPagination",[function(){return{restrict:"EA",template:'<div class="page-list"><ul class="pagination" ng-show="conf.totalItems > 0"><li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li><li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ng-click="changeCurrentPage(item)"><span>{{ item }}</span></li><li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li></ul><div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div></div>',replace:!0,scope:{conf:"="},link:function(e,a,t){function r(){e.conf.currentPage=parseInt(e.conf.currentPage)?parseInt(e.conf.currentPage):1,e.conf.totalItems=parseInt(e.conf.totalItems),e.conf.rememberPerPage?(parseInt(localStorage[e.conf.rememberPerPage])||(localStorage[e.conf.rememberPerPage]=parseInt(e.conf.itemsPerPage)?parseInt(e.conf.itemsPerPage):15),e.conf.itemsPerPage=parseInt(localStorage[e.conf.rememberPerPage])):e.conf.itemsPerPage=parseInt(e.conf.itemsPerPage)?parseInt(e.conf.itemsPerPage):15,e.conf.numberOfPages=Math.ceil(e.conf.totalItems/e.conf.itemsPerPage),e.conf.currentPage<1&&(e.conf.currentPage=1),e.conf.currentPage>e.conf.numberOfPages&&(e.conf.currentPage=e.conf.numberOfPages),e.jumpPageNum=e.conf.currentPage;for(var a,t=e.conf.perPageOptions.length,r=0;t>r;r++)e.conf.perPageOptions[r]==e.conf.itemsPerPage&&(a=!0);if(a||e.conf.perPageOptions.push(e.conf.itemsPerPage),e.conf.perPageOptions.sort(function(e,a){return e-a}),e.pageList=[],e.conf.numberOfPages<=e.conf.pagesLength)for(r=1;r<=e.conf.numberOfPages;r++)e.pageList.push(r);else{var o=(e.conf.pagesLength-1)/2;if(e.conf.currentPage<=o){for(r=1;o+1>=r;r++)e.pageList.push(r);e.pageList.push("..."),e.pageList.push(e.conf.numberOfPages)}else if(e.conf.currentPage>e.conf.numberOfPages-o){for(e.pageList.push(1),e.pageList.push("..."),r=o+1;r>=1;r--)e.pageList.push(e.conf.numberOfPages-r);e.pageList.push(e.conf.numberOfPages)}else{for(e.pageList.push(1),e.pageList.push("..."),r=Math.ceil(o/2);r>=1;r--)e.pageList.push(e.conf.currentPage-r);for(e.pageList.push(e.conf.currentPage),r=1;o/2>=r;r++)e.pageList.push(e.conf.currentPage+r);e.pageList.push("..."),e.pageList.push(e.conf.numberOfPages)}}e.conf.onChange&&e.conf.onChange(),e.$parent.conf=e.conf}e.changeCurrentPage=function(a){"..."!=a&&(e.conf.currentPage=a)},e.conf.pagesLength=parseInt(e.conf.pagesLength)?parseInt(e.conf.pagesLength):5,e.conf.pagesLength%2===0&&(e.conf.pagesLength=e.conf.pagesLength-1),e.conf.perPageOptions||(e.conf.perPageOptions=[10,15,20,30,50]),e.prevPage=function(){e.conf.currentPage>1&&(e.conf.currentPage-=1)},e.nextPage=function(){e.conf.currentPage<e.conf.numberOfPages&&(e.conf.currentPage+=1)},e.jumpToPage=function(){e.jumpPageNum=e.jumpPageNum.replace(/[^0-9]/g,""),""!==e.jumpPageNum&&(e.conf.currentPage=e.jumpPageNum)},e.changeItemsPerPage=function(){e.conf.rememberPerPage&&localStorage.removeItem(e.conf.rememberPerPage)},e.$watch(function(){var a=e.conf.currentPage+" "+e.conf.totalItems+" ";return a+=e.conf.rememberPerPage&&localStorage[e.conf.rememberPerPage]?localStorage[e.conf.rememberPerPage]:e.conf.itemsPerPage},r)}}}]),angular.module("app").provider("ApiHandler",function(){var e="";this.setBaseUrl=function(a){e=a.replace(/\/$/,"")};var a=/^\/api/;this.setPattern=function(e){a=e},this.$get=["$q",function(t){var r={};return r.request=function(r){return r.url.match(a)&&(r.url=r.url.replace(a,e)),t.when(r)},r}]}),angular.module("app").factory("AuthHandler",["$q",function(e){var a={};return a.request=function(a){return a.data&&a.data.$skipAuthHandler&&(a.$skipAuthHandler=!0,delete a.data.$skipAuthHandler),a.params&&a.params.$skipAuthHandler&&(a.$skipAuthHandler=!0,delete a.params.$skipAuthHandler),e.when(a)},a.responseError=function(a){if(401!==a.status||!a.config||a.config.$skipAuthHandler||a.config.url.match(/.*\/captcha.jpg$/))return e.reject(a);var t=e.defer();return console.error("请自行实现登录重试逻辑，参见http://witoldsz.github.io/angular-http-auth/"),t.promise},a}]),angular.module("app").factory("ErrorHandler",["$q","$injector",function(e,a){var t={};return t.request=function(a){return a.data&&a.data.$skipErrorHandler&&(a.$skipErrorHandler=!0,delete a.data.$skipErrorHandler),a.params&&a.params.$skipErrorHandler&&(a.$skipErrorHandler=!0,delete a.params.$skipErrorHandler),e.when(a)},t.responseError=function(t){if(401===t.status)return e.reject(t);var r=a.get("ui");if(t.config&&!t.config.$skipErrorHandler)switch(t.status){case 0:break;case 422:var o=t.data||{};angular.isString(o)&&(o=angular.fromJson(o));var n=o.message||o.code;r.error(n);break;case 403:r.error("您没有权限访问此功能："+t.config.method+" "+t.config.url);break;case 404:r.error("您请求的功能不存在："+t.config.method+" "+t.config.url);break;case 406:r.error("内部错误：数据格式不正确！");break;case 500:r.error("内部错误："+t.status+" - "+t.data);break;default:r.error("其他错误："+t.status+" - "+t.data)}return e.reject(t)},t}]),angular.module("app").factory("LoadingHandler",["$rootScope","$q",function(e,a){var t={},r=0,o=function(a){e.$broadcast("loading.level",a)},n=function(){e.$broadcast("loading.begin")},s=function(){e.$broadcast("loading.end")},c=function(){++r,1===r&&n(),o(r)},i=function(){--r,o(r),0===r&&s()};return t.request=function(e){return c(),a.when(e)},t.response=function(e){return i(),a.when(e)},t.responseError=function(e){return i(),a.reject(e)},t}]),angular.module("app").factory("HomeLoveCar",["$resource",function(e){return e("/Common/Car/RequestHomeData?CarType=:CarType&City=:City",{CarType:"@CarType",City:"@City"})}]).factory("BuyCarList",["$resource",function(e){return e("/Common/Car/SearchCarForMobile",{CityID:"@CityID",IncludeFlag:"@IncludeFlag",IsMobile:"@IsMobile",PageNo:"@PageNo",PageNum:"@PageNum",Brand:"@Brand",PriceID:"@PriceID",SearchValue:"@SearchValue",SeriesID:"@SeriesID",Style:"@Style"})}]).factory("BuyInfoData",["$resource",function(e){return e("/Common/Car/GetCardata?CarNo=:CarNo",{CarNo:"@CarNo"})}]).factory("ReportData",["$resource",function(e){return e("/Alliance/TestReport/GetTestReportWithCode",{TestReportCode:"@TestReportCode"})}]).factory("SellCarTotal",["$http",function(e){return e.get("/Common/car/GetSellingCount")}]).factory("SellCarJoin",["$resource",function(e){return e("http://192.168.0.218:8082/JoinMessage/JoinMessage/AddJoinMessage",{ContactPhone:"@ContactPhone",EventFlag:"@EventFlag",Contact:"@Contact",CityID:"@CityID",CityName:"@CityName"})}]),angular.module("app").service("ui",function(){this.error=function(e){console.log(e)}}),angular.module("app").service("utils",function(){this.getControllerCss=function(e){if(!e||!angular.isString(e))return"";var a=e.match(/(\w+)Ctrl\s+as\s+vm/)||e.match(/(\w+)Ctrl/);return a?"c-"+a[1]:""}});