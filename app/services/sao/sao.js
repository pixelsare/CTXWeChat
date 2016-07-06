'use strict';

angular.module('app')

//首页获取猜你喜欢数据
.factory('HomeLoveCar', ['$resource', function HomeLoveCarFactory($resource) {
	return $resource('/Common/Car/RequestHomeData?CarType=:CarType&City=:City', {
		CarType: '@CarType',
		City: '@City'
	});
}])

//我要买车列表页数据
.factory('BuyCarList', ['$resource', function BuyCarListFactory($resource) {
	return $resource('/Common/Car/SearchCarForMobile', {
		CityID: '@CityID',
		IncludeFlag: '@IncludeFlag',
		IsMobile: '@IsMobile',
		PageNo: '@PageNo',
		PageNum: '@PageNum',
		Brand: '@Brand',
		PriceID: '@PriceID',
		SearchValue: '@SearchValue',
		SeriesID: '@SeriesID',
		Style: '@Style'
	});
}])

//车辆详情信息
.factory('BuyInfoData', ['$resource', function BuyCarListFactory($resource) {
	return $resource('/Common/Car/GetCardata?CarNo=:CarNo', {
		CarNo: '@CarNo'
	});
}])

//通过检测报告编号获取车辆及检测报告数据
.factory('ReportData', ['$resource', function ReportDataFactory($resource) {
	return $resource('/Alliance/TestReport/GetTestReportWithCode', {
		TestReportCode: '@TestReportCode'
	});
}])

//我要卖车获取车源数量
.factory('SellCarTotal', ['$http', function SellCarTotalFactory($http) {
	return $http.get('/Common/car/GetSellingCount');
}])

//我要卖车提交卖车请求
.factory('SellCarJoin', ['$resource', function SellCarJoinFactory($resource) {
	return $resource('http://192.168.0.218:8082/JoinMessage/JoinMessage/AddJoinMessage', {
		ContactPhone: '@ContactPhone',
		EventFlag: '@EventFlag',
		Contact: '@Contact',
		CityID: '@CityID',
		CityName: '@CityName'
	});
}]);
