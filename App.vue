<!-- 由uni-app 内置组件，外置组件，uview组成 -->
<!-- uview 官网：https://www.uviewui.com/js/fastUse.html -->
<!-- 语音识别，语音合成，人脸识别，语言理解 均为百度人工智能产品 -->
<!-- 通用蓝牙打印插件 https://ext.dcloud.net.cn/plugin?id=3232 -->
<script>
	var setT
	export default {
		globalData: {
			// httpUrl: "http://webapibeta.mzsale.com",
			httpUrl: "http://self.mzsale.com",
			fontStart: "<font style='color:#3C9CFF'>",
			fontEnd: "</font>",
			analysisAuth: [],
			replist: [{// 判断功能的 权限名
					id: "goshop",
					alias: "goshoping",
					name: "商品采购",
				},
				{
					id: "addshop",
					alias: "addshoping",
					name: "商品补货",
				},
				{
					id: "getstorage",
					alias: "getstorage",
					name: "商品入库",
				},
				{
					id: "checkshop",
					alias: "checking",
					name: "商品盘点",
				},
				{
					id: "cgdcheck",
					alias: "getcgd",
					name: "采购验收",
				},
				{
					id: "workflow",
					alias: "work",
					name: "我的工作",
				},
				{
					id: "notice",
					alias: "notice",
					name: "公告通知",
				},
				{
					id: "download",
					alias: "down",
					name: "数据下载",
				},
				{
					id: "pricelabel",
					alias: "spriceLable",
					name: "录标价签",
				},
				{
					id: "pickcheck",
					alias: "picking",
					name: "配送拣货",
				},
				{
					id: "goodstock",
					alias: "goodsstock",
					name: "商品库存概况",
				},
				{
					id: "PHZP08",
					alias: "zpdlr",
					name: "直配单录入",
				},
				{
					id: "PHZP03",
					alias: "pddlr",
					name: "配调单录入",
				},
				{
					id: "yxaddshop",
					alias: "yxaddshoping",
					name: "永续补货",
				},
				{
					id: "prepay",
					alias: "prepay",
					name: "预付款",
				},
				{
					id: "mpos",
					alias: "mpos",
					name: "移动收银",
				},
				// lct.....................................
				{
					id: "yxychz",
					alias: "ychz",
					name: "预采汇总",
				},
				{
					id: "yxspyc",
					alias: "spycg",
					name: "商品预采",
				},
				{
					id: "yxycys",
					alias: "ycgdhys",
					name: "预采验收",
				},
				{
					id: "yxmdfj",
					alias: "spfjph",
					name: "门店分拣",
				},
				{
					id: "yxmdys",
					alias: "mddhqr",
					name: "门店验收",
				},
				{
					id: "yxzbsh",
					alias: "yxbhsh",
					name: "永续审核",
				},
				{
					id: "yxzjjh",
					alias: "yxzjjh",
					name: "直接拣货",
				},
				{
					id: "yxzchh",
					alias: "ycdwh",
					name: "永采单维护",
				},
				{
					id: "yxbzxth",
					alias: "bzxth",
					name: "包装箱退回",
				},
			],
			appArr: [{
					"name": "首页",
					"url": "/pages/home/home"
				}, {
					"name": "快报",
					"permissionName": "ToDaySale"
				}, {
					"name": "搜索",
					"url": "/pages/home/component/search/search"
				}, {
					"name": "功能",
					"url": "/pages/function/function"
				}, {
					"name": "下载",
					"url": "/pages/function/component/download/download",
					"permissionName": "download"
				}, {
					"name": "帮助",
					"url": "/pages/function/component/help/help"
				}, {
					"name": "商品采购",
					"url": "/pages/function/component/goshoping/goshoping",
					"permissionName": "goshop"
				}, {
					"name": "商品补货",
					"url": "/pages/function/component/addshoping/addshoping",
					"permissionName": "addshop"
				}, {
					"name": "商品入库",
					"url": "/pages/function/component/getstorage/getstorage",
					"permissionName": "getstorage"
				}, {
					"name": "商品盘点",
					"url": "/pages/function/component/checkshoping/checkshoping",
					"permissionName": "checkshop"
				}, {
					"name": "采购验收",
					"url": "/pages/function/component/getcgd/getcgd",
					"permissionName": "cgdcheck"
				}, {
					"name": "录标价签",
					"url": "/pages/function/component/goodspricelable/goodspricelable",
					"permissionName": "pricelabel"
				}, {
					"name": "配送拣货",
					"url": "/pages/function/component/picking/picking",
					"permissionName": "pickcheck"
				}, {
					"name": "我的工作",
					"url": "/pages/function/component/work/work",
					"permissionName": "workflow"
				}, {
					"name": "公告通知",
					"url": "/pages/function/component/notice/notice",
					"permissionName": "notice"
				}, {
					"name": "商品库存",
					"url": "/pages/function/component/goodsstock/goodsstock",
					"permissionName": "goodstock"
				}, {
					"name": "永续补货",
					"url": "/pages/function/component/yxaddshoping/yxaddshoping",
					"permissionName": "yxaddshop"
				}, {
					"name": "预付款",
					"url": "/pages/function/component/prepay/prepay",
					"permissionName": "prepay"
				}, {
					"name": "收银",
					"url": "/pages/function/component/mpos/mpos",
					"permissionName": "mpos"
				}, {
					"name": "永续采购",
					"url": "/pages/function/component/lct/lct"
				}, {
					"name": "预采汇总",
					"url": "/pages/function/component/lct/bhychz",
					"permissionName": "yxychz"
				}, {
					"name": "商品预采",
					"url": "/pages/function/component/lct/spycg/spycg",
					"permissionName": "yxspyc"
				}, {
					"name": "预采验收",
					"url": "/pages/function/component/lct/ycgdhys/ycgdhys",
					"permissionName": "yxycys"
				}, {
					"name": "直接拣货",
					"url": "/pages/function/component/lct/yxzjjh/yxzjjh",
					"permissionName": "yxzjjh"
				}, {
					"name": "门店分拣",
					"url": "/pages/function/component/lct/spfjph/spfjph",
					"permissionName": "yxmdfj"
				}, {
					"name": "门店验收",
					"url": "/pages/function/component/lct/mddhqr/mddhqr",
					"permissionName": "yxmdys"
				}, {
					"name": "永续审核",
					"url": "/pages/function/component/lct/yxbhsh/yxbhsh",
					"permissionName": "yxzbsh"
				}, {
					"name": "永采单维护",
					"url": "/pages/function/component/lct/ycdwh/ycdwh",
					"permissionName": "yxzchh"
				}, {
					"name": "直配单录入",
					"url": "/pages/function/component/zpdlr/zpdlr",
					"permissionName": "PHZP08"
				}, {
					"name": "配调单录入",
					"url": "/pages/function/component/pddlr/pddlr",
					"permissionName": "PHZP03"
				}, {
					"name": "报表",
					"url": "/pages/statement/statement"
				}, {
					"name": "我的",
					"url": "/pages/my/my"
				}, {
					"name": "设置",
					"url": "/pages/my/component/set/set"
				}, {
					"name": "注册企业门店",
					"url": "/pages/my/component/set/component/enterprise/enterprise"
				}, {
					"name": "消息通知",
					"url": "/pages/my/component/set/component/message/message"
				}, {
					"name": "登录方式",
					"url": "/pages/my/component/set/component/loginMode/loginMode"
				}, {
					"name": "开关",
					"url": "/pages/my/component/set/component/commonSwitch/commonSwitch"
				}, {
					"name": "修改密码",
					"url": "/pages/my/component/set/component/updatePwd/updatePwd"
				}, {
					"name": "应用登出",
					"url": "/pages/my/component/set/component/appLogout/appLogout"
				}, {
					"name": "检查更新",
					"url": "/pages/my/component/set/component/checkUpdate/checkUpdate"
				}, {
					"name": "问题反馈",
					"url": "/pages/my/component/set/component/feeback/feeback"
				}, {
					"name": "关于我们",
					"url": "/pages/my/component/set/component/about/about"
				}, {
					"name": "商城",
					"url": "http://mzsale.com"
				},
			]
		},
		onLaunch() {
			// _www，仅应用自身可读
			// _doc，仅应用自身可读写
			// _documents，多应用时都可读写，常用于保存应用间共享文件
			// _downloads，多应用时都可读写，常用于保存下载文件
			console.log('App onLaunch')
			// 禁止用户截屏
			// #ifdef APP-PLUS
			// let activity=plus.android.runtimeMainActivity();
			// plus.android.invoke(plus.android.invoke(activity,"getWindow"),"addFlags",0x0002000)
			// #endif
			
			//获取设备唯一标识 uuid
			uni.getStorage({
				key: 'uuid',
				fail: (err)=> {
					// #ifdef APP-PLUS
					plus.device.getInfo({
						success:(res)=>{
							uni.setStorageSync("uuid", res.uuid)
						},
						fail:(err)=>{
							
						}
					});
					// #endif
				}
			});
			
			// 获取设备的ip地址
			uni.getStorage({
				key: 'ip',
				fail: (err)=> {
					uni.request({
						url: "http://self.mzsale.com/mzsale/web/login",
						data: {},
						method: "GET",
						header: {
							"Content-Type": "application/json"
						},
						success: (res) => {
							// console.log("获取ip res",res)
							if(res.data.error_code==0){
								uni.setStorageSync("ip", res.data.ip)
							}
						}
					})
				}
			});

			
			uni.setStorageSync("model", "Test");
			
			// 获取打印需要的设备信息
			uni.getSystemInfo({
				success: (res)=> {
					uni.setStorageSync("device",res.brand)
				}
			});
			// 错误的登录次数限制...............................
			uni.getStorage({
				key: 'loginNum',
				fail: (err)=> {
					uni.setStorageSync('loginNum', 3)
				},
			});
			// 错误的快速登录次数限制...............................
			uni.getStorage({
				key: 'quiteNum',
				fail: (err)=> {
					uni.setStorageSync('quiteNum', 3)
				},
			});
			
			// 设置>>消息通知
			uni.getStorage({
				key: 'work',
				fail: (err)=> {
					uni.setStorageSync('work', true)
				},
			});
			uni.getStorage({
				key: 'notice',
				fail: (err)=> {
					uni.setStorageSync('notice', true)
				},
			});
			uni.getStorage({
				key: 'system',
				fail: (err)=> {
					uni.setStorageSync('system', true)
				},
			});
			uni.getStorage({
				key: 'activity',
				fail: (err)=> {
					uni.setStorageSync('activity', true)
				},
			});
			// 设置>>常用开关设置
			uni.getStorage({
				key: 'off',
				fail: (err)=> {
					uni.setStorageSync('off', false)
				},
			});
			uni.getStorage({
				key: 'pda',
				fail: (err)=> {
					uni.setStorageSync('pda', false)
				},
			});
			uni.getStorage({
				key: 'pos',
				fail: (err)=> {
					uni.setStorageSync('pos', false)
				},
			});
			uni.getStorage({
				key: 'print',
				fail: (err)=> {
					uni.setStorageSync('print', false)
				},
			});
			uni.getStorage({
				key: 'lockScreen',
				success: (res) => {},
				fail: (err)=> {
					uni.setStorageSync('lockScreen', false)
					//设置应用保持 常亮 状态
					uni.setKeepScreenOn({
						keepScreenOn: true
					});
				},
			});
			// AI设置
			uni.getStorage({
				key: 'isCamera',
				fail: (err)=> {
					uni.setStorageSync('isCamera', true)
				},
			});
			uni.getStorage({
				key: 'isAlbum',
				fail: (err)=> {
					uni.setStorageSync('isAlbum', true)
				},
			});
			uni.getStorage({
				key: 'speech_lang',
				fail: (err)=> {
					uni.setStorageSync('speech_lang', "zh-cn")
				},
			});
			uni.getStorage({
				key: 'speech_errTimes',
				fail: (err)=> {
					uni.setStorageSync('speech_errTimes', "2")
				},
			});
			uni.getStorage({
				key: 'voice_yusu',
				fail: (err)=> {
					uni.setStorageSync('voice_yusu', 5)
				},
			});
			uni.getStorage({
				key: 'voice_yindiao',
				fail: (err)=> {
					uni.setStorageSync('voice_yindiao', 5)
				},
			});
			uni.getStorage({
				key: 'voice_yinliang',
				fail: (err)=> {
					uni.setStorageSync('voice_yinliang', 5)
				},
			});
			uni.getStorage({
				key: 'voice_per',
				fail: (err)=> {
					uni.setStorageSync('voice_per', "0")
				},
			});
			
			
			// 打开 only 数据库
			// #ifdef APP-PLUS
			if (
				plus.sqlite.isOpenDatabase({
					name: 'only',
					path: '_doc/only.db'
				})
			) {} else {
				plus.sqlite.openDatabase({
					name: 'only',
					path: '_doc/only.db',
					success: (res)=> {

					},
					fail: (err)=> {

					}
				});
			}
			// #endif
			// 打开 下载的 数据库
			uni.getStorage({
				key: 'downloadPath',
				success: (res)=> {
					// #ifdef APP-PLUS
					if (
						plus.sqlite.isOpenDatabase({
							name: 'downloadDb',
							path: res.data,
						})
					) {} else {
						plus.sqlite.openDatabase({
							name: 'downloadDb',
							path: res.data,
							success: (resop)=> {
								// console.log("onLaunch 打开downloadDb数据库成功！！！！！！！！！！")
							},
							fail: (err)=> {
								// console.log("onLaunch 打开downloadDb数据库失败···············")
							}
						});
					}
					// #endif
				}
			});
			
			
		},
		onShow: function() {
			console.log("App onShow")
			// 百度人脸使用的 token
			let dates= new Date()
			let y=dates.getFullYear()
			let m=dates.getMonth()+1
			let d=dates.getDate()
			let newdate=`${y}-${m}-${d}`
			if (newdate != uni.getStorageSync('checkVersionDate')) {
				uni.request({
					url: "https://aip.baidubce.com/oauth/2.0/token",
					data: {
						"grant_type": "client_credentials",
						"client_id": "toMm0BN0ot2Vrq6b5GfOO4uj", //百度人脸 应用的API Key
						"client_secret": "QICAA8G7gRTDiRqC9ogGCEkRlr7SQFNi" //百度人脸 应用的Secret Key
					},
					method: "POST",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.statusCode == 200) {
							uni.setStorageSync("baiduToken", res.data.access_token);
						}
					}
				})
			}
			// // 百度 自然语言理解 使用的 token
			// uni.request({
			// 	url: "https://aip.baidubce.com/oauth/2.0/token",
			// 	data: {
			// 		"grant_type": "client_credentials",
			// 		"client_id": "CbGt2YQeWELPjvAAoLNDXmQ7", //百度语言理解 应用的API Key
			// 		"client_secret": "wAkC3f23MCfWwsCH9lbg0zQewG9Suv6N" //百度语言理解 应用的Secret Key
			// 	},
			// 	method: "POST",
			// 	header: {
			// 		"Content-Type": "application/x-www-form-urlencoded"
			// 	},
			// 	success: (res) => {
			// 		if (res.statusCode == 200) {
			// 			uni.setStorageSync("nlpToken", res.data.access_token);
			// 		}
			// 	}
			// })
			
			// uni.getStorageInfo({//查看app所有缓存键值
			// 	success: (res)=> {
			// 		res.keys.forEach((v,i,arr)=>{
			// 			console.log("app缓存键值————"+v,uni.getStorageSync(v))
			// 		})
			// 	}
			// });
			console.log("access_token access_token", uni.getStorageSync("access_token"))
			
			
			clearTimeout(setT)
		},
		onHide: function() {
			console.log("App Hide")
			setT = setTimeout(() => {
				console.log("App QQQQQQuit")
				// #ifdef APP-PLUS
				plus.runtime.quit();
				// #endif
			}, 1800000)//30分钟
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	@import "@/static/css/uni.css";
	@import "uview-ui/index.scss";
	@import "@/static/css/iconfont/iconfont.css";

	/*每个页面公共css */
	// page {
	// 	background-color: #f3f3f3;
	// }
	
	.box {
		width: 100%;
		color: #303133;
		font-size: 15px;

		.status-bar {
			width: 100%;
			height: var(--status-bar-height);
			background-color: #fff;
			// color: #000;
			position: fixed;
			top: 0;
			z-index: 10;
		}

		/deep/.uni-navbar--fixed {
			top: var(--status-bar-height);
			z-index: 11 !important;
		}
		/deep/.uni-navbar__header-btns-left uni-navigator,
		.navleftview {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		
		.nav-bar {
			width: 100%;
			height: 44px;
			padding: 0 10px;
			font-size: 12px;
			color: #fff;
			// background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
			position: fixed;
			top: var(--status-bar-height);
			z-index: 98;
			display: flex;
			.left {
				width: 80px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
			.center {
				width: calc(100% - 160px);
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.right {
				width: 60px;
				display: flex;
				flex-wrap: nowrap;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
			}
		}
		
		// 内容界面样式......................................................................................
		.box-content {
			padding-top: calc(var(--status-bar-height) + 8px);
			// padding-top: calc(var(--status-bar-height) + 44px);
			padding-left: 10px;
			padding-right: 10px;
		}
		
		/deep/.u-cell {
			background-color: #fff;
		}
		
		// 单选样式
		/deep/.u-radio-group--row {
			.u-radio {
				margin-right: 16px;
			}
			.u-radio__icon-wrap {
				margin-right: 0;
			}
		}

		.section {
			padding-bottom: 10px;
			background-color: #fff;
		}

		.sectionTitle {
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			padding: 0 10px;
		}
		.sectionPic {
			width: 6px;
			height: 20px;
			background-color: #2979ff;
			border-radius: 6px;
			margin-right: 6px;
		}
		.notText {
			width: 100%;
			box-sizing: border-box;
			display: block;
			text-align: center;
			padding: 5px 10px;
		}

		/deep/.uni-stat__select {
			width: 100%;
			padding: 0;
			.uni-select {
				width: 100%;
			}
			.uni-select__input-text {
				width: 100%;
			}
			.uni-select__selector {
				top: 100%;
				border: 1px solid #f1f1f1;
			}
			.uni-select__selector-item:nth-child(even) {
				background-color: #f1f1f1;
			}
		}
		
		// 自定义button样式
		.sticky-bottom{
			position: sticky !important;
			z-index: 999;
			bottom: 8px;
		}
		
		/deep/.u-button.icon-button{
			width: auto;
			height: auto;
			margin: 0;
			padding: 0;
			background-color: transparent;
			border: 0;
		}
		/deep/.u-button.small-btn{
			width: auto;
			min-width: 0;
			height: 16px;
			padding: 0;
			margin: 0;
		}
		/deep/.u-button--primary.my-primary-button{
			width:70%;
			height:38px;
			line-height:38px;
			margin-left: auto;
			margin-right: auto;
			border-radius:30px;
			background-color: #358CC9;
		}
		/deep/.u-button--primary.u-button--plain.my-primary-button{
			background-color: #fff;
			border-color: #358CC9;
			color: #358CC9;
		}
		/deep/.u-button--warning.my-primary-button{
			width:70%;
			height:38px;
			line-height:38px;
			margin-left: auto;
			margin-right: auto;
			border-radius:30px;
		}
		
		/deep/.uni-date{
			.uni-date-editor--x__disabled{
				opacity: 1;
				.uni-date-x{
					background-color: rgb(245, 247, 250);
				}
			}
		}
		
		// 弹窗样式...............................................................................................
		/deep/.uni-drawer {
			top: var(--status-bar-height) !important;
			margin-top: 0 !important;
		}
		
		/deep/.uni-calendar {
			.uni-calendar__mask {
				z-index: 10000;
			}
			.uni-calendar__content {
				z-index: 10000;
			}
		}
		
		// uview popup 中间弹出样式
		/deep/.u-popup-center .u-popup__content {
			width: 80%;
			padding: 10px 10px 20px;
			border-radius: 5px;
			.popup-title {
				display: inline-block;
				height: 20px;
				line-height: 20px;
				font-size: 16px;
				font-weight: 600;
			}
		}
		/deep/.u-popup-center .u-popup__content>uni-view>* {
			margin-top: 14px;
		}
		/deep/.u-popup-center .u-popup__content>uni-view .uni-icon {
			margin-top: 0;
		}
		/deep/.u-popup-center .u-popup__content__close {
			top: 11px;
		}
		/deep/.u-popup-center .u-popup__content__close>* {
			margin-top: 0px !important;
		}
		
		// uni popup 中间弹出样式
		/deep/.uni-popup-center .uni-popup__wrapper {
			width: 80%;
			padding: 20px 14px;
			border-radius: 5px;
			background-color: #fff !important;
		}
		/deep/.uni-popup__wrapper>uni-view>* {
			margin-top: 14px;
		}
		

	}

	/* #endif */

	/* #ifdef H5 */
	
	/* #endif */
</style>