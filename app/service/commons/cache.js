const Service = require('egg').Service;

class cache extends Service {
	/**
	 * set 缓存
	 *
	 * @param {key} 缓存key
	 * @param {value} 缓存内容
	 * @param {time} 缓存存储时间，本地缓存单位为ms，线上缓存单位为s。不传此参数，则默认60min
	 * @returns {result} 返回结果
	 */
	async set(key,value,time){
		const { ctx } = this;

		if(process.env.RUN_ENV === 'EWS'){
			return new Promise((resolve,reject)=>{
				//正式环境，使用aliyun-ocs缓存, 单位：s
				time = (time ? time : 60 * 60);
				ctx.app.config.memcached.set(key, value, time, (err,data) => {
		            if (err) {
	            		ctx.logger.info('memcached set: ' + key + ' fail: ', err);
	            		reject(err);
		            }else{
		            	ctx.logger.info('memcached set: ' + key + ' success: ', data);
		            	resolve('OK');
		            }
		        });
	        });
		}else{
			//开发环境，使用redis, 单位：ms
			time = (time ? time : 60 * 60 * 1000);
			let result = await ctx.app.redis.set(key, value, 'PX', time);
			ctx.logger.info('redis set return: '+ key, ' result: ' + result);
			return result;
		}
	}

	/**
	 * get 缓存
	 *
	 * @param {key} 缓存key
 	 * @returns {result} 缓存内容
	 */
	async get(key){
		const { ctx } = this;

		if(process.env.RUN_ENV === 'EWS'){
			return new Promise((resolve,reject)=>{
				//正式环境，使用aliyun-ocs缓存
				ctx.app.config.memcached.get(key, (err,cached) => {
		            if (err) {
	            		ctx.logger.info('memcached get: ' + key + ' fail: ', err);
	            		resolve(null);
		            }else{
		            	ctx.logger.info('memcached get: ' + key + ' success: ', cached);
		            	resolve(cached);
		            }
		        });
	        });
		}else{
			//开发环境，使用redis
			const result = await ctx.app.redis.get(key);
			ctx.logger.info('redis get return: '+ key, ' result: ' + result);
			return result;
		}
	}
}

module.exports = cache;