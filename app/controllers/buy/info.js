'use strict';

angular.module('app').controller('BuyInfoCtrl', ['$scope', '$rootScope', 'BuyInfoData',
	function BuyInfoCtrl($scope, $rootScope, BuyInfoData) {
		//初始化页面数据
		$scope.title = "车辆信息";
		$scope.isload = true;

		var imglist = mui(".mui-slider");
		imglist.slider();

		//获取车源列表数据
		$scope.GetCarInfo = function() {
			if (!$rootScope.stateParams.CarNo) {
				return false;
			}

			BuyInfoData.get({
				CarNo: $rootScope.stateParams.CarNo
			}, function(d) {

				if (d.status == '1') {
					$scope.isload = false;

					var ReportDetail, SurfaceCase, ReportPic;
					for (var i = 0, ln = d.data.length; i < ln; i++) {
						var tabname = d.data[i].name;
						switch (tabname) {
							case "Car":
								$scope.carinfodata = d.data[i].value[0];
								if ($scope.carinfodata.CarFlag == 1) {
									$scope.theprice = "交易中...";
									$scope.newsprice = $scope.carinfodata.NewCarPrice / 10000 + "万";
								} else {
									$scope.theprice = $scope.carinfodata.Price / 10000 + "万";
									$scope.newsprice = $scope.carinfodata.NewCarPrice / 10000 + "万";
								}
								break;
							case "CarPic":
								$scope.carinfoimg = d.data[i].value;
								break;
							case "TestReportList":
								ReportPageList = d.data[i].value;
								break;
							case "Test_Report":
								$scope.treportdata = d.data[i].value[0];
								break;
							case "Test_ReportDetail":
								$scope.ReportDetail = d.data[i].value;
								ReportDetail = d.data[i].value;
								break;
							case "Test_ReportCarSurfaceCase":
								SurfaceCase = d.data[i].value;
								break;
							case "Test_ReportPic":
								ReportPic = d.data[i].value;
								break;
							default:
								break;
						}
					};

					if ($scope.carinfodata.AllianceCode == null || $scope.carinfodata.AllianceCode == "") {
						$scope.carinfodata.role = "个人";
					} else {
						$scope.carinfodata.role = "商家";
					};

					$scope.RP_CarPic = [];
					$scope.RP_ProcudPic = [];
					$scope.RP_FlawPic = [];
					$scope.RP_ProofPic = [];

					angular.forEach(ReportPic, function(obj, index) {
						if (obj.PictureFlag == 0) {
							$scope.RP_CarPic.push(obj);
						}
						if (obj.PictureFlag == 1) {
							$scope.RP_ProcudPic.push(obj);
						}
						if (obj.PictureFlag == 2) {
							$scope.RP_FlawPic.push(obj);
						}
						if (obj.PictureFlag == 3) {
							$scope.RP_ProofPic.push(obj);
						}
					});

					if ($scope.carinfoimg == undefined) {
						$scope.carinfoimg = [{
							CarNo: $scope.carinfodata.CarNo,
							CarPicID: "",
							IsDeleted: "False",
							PicAddr: $scope.carinfodata.HomePicID,
						}, {
							CarNo: $scope.carinfodata.CarNo,
							CarPicID: "",
							IsDeleted: "False",
							PicAddr: $scope.carinfodata.HomePicID,
						}];
					};

					$scope.carimglist = [];
					if ($scope.carinfoimg != undefined) {
						var thumbhtml = "";
						var count = 0;
						for (var i = 0, ln = $scope.carinfoimg.length - 1; i <= ln; i++) {
							if (i < 6) {
								$scope.carimglist[i] = $scope.carinfoimg[i];
							}
							count++;
						}
						$scope.imgcount = count;
					};

					if (SurfaceCase != undefined) {
						for (var k in SurfaceCase) {
							if (SurfaceCase[k].ProblemFlag == 1 && SurfaceCase[k].X != undefined) {
								$("#guacha").append("<div class='e_guacha' style=\"left:" + parseInt(SurfaceCase[k].X / 1.65) + "px; top:" + parseInt(SurfaceCase[k].Y / 1.65) + "px;\"></div>");
							}
							if (SurfaceCase[k].ProblemFlag == 2 && SurfaceCase[k].X != undefined) {
								$("#guacha").append("<div class='e_pengzhuang' style=\"left:" + parseInt(SurfaceCase[k].X / 1.65) + "px; top:" + parseInt(SurfaceCase[k].Y / 1.65) + "px;\"></div>");
							}
						}
					};

					var tj = {
						//排除重大碰撞
						zdpzwt: 0,
						//排除泡水
						pswt: 0,
						//设备检测
						sbwt: 0,
						//外观修复检查
						wgnswt: 0,
						//车辆安全
						aqwt: 0,
						//发动机舱
						fdwt: 0,
						//电子设备
						dzwt: 0
					};

					if (ReportDetail != undefined) {

						var rd = "";

						for (var k in ReportDetail) {

							rd = parseInt(ReportDetail[k].AbnormalColumn);
							if (rd <= 18 || rd == 123 || rd == 124) {
								//重大事故
								if (parseInt(ReportDetail[k].Flag) == 0) {
									$("#report-" + rd).addClass("report-check-wu");
								} else {
									$("#report-" + rd).addClass("report-check-no");
									$("#accident-" + rd).removeClass("gcc_" + rd);
									$("#accident-" + rd).addClass("acc_" + rd);
									tj.zdpzwt++;
								}
							} else if (19 <= rd && rd <= 31) {
								//排除泡水火烧
								if (parseInt(ReportDetail[k].Flag) == 0) {
									$("#report-" + rd).addClass("report-check-wu");
								} else {
									$("#report-" + rd).addClass("report-check-no");
									tj.zdpzwt++;
								}
							} else if (130 <= rd && rd <= 137) {
								//车辆安全
								if (parseInt(ReportDetail[k].Flag) == 0) {
									$("#report-" + rd).addClass("report-check-wu");
								} else {
									$("#report-" + rd).addClass("report-check-no");
									tj.aqwt++;
								}
							} else if ((114 < rd && rd < 123) || (158 <= rd && rd <= 161)) {
								//发动机舱
								if (parseInt(ReportDetail[k].Flag) == 0) {
									$("#report-" + rd).addClass("report-check-wu");
								} else {
									$("#report-" + rd).addClass("report-check-no");
									tj.sbwt++;
									tj.fdwt++;
								}
							} else if (rd == 93 || rd == 100 || rd == 101 || rd == 104 || rd == 108 || rd == 110 || rd == 111 || rd == 112 || rd == 113 || rd == 138 || rd == 139 || rd == 149 || rd == 152) {
								//电子设备检测
								if (parseInt(ReportDetail[k].Flag) == 0 || ReportDetail[k].DeviceType == '-1') {
									$("#report-" + rd).addClass("report-check-wu");
									$("#report-txt-" + rd).html('无');
								} else if (parseInt(ReportDetail[k].Flag) == 1) {
									$("#report-txt-" + rd).html(ReportDetail[k].Description || ' ');
									$("#report-" + rd).addClass("report-check-no");
									tj.sbwt++;
									tj.dzwt++;
								} else {
									$("#report-txt-" + rd).html(ReportDetail[k].Description || ' ');
								}
							} else if (rd == 140 || rd == 144) {
								//电子设备检测
								$("#report-txt-" + rd).html(ReportDetail[k].Description);
								if (parseInt(ReportDetail[k].Flag) == 1) {
									$("#report-" + rd + "-" + ReportDetail[k].DeviceType).addClass("report-check-no");
									tj.sbwt++;
									tj.dzwt++;
								} else {
									$("#report-" + rd).addClass("report-check-wu");
									$("#report-txt-" + rd).html('无');
								}
							} else if (rd == 157) {
								$("#report-txt-" + rd).html(ReportDetail[k].Description || ' ');
								$("#report-" + rd).addClass("report-check-wu");
							} else {

								if (64 <= rd && rd <= 88) {
									if (parseInt(ReportDetail[k].Param1) == 3) {
										$("#AIcheck_" + rd).addClass("carAISC_" + rd);
										tj.wgnswt++;
									} else if (parseInt(ReportDetail[k].Param1) == 2) {
										$("#AIcheck_" + rd).addClass("carAIGH_" + rd);
										tj.wgnswt++;
									} else {
										$("#AIcheck_" + rd).addClass("carAIblue_" + rd);
										tj.wgnswt++;
									}
								}
							}
						}
					}

					$scope.report_tj = tj;
					$scope.AppraiserFlag_1 = {
						backgroundImage: 'url(/images/shangjia-1.png)'
					}
					$scope.AppraiserFlag_2 = {
						backgroundImage: 'url(/images/pinggushi-1.png)'
					}
					$scope.AppraiserFlag_3 = {
						backgroundImage: 'url(/images/chetongxiang-1.png)'
					}
					switch (parseInt($scope.carinfodata.AppraiserFlag)) {
						case 1:
							$scope.AppraiserFlag_1 = {
								backgroundImage: 'url(/images/shangjia-2.png)',
								color: '#ff6a00'
							}
							break;
						case 2:
							$scope.AppraiserFlag_2 = {
								backgroundImage: 'url(/images/pinggushi-2.png)',
								color: '#ff6a00'
							}
							break;
						case 3:
							$scope.AppraiserFlag_3 = {
								backgroundImage: 'url(/images/chetongxiang-2.png)',
								color: '#ff6a00'
							}
							break;
						default:
							break;
					}

				} else if (d.status == "2") {
					//跳转到PC页面
					window.location.href = d.data;
				}
			}, function(err) {
				console.log(err.status + "错误");
			});
		}

		//初始化加载车源列表数据
		$scope.GetCarInfo();

	}
]);