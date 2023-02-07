<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">常用开关设置</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="list">
				<view>离线</view>
				<view>
					<u-switch v-model="off" @change="isOff"></u-switch>
				</view>
			</view>
			<view class="list">
				<view>PDA模式</view>
				<view>
					<u-switch v-model="pda" @change="isPda"></u-switch>
				</view>
			</view>
			<view class="list">
				<view>移动pos模式</view>
				<view>
					<u-switch v-model="pos" @change="isPos"></u-switch>
				</view>
			</view>
			<view class="list">
				<view>自动打印</view>
				<view>
					<u-switch v-model="print" @change="isPrint"></u-switch>
				</view>
			</view>
			<u-cell title="生成离线数据包" isLink @tap="downloadNow"></u-cell>
			<view class="list">
				<view>自动锁屏</view>
				<view>
					<u-switch v-model="lockScreen" @change="isLock"></u-switch>
				</view>
			</view>
			
			<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupShow=false">
				<view class="popupCon">
					<u-line-progress :percentage="download.lineData" activeColor="#3C9CFF">
					</u-line-progress>
					<view>下载中,请稍后: {{download.already}}M / {{download.total}}M</view>
				</view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import dayjs from "dayjs";
	import {
		upLoaddata
	} from "@/network/api.js";
	export default {
		data() {
			return {
				off: uni.getStorageSync("off"), //离线
				pda: uni.getStorageSync("pda"), //pda模式
				pos: uni.getStorageSync("pos"), //pos
				print: uni.getStorageSync("print"), //打印
				lockScreen: uni.getStorageSync("lockScreen"), //自动锁屏
				//.....................................
				downloadTask: "",
				popupShow: false,
				download: {
					lineData: "",
					already: "",
					total: ""
				},
				httpUrl: getApp().globalData.httpUrl,
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.isOff()
			this.isPda()
			this.isPos()
			this.isPrint()
			this.isLock()
			
			var xx=setInterval(()=>{
				this.off=uni.getStorageSync("off")
			},1000)
			uni.addInterceptor("navigateBack", {
				invoke(args) {//触发前
					clearInterval(xx)
				},
				complete(res) {
					uni.removeInterceptor("navigateBack")
				}
			})
		},
		onShow() {
			
		},
		methods: {
			isOff(e) {
				if(this.off){
					uni.setStorageSync("off",true)
				}else{
					uni.setStorageSync("off",false)
				}
			},
			isPda(e) {
				if(this.pda){
					uni.setStorageSync("pda",true)
				}else{
					uni.setStorageSync("pda",false)
				}
			},
			isPos(e) {
				if(this.pos){
					uni.setStorageSync("pos",true)
				}else{
					uni.setStorageSync("pos",false)
				}
			},
			isPrint(e) {
				if(this.print){
					uni.setStorageSync("print",true)
				}else{
					uni.setStorageSync("print",false)
				}
			},
			isLock(e) {
				if(this.lockScreen){
					uni.setStorageSync("lockScreen",true)
					uni.setKeepScreenOn({
						keepScreenOn: false
					});
				}else{
					uni.setStorageSync("lockScreen",false)
					//设置应用保持 常亮 状态
					uni.setKeepScreenOn({
						keepScreenOn: true
					});
				}
			},
			//.........................................................
			downloadNow() {
				uni.showModal({
					content: "是否重新在服务器上生成离线数据包",
					success: (resmod)=> {
						if (resmod.confirm) {
							let data = {
								"access_token": uni.getStorageSync("access_token"),
								"companyid": uni.getStorageSync("companyid"),
								"fdbh": uni.getStorageSync("fdbh"),
								"cktype": "now"
							}
							console.log("重新在服务器上生成 data", data)
							upLoaddata(data).then((res) => {
								console.log("重新在服务器上生成 res", res)
								if (res.error_code == 0) {
									this.popupShow = true
									const downloadTask = uni.downloadFile({
										url: this.httpUrl + res.pkurl,
										success: (resdown) => {
											console.log('downloadTask resdown', resdown);
											
											if(resdown.statusCode==200){
												let today = new Date().valueOf()
												uni.setStorageSync('downloadTime', today)
												
												uni.saveFile({
													tempFilePath: resdown.tempFilePath,
													success: (resSave)=> {
														console.log("saveFile resSave",resSave)
														this.popupShow = false
														
														uni.setStorageSync("downloadPath",resSave.savedFilePath)
														// 关闭 已下载的 数据库
														plus.sqlite.closeDatabase({
															name: 'downloadDb',
															success: (e)=>{
																console.log("关闭 downloadDb 成功 ！！！！！")
															},
															fail: (e)=>{
																console.log("关闭 downloadDb 失败 ！！！！！")
															}
														});
														// 打开 已下载的 数据库
														plus.sqlite.openDatabase({
															name: 'downloadDb',
															path: resSave.savedFilePath,
															success: (e)=> {
																console.log("打开 downloadDb 成功 ~~~~~~~~~")
															},
															fail: (e)=> {
																console.log("打开 downloadDb 失败 ~~~~~~~~~~~")
															}
														});
														
														this.$refs.uToast.show({
															type: "success",
															message: "保存数据成功"
														})
													},
													fail: (err)=>{
														this.$refs.uToast.show({
															type: "error",
															message: "保存数据失败"
														})
													}
												});
											}else{
												this.$refs.uToast.show({
													type: "error",
													message: "下载失败"
												})
												this.popupShow = false
											}
											
										},
										fail: (err) => {
											console.log('err', err);
										}
									});
								
									// 监听任务
									downloadTask.onProgressUpdate((respro) => {
										this.download.lineData = respro.progress
										this.download.already = (respro.totalBytesWritten / 1048576).toFixed(2)
										this.download.total = (respro.totalBytesExpectedToWrite / 1048576).toFixed(2)
										// console.log('respro', respro)
									});
								
								} else {
									this.$refs.uToast.show({
										type: "error",
										message: res.message
									})
								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (resmod.cancel) {
							
						}
					}
				});
			},
			
			
		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.box-content {
			padding-top: calc(var(--status-bar-height) + 52px);
			padding-left: 0;
			padding-right: 0;
		}
		.list {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			background-color: #fff;
			border-bottom: 1px solid #EAEBEC;
		}
	}
</style>
