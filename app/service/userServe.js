const Service = require('egg').Service;
const fs = require('fs');
const xlsx = require('node-xlsx');
const uuid = require('node-uuid');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path');
const Promise = require("bluebird");

class userServe extends Service {
	/**
	 * 获取用户数据
	 */
	async getUserInfo(params) {
		const ctx = this.ctx;
		try {			
			const results = await ctx.model.UserModel.getData(params);
			return results;
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}
}

module.exports = userServe;