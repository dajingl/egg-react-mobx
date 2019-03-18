
module.exports = app => {
  app.get('/status.check', app.controller.app.status);
	app.get('/api/article/list', app.controller.app.list);
  app.get('/api/article/:id', app.controller.app.detail);
  
  //获取用户信息
	app.get('/lamer/getUserInfo', app.controller.userControl.getUserInfo);
  
  // 示例
	// func: 上传图片至cdn;   param：图片url
	app.post('/image/url', app.controller.demo.imgUrlUpload);
	// func: 上传图片至cdn;   param：图片base64
	app.post('/image/base64', app.controller.demo.base64Upload);
	// func: 肌肤检测接口 
	app.post('/makeup/skindetect', app.controller.demo.skinDetect);
	// func: 脸型检测接口 
	app.post('/makeup/facedetect', app.controller.demo.faceDetect);
	// func: sql test 
	app.post('/makeup/sqltest', app.controller.demo.sqlTest);

  app.get('/*', app.controller.app.client);
};
