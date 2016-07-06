'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider.state('default', {
			url: '',
			templateUrl: 'controllers/home/index.html',
			controller: 'HomeIndexCtrl',
			action: 'home'
		});

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'controllers/home/index.html',
			controller: 'HomeIndexCtrl',
			action: 'home'
		});

		$stateProvider.state('buy', {
			url: '/buy',
			template: '<div ui-view></div>',
			abstract: true,
			action: 'buy'
		});

		$stateProvider.state('buy.list', {
			url: '/list?BrandID&SeriesID&PriceID&Style&SearchValue&&Value&CarNo',
			templateUrl: 'controllers/buy/list.html',
			controller: 'BuyListCtrl as bl',
			action: 'buy'
		});

		$stateProvider.state('buy.info', {
			url: '/info/:CarNo\.html',
			templateUrl: 'controllers/buy/info.html',
			controller: 'BuyInfoCtrl as bi',
			action: 'buy'
		});

		$stateProvider.state('report', {
			url: '/report/:ReportCode\.html',
			templateUrl: 'controllers/buy/report.html',
			controller: 'ReportCtrl as vr',
			action: 'buy'
		});

		$stateProvider.state('sell', {
			url: '/sell.html',
			templateUrl: 'controllers/home/sell.html',
			controller: 'SellPageCtrl as sp',
			action: 'sell'
		});
		//我的个人中心
		$stateProvider.state('my', {
			url: '/my',
			template: '<div ui-view></div>',
			abstract: true,
			action: 'my'
		});

		$stateProvider.state('my.main', {
			url: '/main.html',
			templateUrl: 'controllers/my/main.html',
			controller: 'MyMainCtrl as mm',
			action: 'my'
		});

		$stateProvider.state('notFound', {
			url: '/notFound',
			templateUrl: 'controllers/home/notFound.html',
			controller: 'HomeNotFoundCtrl'
		});

		$urlRouterProvider.otherwise('/notFound');

		$locationProvider.html5Mode(true);

	}
]);