
export const myMixin = {
	methods: {
		/**
		 * 获取当前时间 格式（2019-02-12 12:20:56）
		 */
		getNowTime() {
			var date = new Date();
			var year, month, day, hour, min, second;
			year = date.getFullYear();
			parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) +
				1;
			date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
			date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
			date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
			date.getSeconds() < 10 ? second = '0' + date.getSeconds() : second = date.getSeconds();
		
			return [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second
		},
        
		
	}
};
