angular.module('app').filter("page", function() {
	return function(input, page, pageSize) {
		if (!input) {
			return input;
		}
		if (page < 0 || pageSize <= 0) {
			return [];
		}
		var start = page * pageSize;
		var end = (page + 1) * pageSize;
		return input.slice(start, end);
	}
}).filter("DateTimeFormat", function() {
	return function(date, format) {
		if (date) {
			date = date.replace(/\-/g, "/");
			var d = new Date(date);
			return d.Format(format);
		}
		return "未知"
	}
}).filter('bigimg', function() {
	return function(str) {
		var strdata;
		var ret;
		if (str == undefined || str == null) {
			return '';
		} else {
			var pos = str.lastIndexOf(".");
			var iurl = str.substring(0, pos);
			var lastname = str.substring(pos, str.length);
			ret = iurl + "_Big" + lastname;
			return ret;
		}
	}
}).filter('FilterCarNo', function() {
	return function(data) {
		if (!data) {
			return '';
		}
		var str = new String;
		var sl = 0;
		str = data;
		sl = str.length;
		var rd = str.substring(0, 1) + " " + str.substring(1, 5) + " " + str.substring(5, 9) + " " + str.substring(9, sl);
		return rd;
	}
}).filter("CDateFormat", function() {
	return function(str, s, f) {
		if (str) {
			var tdate = new Date(str);
			var descr = "";
			if (f) {
				if (f >= 2) {
					tdate.setDate(tdate.getDate() + f);
				} else {
					descr = tdate.getFullYear() + "-" + (tdate.getMonth() + 1) + "-" + tdate.getDate();
					return descr;
				}
			}

			switch (s) {
				case 0:
					descr = tdate.getFullYear();
					break;
				case 1:
					descr = (tdate.getMonth() + 1);
					break;
				case 2:
					descr = tdate.getDate();
					break;
				default:
					descr = tdate.getFullYear() + "-" + (tdate.getMonth() + 1) + "-" + tdate.getDate();
					break;
			}

			return descr;
		}
	}
}).filter('FilterCarGearBox', function() {
	//车辆变速箱
	return function(status) {
		var flag = "";

		if (status > 8) {
			return '未知';
		}
		status = status + "";
		switch (status) {
			case "0":
				flag = "未知";
				break;
			case "1":
				flag = "手动";
				break;
			case "2":
				flag = "自动";
				break;
			default:
				break;
				flag = "未知";
		}
		return flag;
	}
}).filter('ColorFilter', function() {
	//车辆颜色
	return function(status) {
		var flag = "";
		status = parseInt(status)
		switch (status) {
			case 0:
				flag = "未知";
				break;
			case 1:
				flag = "黑色";
				break;
			case 2:
				flag = "白色";
				break;
			case 3:
				flag = "银灰色";
				break;
			case 4:
				flag = "深灰色";
				break;
			case 5:
				flag = "红色"
				break;
			case 6:
				flag = "橙色"
				break;
			case 7:
				flag = "多彩色"
				break;
			case 8:
				flag = "绿色"
				break;
			case 9:
				flag = "蓝色"
				break;
			case 10:
				flag = "咖啡色"
				break;
			case 11:
				flag = "紫色"
				break;
			case 12:
				flag = "香槟色"
				break;
			case 3:
				flag = "黄色"
				break;
			case 14:
				flag = "其它"
				break;
			default:
				break;
				flag = "未知";
		}
		//console.log(flag);
		return flag;
	}
}).filter('OwnerType', function() {
	//车辆类型
	return function(status) {
		var flag = "";
		status = status + "";

		switch (status) {
			case "0":
				flag = "个人";
				break;
			case "1":
				flag = "个人";
				break;
			case "2":
				flag = "公用";
				break;
			case "3":
				flag = "租赁";
				break;
			default:
				break;
				flag = "未知";
		}
		return flag;
	}
}).filter('UseType', function() {
	//使用性质
	return function(status) {
		var flag = "";
		status = status + "";

		switch (status) {
			case "0":
				flag = "非营运";
				break;
			case "1":
				flag = "非营运";
				break;
			case "2":
				flag = "营运";
				break;
			case "3":
				flag = "营转非";
				break;
			case "4":
				flag = "军转挂";
				break;
			default:
				break;
				flag = "未知";
		}
		return flag;
	}
})