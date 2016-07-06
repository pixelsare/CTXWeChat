'use strict';

angular.module('app').controller('ReportCtrl', ['$scope', '$rootScope', 'ReportData',
	function($scope, $rootScope, ReportData) {
		mui.init();

		$scope.isload = true;

		//获取车源列表数据
		$scope.GetReport = function() {
			var ReportCode = $rootScope.stateParams.ReportCode;
			if (ReportCode == "" || ReportCode == undefined || ReportCode == null) {
				console.log("无传递检测报告编号");
				return false;
			};

			var params = {
				'TestReportCode': ReportCode || '6052610155736'
			};

			ReportData.get(params, function(d) {
				if (d.status == '1') {
					$scope.isload = false;
					var ReportDetail, SurfaceCase, ReportPic;

					if (d.data == undefined || d.data == "") {
						return "";
					}

					for (var i = 0, ln = d.data.length; i < ln; i++) {
						var tabname = d.data[i].name;
						switch (tabname) {
							case "Car":
								$scope.carinfodata = d.data[i].value[0];
								break;
							case "TestReportList":
								ReportPageList = d.data[i].value;
								break;
							case "Test_Report":
								$scope.treportdata = d.data[i].value[0];
								break;
							case "Test_ReportDetail":
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
					}

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

					if (SurfaceCase != undefined) {
						for (var k in SurfaceCase) {
							if (SurfaceCase[k].ProblemFlag == 1 && SurfaceCase[k].X != undefined) {
								$("#guacha").append("<div class='e_guacha' style=\"left:" + parseInt(SurfaceCase[k].X / 1.65) + "px; top:" + parseInt(SurfaceCase[k].Y / 1.65) + "px;\"></div>");
							}
							if (SurfaceCase[k].ProblemFlag == 2 && SurfaceCase[k].X != undefined) {
								$("#guacha").append("<div class='e_pengzhuang' style=\"left:" + parseInt(SurfaceCase[k].X / 1.65) + "px; top:" + parseInt(SurfaceCase[k].Y / 1.65) + "px;\"></div>");
							}
						}
					}

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
				}
			}, function(err) {
				console.log(err.status + "错误");
			});
		}

		$scope.GetReport();
	}
]);