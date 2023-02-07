<template>
	<view class="box-compents">
		
		<u-toast ref="uToast"></u-toast>
		<u-popup :show="popupShow" mode="center" class="u-popup-center popup-log">
			<view class="imgposi">
				<image src="@/static/images/uploads.png"></image>
				<text>一点易用更新</text>
			</view>
			<view class="conposi">
				<text class="up-title">发现新版本</text>
				<view class="loadcon">
					<view class="logzi" v-for="(v,i) in logData">{{v}}</view>
					<u-line-progress :percentage="download.lineData" activeColor="#3C9CFF" v-show="logState=='up'">
					</u-line-progress>
					<view v-show="logState=='up'">下载中,请稍后: {{download.already}}M / {{download.total}}M</view>
					<u-button type="primary" text="立即更新" throttleTime="1000" @tap="checkVersionOk"
						v-show="logState=='show'"></u-button>
				</view>
			</view>
			<uni-icons type="close" size="40" color="#fff" @tap="popupShow=false"></uni-icons>
		</u-popup>

	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		Versionrecord
	} from "@/network/api.js";
	export default {
		data() {
			return {
				// 更新日志...........................................................
				downloadTask: "",
				popupShow: false,
				logState: "show",
				httpUrl: getApp().globalData.httpUrl,
				downLoadUrl: "",
				logData: [],
				download: {
					lineData: 0,
					already: 0,
					total: 0
				},
			};
		},
		mounted() {
			//上传版本信息
			// this.versionrecord()
		},
		methods: {
			// 更新日志。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			checkVersion(nowtime) {
				let _this = this;
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, function(info) {
					console.log("当前应用版本：" + info.version + "---" + plus.runtime.version);
					let dataes={
						"access_token": uni.getStorageSync("access_token"),
						"vtype": "sel"
					}
					// console.log("查询版本号 dataes",dataes)
					Versionrecord(dataes).then(res => {
						console.log("查询版本号 res",res)
						if(res.error_code==0){
							if (info.version != res.data[0].edition_name) {
								_this.downLoadUrl = res.data[0].url
								_this.logData=res.data[0].remark.split(";")
								_this.popupShow = true
							}else{
								this.$emit("isVersion",true)
							}
							uni.setStorageSync('checkVersionDate', nowtime);
						}else{
							_this.$refs.uToast.show({
								type: "error",
								message: "更新错误"
							})
						}
					}).catch(err => {  
						console.log(err)
					})
				})
				// #endif
			},
			checkVersionOk() {
				let _this = this;
				// let wgtUrl = "http://resource.ecsun.cn/ecSun2.apk";
				let wgtUrl = _this.httpUrl+_this.downLoadUrl
				// #ifdef APP-PLUS
				_this.logState = "up"
				_this.downloadTask = uni.downloadFile({
					url: wgtUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							_this.popupShow = false
							_this.downloadTask.abort();
						}
					}
				});
				_this.downloadTask.onProgressUpdate((res) => {
					_this.download.lineData = res.progress
					_this.download.already = (res
						.totalBytesWritten /
						1048576).toFixed(2)
					_this.download.total = (res
						.totalBytesExpectedToWrite /
						1048576).toFixed(2)
				});
				let filenames='_doc/update/wgtpackage/' + new Date().getTime() + '/'
				plus.downloader.createDownload(
					wgtUrl, {
						filename: filenames
					},
					function(res, code) {
						if(code==200){
							let filePath = res.filename;
							plus.zip.decompress(filePath, filenames,
								function() {
									let wgtlian=filePath.split(".zip")[0]+".wgt"
									// console.log("wgtlian wgtlian",wgtlian);
									plus.runtime.install(
										wgtlian, {
											force: false
										},(res) => {
											// console.log('install success...');
											_this.$refs.uToast.show({
												type: "success",
												message: "更新成功"
											})
											setTimeout(()=>{
												plus.runtime.restart()
											},1800)
										},(e) => {
											// console.error('install fail...',e);
											_this.$refs.uToast.show({
												type: "error",
												message: "更新失败"
											})
										}
									);
								},function(error) {
									// console.log("解压 失败————————————————————",error);
									_this.$refs.uToast.show({
										type: "error",
										message: "更新包解压失败"
									})
								}
							);
						}else{
							_this.$refs.uToast.show({
								type: "error",
								message: "下载更新包失败"
							})
						}
					}
				).start();
				// #endif
			},
			versionrecord(){
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "ins",
					"version":"1.0.9",
					"upurl":"109.zip",
					"edition":"109",
					"remark":["插入uni统计","优化显示效果","大声道","按顺序最出色的"]
				}
				console.log("上传版本号 dataes",dataes)
				Versionrecord(dataes).then(res => {
					console.log("上传版本号 res",res)
				}).catch(err => {  
					console.log(err)
				})
			}
			
			
		},
	}
</script>

<style lang="scss" scoped>
	.box-compents {
		// 更新日志................................................................................
		/deep/.popup-log {
			.u-popup__content {
				position: relative;
				padding: 0;
				border-radius: 16px;
				background-color: transparent;
				
				.imgposi {
					position: relative;
					top: -15px;
					uni-image {
						width: 100%;
						height: 124px;
						margin-top: 0 !important;
					}
					uni-text {
						position: absolute;
						top: 43px;
						left: 0;
						color: #fff;
						font-size: 18px;
						font-weight: 600;
						letter-spacing: 4px;
						margin-left: 30px;
					}
				}
				
				.conposi {
					padding: 0 10px 20px;
					position: relative;
					top: -20px;
					background-color: #fff;
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					.up-title {
						display: inline-block;
						font-size: 16px;
						font-weight: 600;
						color: #46A7F8;
					}
					.loadcon {
						margin-top: 0;
						.logzi {
							padding-left: 10px;
						}
					}
					.loadcon>* {
						margin-top: 10px;
					}
				}

				.uni-icons {
					position: absolute;
					bottom: -30px;
					left: calc(50% - 15px);
				}
				.u-button {
					width: 44%;
					margin-top: 16px;
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		// background-image: linear-gradient(to bottom, $my-page-linear-bgcolor, #fff, #fff);
	}
</style>
