const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const uuid = require('node-uuid');
const Service = require('egg').Service;
const awaitWriteStream = require('await-stream-ready').write;

class imgServe extends Service {
	/**
	 * url形式，上传cdn. 支持jpg、png、amr、aac等类型文件上传
	 *
	 * @param {url} 图片url
	 * @param {cdn_dir} cdn目录，目的地目录
	 * @returns {number} cdn链接
	 */
	async imgUrlUpload(url,cdn_dir) {
		const { ctx } = this;
		//console.log(" this is imgUrlUpload ~ ", url);
		try{
			const fileType = this.getFileType(url);
			if(fileType){
				// 下载至本地临时目录
				const localpath = await this.downloadFile(url,fileType);
				// 上传至wantu  如：'/ecovacs2018'
				const cdn_url   = await ctx.service.sdk.wantu.singleUpload(localpath,cdn_dir);
				return cdn_url;
			}else{
				return 'Not support the fileType';
			}
		} catch (err) {
			return err;
		}
	}

	/**
	 * 图片base64形式，上传cdn
	 *
	 * @param {stream} 文件流
	 * @param {cdn_dir} cdn目录，目的地目录
	 * @returns {number} cdn链接
	 */
	async base64Upload(stream, cdn_dir) {
		const { ctx } = this;
		//临时文件 path
		const tempDir = this.app.config.temp.dir;
		const fileType = path.extname(stream.filename);
		const tempfile = tempDir + '/' + uuid.v4() + fileType;

		const writeStream = fs.createWriteStream(tempfile);

		try{
			// 写为临时文件
			await awaitWriteStream(stream.pipe(writeStream));
			// 上传至wantu  如：'/ecovacs2018'
			const cdn_url = await ctx.service.sdk.wantu.singleUpload(tempfile,cdn_dir);
			return cdn_url;
		} catch (err) {
			return err;
		}
	}

	async base64UploadStr(baseData, cdn_dir) {
        const { ctx } = this;
        //临时文件 path
        const tempDir = this.app.config.temp.dir;
        const base64Data = baseData.replace(/^data:image\/\w+;base64,/, "");
        var reData = {};//接口反馈数据
        var dataBuffer = new Buffer(base64Data, 'base64');
              
        var imageName = new Date().getTime();
        //windows下路径
        //var localPath = '/Users/morefun/src/hamburger/public/base64/' + imageName +'.jpg';
        //linux下路径
        const tempfile = tempDir+"/"+ imageName +'.jpg';
        try{
            let filepath = await this.writeImgFile(tempfile,dataBuffer);
            const cdn_url = await ctx.service.sdk.wantu.singleUpload(filepath, cdn_dir);
            return cdn_url;
        }catch(err){
            return err;
        }
    }
    
    async writeImgFile(tempfile,dataBuffer){
        return new Promise((resolve,reject)=>{
             fs.writeFile(tempfile,dataBuffer,(err)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(tempfile);
                }
             })
        })
    }

	/**
	 * 检测文件类型，仅支持jpg、png、amr、aac
	 *
	 * @param {url} 文件地址
	 * @returns {fileType} 文件类型
	 */
	getFileType(url){
		let supportType = {
			'.jpg'  : true,
			'.png'  : true,
			'.amr'  : true,
			'.aac'  : true
		};
		//console.log('111getFileType~ ', url);
		let myurl = new URL(url);
		// console.log('myurl~', myurl,"typeof~~ ",typeof(myurl),myurl.pathname);
		// console.log('getFileType:~ ', path.extname(myurl.pathname));
		// console.log('supportType~ ',supportType[path.extname(myurl.pathname)]);
		let fileType = path.extname(myurl.pathname);
		if(supportType[fileType]){
			return fileType;
		}else{
			return null;
		}
	}

	/**
	 * 下载文件
	 *
	 * @param {url} 文件地址
	 * @param {fileType} 文件类型
	 * @returns {localPath} 临时文件地址
	 */
	async downloadFile(url,fileType) {
		const tempDir = this.app.config.temp.dir;
		const res = await this.ctx.curl(url, {
			streaming: true,
		});

		return new Promise(function (resolve, reject) {
			const resp = res.res;
			const localPath = tempDir + '/' + uuid.v4() + '.' + fileType;
			//用于保存网络请求不断加载传输的缓冲数据
			var chunks = [];                                     
			var size = 0;
			resp.on('data',function(chunk){
				//在进行网络请求时，会不断接收到数据(数据不是一次性获取到的),累加缓冲数据的长度
				chunks.push(chunk);
				size += chunk.length;
			});
			resp.on('end',function(err){
				const data = Buffer.concat(chunks, size);
				fs.writeFile(localPath, data, function(err){
					if(err){
						reject(err);
					}else{
						resolve(localPath);
					}
				});        
			});
		});
	}
}

module.exports = imgServe;