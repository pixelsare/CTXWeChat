'use strict';

angular.module('app').controller('HomeIndexCtrl', ["$scope", "$rootScope", "HomeLoveCar",
	function($scope, $rootScope, HomeLoveCar) {
		//页面基础初始化
		$scope.title = "首页";
		$scope.CityName = "厦门";

		//焦点广告特效
		var banner = mui(".mui-slider");
		banner.slider({
			interval: 3000
		});

		$(window).on("scroll", function(e) {
			//非首页不执行以下菜单特效
			if ($rootScope.ACTION != "home") {
				return false;
			}
			var scrollTop = $(window).scrollTop() + 45;
			var toolbar = $("#toolbar").offset().top;

			if (scrollTop > toolbar) {
				$(".home-nav-tab").addClass("home-nav-fixed");
			} else {
				$(".home-nav-tab").removeClass("home-nav-fixed");
			}
		});

		//获取首页猜你喜欢车源数据初始化
		$scope.LoveData = {
			NewsList: {},
			JiShouList: {},
			ZhunXinList: {},
			SUVList: {}
		};

		//请求API数据
		$scope.LoadLoveData = function(Type) {
			if (Type == '') {
				Type = 0;
			}
			$scope.isload = true; //默认显示数据加载中
			$scope.loadmsg = "车辆加载中，请稍后...";

			//已加载的数据，不再请求，除非刷新页面
			if ($scope.LoveData.NewsList[0] && Type == "0") {
				$scope.isload = false; //隐藏数据加载中
				$scope.LoveData.LoveList = $scope.LoveData.NewsList;
				return true;
			} else if ($scope.LoveData.JiShouList[0] && Type == "1") {
				$scope.isload = false; //隐藏数据加载中
				$scope.LoveData.LoveList = $scope.LoveData.JiShouList;
				return true;
			} else if ($scope.LoveData.ZhunXinList[0] && Type == "2") {
				$scope.isload = false; //隐藏数据加载中
				$scope.LoveData.LoveList = $scope.LoveData.ZhunXinList;
				return true;
			} else if ($scope.LoveData.SUVList[0] && Type == "4") {
				$scope.isload = false; //隐藏数据加载中
				$scope.LoveData.LoveList = $scope.LoveData.SUVList;
				return true;
			}
			//获取数据
			HomeLoveCar.get({
				CarType: Type,
				City: '0'
			}, function(s) {
				if (s.status == '1') {
					$scope.isload = false; //隐藏数据加载中
					$scope.LoveData.LoveList = s.data;
					if (Type == "0") {
						$scope.LoveData.NewsList = s.data;
					} else if (Type == "1") {
						$scope.LoveData.JiShouList = s.data;
					} else if (Type == "2") {
						$scope.LoveData.ZhunXinList = s.data;
					} else if (Type == "4") {
						$scope.LoveData.SUVList = s.data;
					}
				} else {
					$scope.loadmsg = "暂无相关车源...";
				}
			}, function(err) {
				$scope.loadmsg = "异常错误...";
				console.log(err.status + "错误");
			});

		};

		//初始化加载默认数据
		$scope.LoadLoveData(0);
		$scope.LoadLoveData(1);
		$scope.LoadLoveData(2);
		$scope.LoadLoveData(4);

	}
]);