'use strict';

angular.module('app').run(['$rootScope', '$state', '$stateParams',
	function($rootScope, $state, $stateParams) {

		$rootScope.state = $state;
		$rootScope.stateParams = $stateParams;

		$rootScope.$on('$stateChangeSuccess', function() {
			if ($state.current.action) {
				$rootScope.ACTION = $state.current.action;
			} else {
				$rootScope.ACTION = "home";
			}
		});

	}
]);