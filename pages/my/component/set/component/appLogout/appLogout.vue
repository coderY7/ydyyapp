<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">应用登出</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-cell title="立即登出" isLink @tap="logoutNow"></u-cell>
			<u-cell title="清除缓存" isLink @tap="clearCache">
				<text slot="value" style="color:#303133;">{{cacheSize}}</text>
			</u-cell>
			<u-cell title="重置并注销" isLink @tap="cancel"></u-cell>
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import {
		usercheck
	} from "@/network/api.js";
	export default {
		data() {
			return {
				cacheSize: "",
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.checkCache()
		},
		methods: {
			checkCache(){
				// #ifdef APP-PLUS
				plus.cache.calculate((size) => {
					if (size < 1024) {
						this.cacheSize = size + " B"
					} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
						this.cacheSize = Math.floor(size / 1024 * 100) / 100 + " KB"
					} else if (size / 1024 / 1024 >= 1) {
						this.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + " M"
					}
					console.log("this.cacheSize", this.cacheSize);
				})
				// #endif
			},
			logoutNow() {
				let dataes = {
					"access_token": "",
					"vtype": "logout",
					"companyid": uni.getStorageSync("companyid"),
					"userid": uni.getStorageSync("userid"),
					"password": "",
					"fdbh": uni.getStorageSync("fdbh"),
					"computerid": uni.getStorageSync("uuid"),//设备唯一标识
					"ipaddress": ""
				}
				usercheck(dataes).then((res) => {
					console.log("退出登录 res",res)
					if (res.error_code == 0) {
						this.$refs.uToast.show({
							type:"success",
							message: "退出成功"
						})
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages/login/login?ifCheckAll=false',
							});
						},1400)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			clearCache() {
				uni.showModal({
					content: "确定清除缓存?",
					confirmText: "确定",
					success: (res)=> {
						if (res.confirm) {
							// #ifdef APP-PLUS
							plus.cache.clear(()=>{
								this.checkCache()
								this.$refs.uToast.show({
									type:"success",
									message: "清除成功"
								})
							})
							// #endif
						} else if (res.cancel) {
							
						}
					}
				});
			},
			cancel() {
				uni.showModal({
					content: "确定退出登录并清除数据?",
					confirmText: "确定",
					success: (res)=> {
						if (res.confirm) {
							let dataes = {
								"access_token": uni.getStorageSync("access_token"),
								"vtype": "logout",
								"companyid": uni.getStorageSync("companyid"),
								"userid": uni.getStorageSync("userid"),
								"password": "",
								"fdbh": uni.getStorageSync("fdbh"),
								"computerid": uni.getStorageSync("uuid")//设备唯一标识
							}
							usercheck(dataes).then((res) => {
								console.log("重置并注销 res",res)
								if (res.error_code == 0) {
									this.$refs.uToast.show({
										type:"success",
										message: "重置成功"
									})
									uni.getStorageInfo({
										success: (res)=> {
											res.keys.forEach((v,i,arr)=>{
												if(v!="launchFlag"&&v!="openid"&&v!="wx"&&v!="nickName"&&v!="avatarUrl"&&v!="isBindGesture"&&v!="gesturePass"){
													uni.removeStorageSync(v)
												}
											})
										}
									});
									uni.getSavedFileList({
										success: (resget)=> {
											// console.log("获取已保存文件列表 resget",resget)
											if (resget.fileList.length > 0) {
												uni.setStorageSync('downloadTime',0)
												for(var i in resget.fileList){
													uni.removeSavedFile({
														filePath: resget.fileList[i].filePath,
														success: (resdel)=> {
															console.log("删除本地下载 db 文件成功 ！！！！！！");
														}
													});
												}
											}
										}
									});
									let onlyDbName=["addgoodsNotUp","addgoods","checkingNotUp","checking","getstorageNotUp","getstorage","pricelabelNotUp","pricelabel","doshopingNotUp","doshoping","search"]
									onlyDbName.forEach((v,i,arr)=>{
										let sqls="delete from "+v
										// #ifdef APP-PLUS
										plus.sqlite.executeSql({
											name: "only",
											sql: sqls,
											success: (resdel)=> {
												console.log('删除SQL '+v+' 成功');
											},
											fail: (e)=> {
												console.log('删除SQL '+v+' 失败');
											}
										});
										// #endif
									})
									setTimeout(()=>{
										uni.redirectTo({
											url: "/pages/login/register"
										});
									},1400)
								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (res.cancel) {
							
						}
					}
				});
			}
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
	}
</style>
