const fs = require('fs');
const crypto = require('crypto');
const WANTU = require('../../../lib/wantusdk/wantu.js');
const wantuSdk = new WANTU('23246224','c1253bd619fad8ea02d68c283debdf2a');  //填入ak，sk
const namespace = "vrbuy";   //填写空间名, 默认为vrbuy

const Service = require('egg').Service;

class wantu extends Service {

	/**
	 * 单个上传文件
	 *
	 * @param {filepath} 文件路径
	 * @param {dest} cdn目录，目的地目录
	 * @returns {number} cdn链接
	 */
	async singleUpload(filepath,dest) {
		console.log('singleUpload=============================');
		
		const { ctx } = this;
		return new Promise((resolve,reject)=>{
			wantuSdk.singleUpload({
				namespace : namespace,
				expiration : -1
			},
			filepath,
			dest,
			'',
			'',
			function(err,res){
				if(200 == res.statusCode){
					ctx.logger.info('singleUpload success:', res.data);
					const returnData = JSON.parse(res.data);
					//删除文件
					fs.unlinkSync(filepath);
					//console.log("文件上传成功，并删除本地文件 : ",filepath);
					resolve(returnData.url);
				}else{
					console.log('singleUpload fail',err);
					ctx.logger.warn('singleUpload fail:', err);
					reject(err);
				}
			});
		});
	}

}

module.exports = wantu;