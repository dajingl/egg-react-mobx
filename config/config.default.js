const ALY = require('aliyun-sdk');
const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  //csrf 配置
	exports.security = {
		csrf: {
			// queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
			// bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
			// headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
			enable: false,
			ignoreJSON: true
		},
		// 白名单
		domainWhiteList: ['http://127.0.0.1:7001']
  };
  
	// //egg-cors 配置
	exports.cors = {
		origin: '*',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
		credentials: true
	};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.view = {
		cache: false
  };
  
  // exports.reactssr = {
	// 	layout: path.join(app.baseDir, 'app/web/layout.jsx'),
  // };

  //log目录
	if (process.env.RUN_ENV === 'EWS') {
		exports.logger = {
			consoleLevel: 'DEBUG',
			dir: '/acs/log'
		};
	} else {
		exports.logger = {
			consoleLevel: 'DEBUG',
			dir: path.join(app.baseDir, 'logs')
		};
  }
  
  //public目录
	exports.static = {
		prefix: '/public/',
		dir: path.join(app.baseDir, 'public')
  };
  
  //临时文件目录
	exports.temp = {
		prefix: '/tempfile/',
		dir: path.join(app.baseDir, 'tempfile')
	};

  //数据库配置 //生产环境
	if (process.env.RUN_ENV === 'EWS') {
		// dialect support: mysql, mariadb, postgres, mssql
		exports.sequelize = {
			dialect: 'mysql',
			database: 'vr_ar_db',
			host: 'rm-vy11c089x8i1v9x3n.mysql.rds.aliyuncs.com',
			port: 3306,
			username: 'morefun',
			password: 'GuE0RcRDzY66TN21',
			timezone: "+08:00",
		};
	} else {
		//西安，开发环境
		exports.sequelize = {
			dialect: 'mysql',
			database: 'vrbuy',
			host: '192.168.1.129',
			port: 3306,
			username: 'root',
			password: 'morefun1004',
			timezone: "+08:00",
		};
  }
  
  //缓存配置 //生产环境, 阿里云ews memcached
	if (process.env.RUN_ENV === 'EWS') {
		exports.memcached = ALY.MEMCACHED.createClient(11211, '395878472a5144fb.m.jst.cnhzalicm10pub001.ocs.aliyuncs.com', {
			username: '395878472a5144fb',
			password: 'moreFun1004'
		});
	} else {
		//西安，开发环境，redis
		exports.redis = {
			client: {
				port: 6379, // Redis port
				host: '192.168.1.129', // Redis host
				password: 'auth',
				db: 0,
			}
		};
	}

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];

  exports.bodyParser = {
		enable: true,
		encoding: 'utf8',
		formLimit: '100mb',
		jsonLimit: '100mb',
		strict: true,
		// @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
		queryString: {
			arrayLimit: 100,
			depth: 5,
			parameterLimit: 1000,
		},
	};
  
  return exports;
};
