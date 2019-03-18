import axios from "axios";
import qs from "qs";
// react 中使用antd  此处自定义
// import { message } from "antd";
// vue中使用element-ui 此处自定义
// import { Loading} from "element-ui";

// 创建axios默认请求地址
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = "http://127.0.0.1:7001";
} else {
   // baseUrl = 'http://localhost:3000';
}

// 配置超时时间
axios.defaults.timeout = 100000;
// 配置请求拦截
axios.interceptors.request.use(config =>
	// config.setHeaders([
	//   // 在这里设置请求头与携带token信息
	  
	// ])
	config
);

// 添加响应拦截器
axios.interceptors.response.use(
	function (response) {
		//console.log(response);
		return response;
	},
	function (error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	},
);

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var get = function (url, params, loading) {
	let data = {
		params: params
	}
	return new Promise((resolve, reject) => {
		axios.get(url, data).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	});
};

/**
 * post请求
 * @method post
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var post = function (url, params) {
	let data = qs.stringify(params);
	return new Promise((resolve, reject) => {
		axios.post(url, data).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		});
	});
};

export default {
	get,
	post,
};