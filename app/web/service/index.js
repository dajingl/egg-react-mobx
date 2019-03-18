import http from '../utils/axios/http'

/**
 * 从外部接受参数，没有参数默认为空对象
 * return对应的get/post方法，第一个填路径，第二个给参数对象
 */
export function getExampleData(params = {}) {
	return http.get("/lamer/getUserInfo", params);
}
export function updateExampleData(params = {}) {
	return http.post("/lamer/updateUserInfo", params);
}