const Controller = require('egg').Controller;

//DEMO 示例
class demo extends Controller {

	// url上传cdn
	//cdn默认为vrybuy空间
	async imgUrlUpload() {
		const { ctx } = this;

		ctx.validate({
			url: { type: 'string', required: true }
		}, ctx.request.body);

		//console.log(' ctx.request.body.url~ ', ctx.request.body.url, typeof(ctx.request.body.url));
		//返回体
		let retObj = new Object();
		try{
			const cdnurl = await ctx.service.sdk.imgServe.imgUrlUpload(ctx.request.body.url,'/mmd');
			retObj.cdnUrl = cdnurl;
			ctx.body = JSON.stringify(retObj);
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}

	// base64上传cdn
	async base64Upload() {
		const { ctx } = this;
		const stream = await this.ctx.getFileStream();

		let retObj = new Object();
		try{
			const cdnurl = await ctx.service.sdk.imgServe.base64Upload(stream,'/mmd');
			retObj.cdnUrl = cdnurl;
			ctx.body = JSON.stringify(retObj);
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}

	async base64UploadStr(){
		console.log('base64UploadStr====================');
        this.logger.info('base64UploadStr');
        const { ctx } = this;
         ctx.validate({
            baseData: { type: 'string', required: true }
        }, ctx.request.body);
        let retObj = new Object();
        try {
            const cdnurl = await ctx.service.sdk.imgServe.base64UploadStr(ctx.request.body.baseData, '/lamer/base64');
            retObj.cdnUrl = cdnurl;
            this.logger.info(cdnurl);
            ctx.body = JSON.stringify(retObj);
        } catch (err) {
            this.logger.error(JSON.stringify(err));
            ctx.body = JSON.stringify(err);
        }
    }

	// 肌肤检测
	async skinDetect() {
		const { ctx } = this;

		ctx.validate({
			url    : { type: 'string', required: true },
			mixnick: { type: 'string', required: true },
		}, ctx.request.body);

		//console.log(' skinDetect, ctx.request.body.url~ ', ctx.request.body.url, ' mixnick:~ ', ctx.request.body.mixnick);
		try{
			const skinRst = await ctx.service.sdk.makeup.skinDetect(ctx.request.body.url, ctx.request.body.mixnick);
			ctx.body = JSON.stringify(skinRst);
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}

	// 脸型检测
	async faceDetect() {
		const { ctx } = this;

		ctx.validate({
			url    : { type: 'string', required: true },
			mixnick: { type: 'string', required: true },
		}, ctx.request.body);

		//console.log(' faceDetect, ctx.request.body.url~ ', ctx.request.body.url, ' mixnick:~ ', ctx.request.body.mixnick);
		try{
			const faceRst = await ctx.service.sdk.makeup.faceDetect(ctx.request.body.url, ctx.request.body.mixnick);
			ctx.body = JSON.stringify(faceRst);
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}

	// database 示例
	async sqlTest() {
		const { ctx } = this;
		try{
			//console.log(' faceDetect, ctx.request.body.url~ ',this.app.model, this.ctx.model);
			//console.log('this is app.redis:', this.app.redis);
			//console.log('this is app.memcached:', this.app.config.memcached.set);

			//mysql 查询，返回
			/*const user = await ctx.model.MysqlDemo.findbyMixnick('test001');
			ctx.body = JSON.stringify(user);*/

			//await ctx.service.commons.cache.set('like','hello word');
			
			ctx.body = JSON.stringify('hello');
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}		
	}

	// cache 示例
	async cacheDemo() {
		const { ctx } = this;
		try{
			//const result = await ctx.service.commons.cache.set('like','this is test');
			const result = await ctx.service.commons.cache.get('like');
			ctx.body = JSON.stringify(result);
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}		
	}
}

module.exports = demo;