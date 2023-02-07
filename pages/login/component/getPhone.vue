<template>
	<view class="box-com">
		
		<view class="sectionTitle" style="padding:0;">
			<view class="sectionPic"></view>
			<text>手机号登录</text>
		</view>
		<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
			<u-form-item prop="phone" :labelWidth="50">
				<u-input placeholder="请输入手机号" type="text" border="bottom" v-model="userInfo.phone" :disabled="true">
					<template slot="prefix">
						<uni-icons custom-prefix="iconfont" type="icon-cellphoneiphone" size="20"></uni-icons>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item prop="yzCode">
				<u-input placeholder="请输入验证码" type="text" border="bottom" v-model="userInfo.yzCode">
					<template slot="suffix">
						<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取" @end="codeEnd">
						</u-code>
						<u-button @tap="getCode" :text="tips" type="success" size="mini" :disabled="disabled">
						</u-button>
					</template>
				</u-input>
			</u-form-item>
			<u-button type="primary" :plain="true" text="手机号登录" @click="isphone"></u-button>
		</u-form>
		
		<u-toast ref="uToast"></u-toast>
		
	</view>
</template>

<script>
	import {
		logintype,
		sendCheck
	} from "@/network/api";
	export default {
		data() {
			return {
				userInfo: {
					phone: uni.getStorageSync("phone"),
					yzCode: ""
				},
				rules: {
					"phone": [{
							type: "string",
							required: true,
							message: "请填写手机号",
							trigger: ["blur", "change"]
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					"yzCode": {
						type: "string",
						required: true,
						message: "请填写验证码",
						trigger: ["blur", "change"]
					}
				},
				tips: '',
				disabled: false,
			}
		},
		mounted() {
			
		},
		methods: {
			//手机号登录
			isphone() {
				this.$refs.uForm.validate().then(res => {
					let data = {
						phone: this.userInfo.phone,
						type: "login",
						check_num: this.userInfo.yzCode,
					}
					sendCheck(data).then(res => {
						console.log('手机号登录 res', res)
						console.log('手机号登录 res json', JSON.parse(res))
						if (res.error_code == 0) {
							this.$refs.uToast.show({
								type:"success",
								message: "手机登录成功"
							})
							uni.setStorageSync("access_token", res.access_token.access_token);
							uni.setStorageSync("refresh_token", res.access_token.refresh_token);
							uni.setStorageSync("expires_in", res.access_token.expires_in);
							uni.setStorageSync('loginNum',3)
							//设置快速解锁(指纹、手势、人脸)的次数
							uni.setStorageSync('quiteNum', 3);
							//设置登录状态
							uni.setStorageSync('hasLogin', true);
							//设置账号密码登录的有效期 15天
							uni.setStorageSync('infoVld', new Date().valueOf() + 15*24*60*60*1000);
								uni.setStorageSync("loginWay", "SJ");
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/index/indexCheck"
								});
							}, 1000)
						}else{
							
						}
					})
				}).catch(errors => {
					
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					this.disabled = true
					uni.showLoading({
						title: '正在获取验证码'
					})
					let data = {
						phone: this.userInfo.phone,
						type: 'send'
					}
					console.log(data)
					sendCheck(data).then(res => {
						uni.hideLoading();
						console.log("获取验证码 res", res)
						if (res.error_code == 0) {
							uni.$u.toast('验证码已发送');
							this.$refs.uCode.start();
						}
					})
				} else {
					this.$refs.uToast.show({
						type:"error",
						message: "倒计时结束后再发送"
					})
				}
			},
			codeEnd() {
				this.disabled = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box-com {
		padding-bottom: 20px;
		
		/deep/.u-form>* {
			margin-top: 10px;
		}
		
		/deep/.u-input__content__prefix-icon {
			margin-right: 10px;
		}
		
		/deep/.u-form-item__body {
			padding: 0;
		}
	}
</style>