'use strict';

angular.module('app').controller('AppLayoutCtrl', ['$scope', 'utils',
	function($scope, utils) {
		var vm = $scope.vm = {};
		$scope.$on('$stateChangeSuccess', function(event, state) {
			vm.controllerCss = utils.getControllerCss(state.controller);
			console.log(vm);
		});
	}
]);

angular.module('app').directive('appLayout', function appLayout() {
	return {
		restrict: 'EA',
		scope: {},
		templateUrl: 'components/layout/_layout.html',
		controller: 'AppLayoutCtrl'
	};
});