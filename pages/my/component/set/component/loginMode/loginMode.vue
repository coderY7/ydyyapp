<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">
				<text>登录方式设置</text>
			</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view style="margin-top:0;">
				<u-cell title="新增手机号" isLink @tap="addPhone" :style="addStyle"></u-cell>
				<u-cell title="更换手机号" isLink @tap="updatePhone" :style="hasStyle"></u-cell>
				<u-cell title="解绑手机号" isLink @tap="removePhone" :style="hasStyle"></u-cell>
			</view>
			<view>
				<u-cell title="绑定微信" isLink @tap="addWeixin" :style="haswxStyle"></u-cell>
				<u-cell title="解绑微信" isLink @tap="removeWeixin" :style="notwxStyle"></u-cell>
			</view>
			<view>
				<u-cell title="设置手势" isLink @tap="addFinger" :style="gestureStyle"></u-cell>
				<u-cell title="设置人脸" isLink @tap="addFace" :style="faceStyle"></u-cell>
			</view>

			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import {
		logintype
	} from "@/network/api";
	export default {
		data() {
			return {
				wxopenid: "", //微信openid
				isbindPhone: "",
				addStyle: "",
				hasStyle: "",
				isbindWx: "",
				haswxStyle: "",
				notwxStyle: "",
				isbindGesture: "",
				gestureStyle: "",
				isBindFace: "",
				faceStyle: ""
			};
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.changeBackColor()
		},
		methods: {
			addPhone() {
				if (this.isbindPhone) {
					this.$refs.uToast.show({
						type: "error",
						message: "手机号已绑定！"
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/component/set/component/loginMode/component/setPhone/setPhone',
					})
				}
			},
			updatePhone() {
				if (this.isbindPhone) {
					uni.navigateTo({
						url: '/pages/my/component/set/component/loginMode/component/aclphone/aclphone',
					})
				} else {
					this.$refs.uToast.show({
						type: "error",
						message: "您还没有绑定手机号！"
					})
				}
			},
			removePhone() {
				if (this.isbindPhone) {
					uni.navigateTo({
						url: '/pages/my/component/set/component/loginMode/component/unphone/unphone',
					})
				} else {
					this.$refs.uToast.show({
						type: "error",
						message: "您还没有绑定手机号！"
					})
				}
			},
			addWeixin() {
				if (this.isbindWx) {
					this.$refs.uToast.show({
						type: "error",
						message: "您已绑定了一个微信号！"
					})
				} else {
					let _this = this
					uni.getProvider({
						service: 'oauth',
						success: function(resAuth) {
							if (~resAuth.provider.indexOf('weixin')) {
								uni.login({
									provider: "weixin",
									success: (reslogin) => {
										console.log("login reslogin", reslogin);
										uni.setStorageSync('openid', reslogin.authResult.openid)
										//openid和工号绑定
										let data = {
											"access_token": uni.getStorageSync("access_token"),
											"userid": uni.getStorageSync('userid'),
											"openid": uni.getStorageSync('openid'),
											"type": 'ins'
										}
										logintype(data).then(resbind => {
											console.log("微信绑定 resbind",resbind)
											if(resbind.error_code==0){
												_this.$refs.uToast.show({
													type: "success",
													message: "微信绑定成功！"
												})
												uni.setStorageSync('wx', true)
												_this.changeBackColor()
											}else{
												_this.$refs.uToast.show({
													type: "error",
													message: "微信绑定失败！"
												})
											}
											
										})
										// 获取用户信息
										uni.getUserInfo({
											provider: 'weixin',
											success: (resinfo) => {
												uni.setStorageSync('nickName', resinfo
													.userInfo.nickName)
												uni.setStorageSync('avatarUrl', resinfo
													.userInfo.avatarUrl)
											}
										});
									},
									fail: (err) => {
										console.log("err", err);
										_this.$refs.uToast.show({
											type: "error",
											message: "获取微信openid失败"
										})
									}
								});
							}
						}
					});
				}
			},
			removeWeixin() {
				if (this.isbindWx) {
					let data = {
						userid: uni.getStorageSync('userid'),
						openid: uni.getStorageSync('openid'),
						typeinfo: 'rewx',
						type: 'remove',
					}
					logintype(data).then(res => {
						console.log("微信解绑 res",res)
						this.$refs.uToast.show({
							type: "success",
							message: "微信解绑成功"
						})
						uni.removeStorageSync('nickName')
						uni.removeStorageSync('avatarUrl')
						uni.removeStorageSync('wx')
						this.changeBackColor()
					})
				} else {
					this.$refs.uToast.show({
						type: "error",
						message: "您还没有绑定微信！"
					})
				}
			},
			addFinger() {
				if (this.isbindGesture) {
					this.$refs.uToast.show({
						type: "error",
						message: "您已绑定了手势解锁！"
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/component/set/component/loginMode/component/gesture/gesture',
					})
				}
			},
			addFace() {
				if (this.isBindFace) {
					this.$refs.uToast.show({
						type: "error",
						message: "您已绑定了人脸解锁！"
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/component/set/component/loginMode/component/setFace/setFace',
					})
				}
			},
			changeBackColor(){
				this.isbindPhone= uni.getStorageSync("phone")
				this.isbindWx= uni.getStorageSync("wx")
				this.isbindGesture= uni.getStorageSync("isBindGesture")
				this.isBindFace= uni.getStorageSync("isBindFace")
				if (this.isbindPhone) {
					this.addStyle = {
						"background-color": "#DADADA"
					}
					this.hasStyle = {
						"background-color": "#fff"
					}
				} else {
					this.addStyle = {
						"background-color": "#fff"
					}
					this.hasStyle = {
						"background-color": "#DADADA"
					}
				}
				//..........................................
				if (this.isbindWx) {
					this.haswxStyle = {
						"background-color": "#DADADA"
					}
					this.notwxStyle = {
						"background-color": "#fff"
					}
				} else {
					this.haswxStyle = {
						"background-color": "#fff"
					}
					this.notwxStyle = {
						"background-color": "#DADADA"
					}
				}
				//...................
				if (this.isbindGesture) {
					this.gestureStyle = {
						"background-color": "#DADADA"
					}
				} else {
					this.gestureStyle = {
						"background-color": "#fff"
					}
				}
				//..................
				if (this.isBindFace) {
					this.faceStyle = {
						"background-color": "#DADADA"
					}
				} else {
					this.faceStyle = {
						"background-color": "#fff"
					}
				}
			}

		},
		computed: {
			skin() {
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
		.box-content>* {
			margin-top: 10px;
		}
	}
</style>
