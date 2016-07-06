'use strict';

angular.module('app').controller('BuyListCtrl', ['$scope', '$rootScope', 'BuyCarList',
	function($scope, $rootScope, BuyCarList) {
		//初始化页面数据
		$scope.title = "我要买车";
		$scope.CityName = "厦门";
		$scope.CarList = {};
		$scope.isload = true;

		$scope.MAction = $rootScope.state.current.action;

		//console.log($rootScope.stateParams);

		//获取车源列表数据
		$scope.GetCarList = function() {
			$scope.isload = true; //默认显示数据加载中
			$scope.loadmsg = "车辆加载中，请稍后...";

			var params = {
				Brand: $rootScope.stateParams.BrandID || null,
				CarNo: $rootScope.stateParams.CarNo || null,
				PriceID: $rootScope.stateParams.PriceID || null,
				SearchValue: $rootScope.stateParams.SearchValue || null,
				SeriesID: $rootScope.stateParams.SeriesID || null,
				Style: $rootScope.stateParams.Style || null,
				Value: $rootScope.stateParams.Value || null,
				CityID: null,
				IncludeFlag: null,
				IsMobile: '1',
				PageNo: $scope.paginationConf.currentPage,
				PageNum: $scope.paginationConf.itemsPerPage || '20'
			}

			BuyCarList.get(params, function(s) {
				if (s.status == '1') {
					$scope.isload = false;
					$scope.CarList = s.data[0].value;
					$scope.CarTotal = s.count;

					$scope.paginationConf.totalItems = s.count;
				} else {
					$scope.loadmsg = "暂无相关车源...";
				}
			}, function(err) {
				$scope.loadmsg = "异常错误...";
				console.log(err.status + "错误");
			});
		}

		//配置分页基本参数
		$scope.paginationConf = {
			currentPage: 1,
			itemsPerPage: 20
		};

		/***************************************************************
		当页码和页面记录数发生变化时监控后台查询
		如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。 
		***************************************************************/
		$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.GetCarList);

		//初始化加载车源列表数据
		//$scope.GetCarList();

	}
]);

angular.module('app').directive('filtercar', ['$rootScope', function($rootScope) {
	return {
		restrict: 'EA',
		transclude: true,
		link: function(scope, elem, attrs) {
			var searchvalue = $rootScope.stateParams.SearchValue || $rootScope.stateParams.Value;
			var brand = $rootScope.stateParams.BrandID;
			var price = $rootScope.stateParams.PriceID;
			var style = $rootScope.stateParams.Style;
			var series = $rootScope.stateParams.SeriesID;
			var carno = $rootScope.stateParams.CarNo;
			if (brand || series) {
				$('.tui-filter-result').addClass('active').find('i.tui-filter-brandTxt').text(searchvalue);
			}
			if (price) {
				$('.tui-filter-result').addClass('active').find('i.tui-filter-priceTxt').text(searchvalue);
			}
			if (style) {
				$('.tui-filter-result').addClass('active').find('i.tui-filter-moreTxt').text(searchvalue);
			}
			if (carno) {
				$('.tui-filter-result').addClass('active').find('i.tui-filter-brandTxt').text('车源号:' + carno);
			}
			//筛选类别
			mui('.tui-filter-nav').on('tap', 'a.tui-nav-item', function() {
					var role = $(this).attr('data-for');
					$(this).toggleClass('active');
					var active = this.classList.contains('active');
					if (active) {
						$('.tui-mask').addClass('active')
					} else {
						$('.tui-mask').removeClass('active')
					}
					$('.tui-filter-type[data-role=' + role + ']').toggleClass('active');
					$('.tui-filter-type:not([data-role=' + role + '])').removeClass('active');
					$('.tui-nav-item:not([data-for=' + role + '])').removeClass('active');
					$('.tui-filter-result').removeClass('active');

				})
				//排序
		},
		templateUrl: '/controllers/buy/filtercar.html',
		replace: false

	}
}])