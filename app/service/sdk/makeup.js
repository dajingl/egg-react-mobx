const ApiClient = require('../../../lib/taobao.js').ApiClient; //淘宝API
const Service = require('egg').Service;
const X2JS = require("x2js");
const iconv = require("iconv-lite");

//后台API，可获取头像
const config2 = {
	app_key: "23601428",
	app_secret: "18a52be2c3d6e630924c3d72b81580d9"
};
const backClient = new ApiClient({
	'appkey': config2.app_key,
	'appsecret': config2.app_secret,
	'url': 'http://gw.api.taobao.com/router/rest'
});

class makeup extends Service {

	/**
	 * 肌肤测试接口
	 *
	 * @param {url} 图片url地址
	 * @param {mixnick} 混淆昵称
	 * @returns {rstData} 肌肤检测结果
	 */
	async skinDetect(url, mixnick) {
		const {
			ctx
		} = this;
		return new Promise(function (resolve, reject) {
			backClient.execute('tmall.marketing.face.skindetect', {
				'image': url,
				'mixnick': mixnick,
				'source': 'morefun'
			}, function (error, response) {
				ctx.logger.info('skinDetect response:', response);
				if (!error) {
					try {
						let rstData = JSON.parse(response.detect_result);
						resolve(rstData);
					} catch (err) {
						reject(err);
					}
				} else {
					reject(error);
				}
			});
		});
	}

