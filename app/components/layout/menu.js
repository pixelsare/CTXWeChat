'use strict';

angular.module('app').controller('LayoutMenuCtrl', ["$scope", "$rootScope",
	function ($scope, $rootScope) {
		//初始化导航菜单选中状态
		$scope.ACTION = $rootScope.ACTION;

		//根据选中导航菜单，改变状态
		$scope.$on('$stateChangeSuccess', function(event, state) {
			$scope.ACTION = $rootScope.ACTION;
		});
	}
]);

angular.module('app').directive('layoutMenu', ['$rootScope',
	function ($rootScope) {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: 'components/layout/menu.html',
			controller: 'LayoutMenuCtrl',
		};
	}
]);