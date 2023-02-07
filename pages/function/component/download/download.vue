<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">数据下载</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="tishi">
				<p style="color:#B22222;font-weight:bold;">
					1.即将下载大量数据,连接Wifi网络,以确保网络畅通！
				</p>
				<p>
					2.下载时,页面响应慢或不响应为正常现象,请耐心等待！
				</p>
				<p>
					3.管理员可在设置>常用开关设置中手动生成最新数据包！
				</p>
			</view>
			<u-button type="primary" class="my-primary-button" text="开始下载" throttleTime="1000" @tap="start()"></u-button>

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
	import dayjs from 'dayjs';
	import {
		upLoaddata
	} from "@/network/api.js";
	export default {
		data() {
			return {
				downloadTask: "",
				popupShow: false,
				download: {
					lineData: "",
					already: "",
					total: ""
				},
				httpUrl: getApp().globalData.httpUrl,
			}
		},
		onLoad() {

		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {

		},
		methods: {
			start() {
				uni.showLoading({
					title: '加载中'
				});
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					// "sn": uni.getStorageSync("sn"),
					"companyid": uni.getStorageSync("companyid"),
					"fdbh": uni.getStorageSync("fdbh"),
					"cktype": "dayly",
				}
				console.log("下载数据 data", data)
				upLoaddata(data).then((res) => {
					console.log("下载数据 res", res)
					uni.hideLoading()
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
					uni.hideLoading()
					console.log(err)
				})
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
			padding-top: 90px;
			
			.tishi>* {
				font-size: 18px;
				margin-top: 18px;
			}
			
			/deep/.u-button {
				margin-top: 18px;
			}
			
			/deep/.u-popup-center .u-popup__content {
				padding: 30px 10px 20px;
			}
			
			.popupCon>* {
				margin-top: 20px;
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>