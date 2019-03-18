const fs = require('fs');

process.env.VUE_ENV = 'server';
//console.log(process.env);
//ews docker
process.env.RUN_ENV = 'LOCAL';
if(process.env.EGG_SERVER_ENV === 'prod' && process.env.npm_config_prefix === '/acs/user/local/node'){
	process.env.RUN_ENV = 'EWS';
	var con = fs.readFileSync('/acs/conf/env.properties', 'utf8');
	var res = con.match(/port.slbhttps0=(.*)/);
	// var res = con.match(/port.NODE_PORT=(.*)/);
	process.env.PORT = res[1];
	console.log(res[1]);
}

if(process.env.EGG_SSL === 'true'){
	require('egg').startCluster({
		baseDir: __dirname,
		workers: 1,
		port: process.env.PORT,
		https:{
			key:"key.pem",
			cert:"cert.pem"
		}
	});
}else{
	require('egg').startCluster({
		baseDir: __dirname,
		workers: 1,
		port: process.env.PORT
	});
}

