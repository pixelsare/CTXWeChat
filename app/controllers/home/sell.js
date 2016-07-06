'use strict';

angular.module('app').controller('SellPageCtrl', ['$scope', '$rootScope', 'SellCarTotal', 'SellCarJoin',
	function ($scope, $rootScope, SellCarTotal, SellCarJoin) {
		$scope.title = "我要卖车";
		scroll(0, 0);

		//获取车源总数量
		$scope.GetCarTotal = function() {
			
			SellCarTotal.then(function(s){
				//console.log(s);
				if (s.status == '200') {
					$scope.carcount = s.data;
				}
			})
			
		}
		
		//提交我要卖车请求信息
		$scope.sell = function() {
			var param = {
				ContactPhone: $scope.phone,
				EventFlag: 0,
				Contact: '',
				CityID: '',
				CityName: ''
			}
			if ($scope.phone) {
				SellCarJoin.get(param, function(s) {
					if (s.status == '1') {
						console.log("您的卖车邀请已提交，客服人员将与您联系！");
					}else{
						console.log("提交错误");
					}
				}, function(err) {
					console.log(err.status + "错误");
				});
			}

		}
	}
]);