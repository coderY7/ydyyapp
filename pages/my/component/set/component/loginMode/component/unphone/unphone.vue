<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">解绑手机号</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
				<u-form-item label="手机号:" prop="phone" borderBottom :labelWidth="60">
					<u-input placeholder="请输入手机号" type="text" border="none" v-model="userInfo.phone" :disabled="true">
					</u-input>
				</u-form-item>
				<u-form-item label="验证码:" prop="yzCode" borderBottom :labelWidth="60">
					<u-input placeholder="请输入验证码" type="text" border="none" v-model="userInfo.yzCode">
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取" @end="codeEnd">
							</u-code>
							<u-button @tap="getCode" :text="tips" type="success" size="mini" :disabled="disabled">
							</u-button>
						</template>
					</u-input>
				</u-form-item>
				<u-button type="primary" text="解绑手机号" @click="isphone"></u-button>
			</u-form>
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import {
		logintype,
		bindphone
	} from "@/network/api";
	export default {
		data() {
			return {
				userInfo: {
					phone: uni.getStorageSync('phone'),
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
						asyncValidator: (rule, value, callback) => {
							if (this.yzState == "yzm") {
								callback();
							} else if (this.yzState == "ALL") {
								if (value == "") {
									callback(new Error('验证码不能为空'));
								} else {
									callback();
								}
							}
						}
					}
				},
				yzState: "yzm",
				tips: '',
				disabled: false,
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			//解绑手机号
			isphone() {
				this.yzState = "ALL"
				this.$refs.uForm.validate().then(ress => {

					let isdata = {
						"access_token": uni.getStorageSync("access_token"),
						"check_num": this.userInfo.yzCode,
						"type": 'Jbind',
						"phone": this.userInfo.phone,
						"userid": uni.getStorageSync('userid')
					}
					// console.log(isdata)
					bindphone(isdata).then(res => {
						console.log("解绑 res",res)
						if(res.error_code==0){
							this.$refs.uToast.show({
								type:"success",
								message: res.message
							})
							uni.removeStorageSync('phone');
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								});
							},2000)
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "解绑手机号失败"
							})
						}
					})
				}).catch(errors => {
					
				})
			},
			codeChange(text) {
				this.tips = text;

			},
			getCode() {
				this.yzState = "yzm"
				this.$refs.uForm.validate().then(ress => {
					if (this.$refs.uCode.canGetCode) {
						this.disabled = true
						uni.showLoading({
							title: '正在获取验证码'
						})
						let data = {
							"access_token": uni.getStorageSync("access_token"),
							"phone": this.userInfo.phone,
							"type": 'remove',
							"typeinfo": 'rep',
							"userid": uni.getStorageSync('userid')
						}
						console.log(data)
						logintype(data).then(res => {
							uni.hideLoading();
							console.log('验证发送', res)
							if(res.error_code==0){
								this.$refs.uToast.show({
									type:"success",
									message: "验证码已发送"
								})
								this.$refs.uCode.start();
							}else{
								this.$refs.uToast.show({
									type:"error",
									message: "验证码发送失败"
								})
							}
						})
					} else {
						this.$refs.uToast.show({
							type:"error",
							message: "倒计时结束后再发送"
						})
					}
				}).catch(errors => {
					
				})
			},
			codeEnd() {
				this.disabled = false

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
		}
		/deep/.u-form{
			margin-top: 5px;
			.u-form-item__body{
				padding: 10px 0;
			}
			
			.u-button--primary{
				margin-top: 10px;
			}
		}
	}
</style>
<style lang="scss">
	// page {
	// 	background-color: #fff;
	// }
</style>