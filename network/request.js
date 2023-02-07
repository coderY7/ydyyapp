let isRefreshing = false
let requests = [] //重试队列，每一项将是一个待执行的函数形式
module.exports = (vm) => {// 此vm参数为页面的实例，可以通过它引用vuex中的变量
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		// config.baseURL = "http://webapibeta.mzsale.com/mzato"; /* 根域名 */
		config.baseURL = "http://self.mzsale.com"; /* 根域名 */
		config.timeout = 60000;
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use(async (response) => {
		if (response.data.error_code == 40002||response.data.error_code == 40004||response.data.error_code == 40005) {
			console.log("token已过期 响应拦截111", response)
			if(!isRefreshing){
				refreshFunc()
			}
			return new Promise((resolve) => {
				requests.push(token => {
					response.config.data.access_token=token
					resolve(uni.$u.http.request(response.config));
				})
			})
		}
		const data = response.data
		return data === undefined ? {} : data
	}, (response) => {
		return Promise.reject(response)
	})

	function refreshFunc() {// 刷新 token
		uni.setStorageSync("fdbh","0099")
		isRefreshing = true
		uni.request({
			url: "http://self.mzsale.com/mzsale/web/token",
			data: {
				"userid": uni.getStorageSync("userid"),
				"refresh_token": uni.getStorageSync("refresh_token")
			},
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			success: (resh) => {
				console.log("app 刷新Token!!!!!!!!!", resh)
				if (resh.data.error_code == 0) {
					uni.setStorageSync("access_token", resh.data.access_token);
					isRefreshing = true
					let token = resh.data.access_token
					// 已经刷新了token，将所有队列中的请求进行重试
					requests.forEach(item => item(token))
					requests = []
				} else if (resh.data.error_code == 40002) {
					loadRefresh()
				} else if (resh.data.error_code == 40004) { //refresh_token过期
					// isRefreshing = true
					// uni.$u.toast("refresh_token值不存在或无效，请重新登录")
					// setTimeout(()=>{
					// 	uni.redirectTo({
					// 		url: "/pages/login/login?ifCheckAll=false"
					// 	});
					// },1800)
					loadRefresh()
				} else if (resh.data.error_code == 40005) { //refresh_token过期，需要重新登录
					// isRefreshing = true
					// uni.$u.toast("refresh_token值过期，请重新登录")
					// setTimeout(()=>{
					// 	uni.redirectTo({
					// 		url: "/pages/login/login?ifCheckAll=false"
					// 	});
					// },1800)
					loadRefresh()
				} else {
					isRefreshing = false
				}
			}
		})
	}
	function loadRefresh(){// 刷新 retoken
		let dataes = {
			"access_token": "",
			"vtype": "login",
			"companyid": uni.getStorageSync("companyid"),
			"userid": uni.getStorageSync("userid"),
			"password": uni.getStorageSync("password"),
			"fdbh": uni.getStorageSync("fdbh"),
			"computerid": uni.getStorageSync("uuid"),//设备唯一标识
			"ipaddress": uni.getStorageSync("ip")
		}
		uni.request({
			url: "http://self.mzsale.com/mzato/main/app/usercheck",
			data: dataes,
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			success: (res) => {
				console.log("APP 刷新 refresh_token res", res)
				if (res.data.error_code == 0) {
					uni.setStorageSync("access_token", res.data.access_token);
					uni.setStorageSync("refresh_token", res.data.refresh_token);
					uni.setStorageSync("expires_in", res.data.expires_in);
					isRefreshing = true
					let token = res.data.access_token
					// 已经刷新了token，将所有队列中的请求进行重试
					requests.forEach(item => item(token))
					requests = []
				} else {
					isRefreshing = false
					uni.$u.toast(res.data.message)
				}
			}
		})
	}

}
