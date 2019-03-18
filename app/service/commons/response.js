const Service = require('egg').Service;

class response extends Service {
	/**
	 * 统一返回体，返回前端页面
	 *
	 * @param {code} 返回码
	 * @param {data} 返回数据
	 * @returns {reobj} 返回体
	 */
	async basicode(code,data){
		var reobj = {
			errCode:0,
			msg:'ok'
		};
		if(code){
			reobj.data = data;
			reobj.errCode = code;
			switch(code){
			case 4000:reobj.msg = 'Not login!'; break;
			case 4001:reobj.msg = 'No method!'; break;
			case 4002:reobj.msg = 'No mixnick!'; break;
			case 4003:reobj.msg = 'Invild params!'; break;
			case 4010:reobj.msg = 'No enough medal!'; break;
			case 4011:reobj.msg = 'No remaining award!'; break;
			case 4012:reobj.msg = 'Already chanced!'; break;
			case 4030:reobj.msg = 'Sql error!'; break;
			default: reobj.msg = 'Sql error!'; break;
			}
		}else{
			reobj.data = data;
		}
		return JSON.stringify(reobj);
	}

}

module.exports = response;