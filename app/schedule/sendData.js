const Subscription = require('egg').Subscription;
const DateFormat = require('dateformat-util');

class sendData extends Subscription {
	constructor(props) {
		super(props);
		this.count = 0;
	}
	
	// 通过 schedule 属性来设置定时任务的执行间隔等配置
	static get schedule() {
		return {
			cron: `0 10 6 11 9 * 2018`,
			// interval: '0.1m',
			type: 'all',
			immediate: false,
			// disable: sendData.config.env === 'local', // 本地开发环境不执行
		};
	}

	// subscribe 是真正定时任务执行时被运行的函数
	async subscribe() {
		const { ctx } = this;
		//执行数据处理业务
		console.log("定时任务测试～");
	}
}
module.exports = sendData;