	/**
	 * 脸型检测接口
	 *
	 * @param {url} 图片url地址
	 * @param {fileType} 文件类型
	 * @returns {localPath} 临时文件地址
	 */
	async faceDetect(url, mixnick) {
		const {
			ctx
		} = this;
		return new Promise(function (resolve, reject) {
			backClient.execute('tmall.marketing.face.faceinference', {
				'image': url,
				'source': 'morefun',
				'user_id': mixnick,
				'mixnick': mixnick
			}, function (error, response) {
				ctx.logger.info('faceDetect response:', response);
				if (!error) {
					try {
						let rstData = JSON.parse(response.inference_result);
						resolve(rstData);
					} catch (err) {
						reject(err);
					}
				} else {
					reject(error);
				}
			});
		});
	}
	/**
	 * 发短信接口
	 *
	 * @param { mobile: String } 手机号
	 * @param { type: Int }
	 * @param { pcode: String }
	 * @returns { code: String } 验证码
	 */
	async send(mobile, type, pcode) {
		const ctx = this.ctx;
		const _mobile = mobile;
		const _type = type || 1;
		const _pcode = pcode || '';
		return new Promise((resolve, reject) => {
			// 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取

			var https = require('https');
			var qs = require('querystring');

			var apikey = '5babca533ce21f1550ca7cd6f9459424';
			// 修改为您要发送的手机号码，多个号码用逗号隔开
			// 修改为您要发送的短信内容
			function getValidateCode() {
				var validateCode;
				validateCode = Math.random().toString();
				validateCode = validateCode.substr(2, 4);
				return validateCode;

			}
			var code = _pcode || getValidateCode();

			var text = _type == 1 ? '【LAMER海蓝之谜官方旗舰店】您的验证码是' + code :
				'得跟客户确认这个要填什么！';

			// 查询账户信息https地址
			var get_user_info_uri = '/v2/user/get.json';
			// 智能匹配模板发送https地址
			var sms_host = 'sms.yunpian.com';
			var voice_host = 'voice.yunpian.com';

			var send_sms_uri = '/v2/sms/single_send.json';
			// 指定模板发送接口https地址
			var send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';
			// 发送语音验证码接口https地址
			var send_voice_uri = '/v2/voice/send.json';
			send_sms(send_sms_uri, apikey, _mobile, text);

			function send_sms(uri, apikey, _mobile, text) {
				var post_data = {
					'apikey': apikey,
					'mobile': _mobile,
					'text': text,
				}; //这是需要提交的数据  
				var content = qs.stringify(post_data);
				post(uri, content, sms_host);
			}

			function post(uri, content, host) {
				var options = {
					hostname: host,
					port: 443,
					path: uri,
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				};
				var req = https.request(options, function (res) {
					// console.log('send STATUS: ' + res.statusCode);  
					// console.log('send HEADERS: ' + JSON.stringify(res.headers));  
					res.setEncoding('utf8');
					res.on('data', function (chunk) {
						console.log('send BODY: ', chunk, JSON.parse(chunk).code);
						if (chunk && JSON.parse(chunk).code == 0) {
							resolve(code);
						} else {
							reject(chunk);
						}
					});
				});
				//console.log(content);
				req.write(content);

				req.end();
			}
		});
	}
	/**
	 * 发短信接口  梦网
	 * @param { mobile: String } 手机号
	 * @param { pcode: String } 自定义验证码
	 * @returns { code: String } 验证码
	 */
	async MWsend(mobile, pcode) {
		const ctx = this.ctx;
		const _mobile = "86" + mobile;
		const _pcode = pcode;

		function getValidateCode() {
			var validateCode;
			validateCode = Math.random().toString();
			validateCode = validateCode.substr(2, 4);
			return validateCode;
		}
		var code = _pcode || getValidateCode();
		var text = new Buffer(iconv.encode("您的验证码是：" + code, 'GBK')).toString('hex');
		try {
			let url = "http://43.240.124.85:8901/sms/mt";
			const res = await ctx.curl(url, {
				method: 'POST',
				data: {
					command: "MT_REQUEST",
					spid: "JJ1003",
					sppassword: "159362",
					da: _mobile,
					dc: "15",
					sm: text
				},
				dataType: 'JSON',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			return code;
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}
	/**
	 * 明文nick 换 混淆mixnick
	 *
	 * @param { nick: String } 明文nick
	 * @returns { nick: String } 混淆mixnick
	 */
	async getMixnick(nick) {
		const ctx = this.ctx;
		const _nick = nick || '';
		return new Promise((resolve, reject) => {
			backClient.execute('taobao.mixnick.get', {
				'nick': _nick
			}, function (error, response) {
				console.log("getMixnick response: ", response);
				if (!error) {
					resolve(response.nick);
				} else {
					reject(error);
				}
			});
		});
	}
	/**
	 * 会员信息查询: POST 
	 * 文档地址: http://211.148.5.254/WeChatInterface/Service1.asmx
	 * @param { brand: String } 固定不变的 CM
	 * @param { account: String } 明文NICK
	 * @param { source: String } 固定不变的 Tmall
	 * @param { mobile: String } 手机号 source为Tmall的时候可以不填
	 * @returns { data }
	 */
	async selectCustomerInfo(params) {
		const ctx = this.ctx;
		let url = "http://211.148.5.254/WeChatInterface/Service1.asmx/SelectCustomerInfo";

		console.log('selectCustomerInfo params======================', params);

		try {
			const res = await ctx.curl(url, {
				method: 'POST',
				data: {
					brand: params.brand || "CM",
					account: params.account,
					source: params.source || "Tmall",
					mobile: params.mobile || "",
				},
				dataType: 'xml',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			let buffer = res.data;
			let xmlText = buffer.toString();
			var x2js = new X2JS();
			let jsonObj = x2js.xml2js(xmlText).Results;
			// console.log("userServe selectCustomerInfo-res===", jsonObj);
			return jsonObj;
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}
	/**
	 * 更新会员信息: POST 
	 * 文档地址: http://211.148.5.254/WeChatInterface/Service1.asmx
	 * @param { BrandName: String } 品牌代码(见附录) CM 
	 * @param { Mobile: String } 手机号   可空
	 * @param { Source: String } 来源(见附录)
	 * @param { AccountID: String } 明文NICK
	 * @param { Gender: String } 姓别   可空
	 * @param { Birthday: String } 生日 日期格式统一为(yyyy-MM-dd)  可空
	 * @param { Email: String } 邮箱   可空
	 * @returns { data }
	 */
	async customerUpdate(params) {

		console.log('customerUpdate=============', params);

		const ctx = this.ctx;
		let url = "http://211.148.5.254/WeChatInterface/Service1.asmx/CustomerUpdate";
		try {
			const res = await ctx.curl(url, {
				method: 'POST',
				data: {
					fieldList: JSON.stringify(params),
				},
				dataType: 'xml',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			let buffer = res.data;
			let xmlText = buffer.toString();
			var x2js = new X2JS();
			let jsonObj = x2js.xml2js(xmlText).Results;
			console.log("userServe customerUpdate-res===", jsonObj);
			return jsonObj;
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}

	/**
	 * 新增潜客信息: POST 
	 * 功能说明：收集活动顾客的信息
	 * 文档地址: http://211.148.5.254/WeChatInterface/Service1.asmx
	 * 
	 * @param { BrandName: String } 品牌代码(见附录) CM 
	 * @param { Mobile: String } 手机号  
	 * @param { Source: String } 来源(见附录)
	 * @param { AccountID: String } 帐号id (可传标识号，如openid,淘宝昵称等) 可空
	 * @param { MixNick: String } 淘宝混淆昵称
	 * @param { Gender : String } 姓别 可空
	 * @param { Birthday : String } 生日 日期格式统一为(yyyy-MM-dd) 可空
	 * @param { Email : String } 邮箱 可空
	 * @param { CustomerName : String } 姓名 可空
	 * 
	 * @returns { data }
	 */
	async CampaignCustInfo(params) {
		console.log('CampaignCustInfo=============', JSON.stringify(params));

		const ctx = this.ctx;
		let url = "http://211.148.5.254/WeChatInterface/Service1.asmx/CampaignCustInfo";
		try {
			const res = await ctx.curl(url, {
				method: 'POST',
				data: {
					fieldList: JSON.stringify(params),
				},
				dataType: 'xml',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});

			let buffer = res.data;
			let xmlText = buffer.toString();
			var x2js = new X2JS();
			let jsonObj = x2js.xml2js(xmlText).Results;
			return jsonObj;
		} catch (err) {
			ctx.body = JSON.stringify(err);
		}
	}
}

module.exports = makeup;