const Controller = require('egg').Controller;
const formidable = require("formidable");
const iconv = require("iconv-lite");
class userControl extends Controller {
	async parse(req) {
		const form = new formidable.IncomingForm();
		return new Promise((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				resolve({
					fields,
					files
				});
			});
		});
	}
	/**
	 * 获取用户信息: GET http://127.0.0.1:7001/lamer/getUserInfo?mixnick=test01
	 *
	 * @param { mixnick: String }
	 * @returns { data: Object }
	 */
	async getUserInfo() {
		const ctx = this.ctx;
		const params = ctx.query;
		console.log("getUserInfo-params===", params);
		ctx.validate({
			mixnick: {
				type: 'string',
				required: true
			},
		}, params);
		try {
			const data = await ctx.service.userServe.getUserInfo(params);
			ctx.body = JSON.stringify(data);
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}
}
/**
 * 返回模版
 *
 * @param { message: String } 消息
 * @param { data: Object } 返回数据
 * @param { successful: Boolean } 是否成功
 * @param { code: Number } 错误代码
 * @returns { Object }
 */
function resData(message, data, successful, code) {
	var obj = {
		"message": message,
		"data": data,
		"successful": successful,
		"code": code,
	};
	return obj;
}
module.exports = userControl;