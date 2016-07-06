'use strict';

module.exports = function (config) {
  //可以定义多条规则，后面的规则会覆盖前面的
  config.name = 'app';
  config.rules = [
    {
      url: '^/(Common|Car|account|order|Alliance|oa|direct|JoinMessage\/JoinMessage)', // 要代理的url，可以是正则表达式，也可以是字符串，如果是字符串(假设为'/api')则将被处理成/^\/api\/(.*)$/的形式
      rewrite: '$2',  // 可选，默认把原来的url完全传过来，即：不重写
      proxy: 'http://192.168.0.218:8082/', // 反向代理设置
      //proxy: 'http://wx.chetongxiang.com/',
      cookie: {
        path: '/',
        domain: '192.168.0.218'
        //domain: 'wx.chetongxiang.com'
      },
      delay: 500  // 延迟毫秒数，可选
    },
    {
      url: '^/Common/Car/RequestHomeData',
      delay: 3000
    }
  ];
  // 用户自定义的middleware将优先于默认的
  config.middlewares = [
    function (req, res, next) {
      next();
    }
  ];
};
