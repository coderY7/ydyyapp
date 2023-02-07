<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">修改密码</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
				<u-form-item label="新密码:" prop="pwd" :labelWidth="80" borderBottom>
					<u-input placeholder="请输入新密码" type="password" border="none" v-model="userInfo.pwd">
					</u-input>
				</u-form-item>
				<u-form-item label="确认密码:" prop="repwd" :labelWidth="80" borderBottom>
					<u-input placeholder="请再次输入新密码" type="password" border="none" v-model="userInfo.repwd">
					</u-input>
				</u-form-item>
				<u-button type="primary" :plain="true" text="修改密码" @tap="updatePwds"></u-button>
				<u-toast ref="uToast"></u-toast>
				
				
			</u-form>
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
				userInfo: {
					pwd: "",
					repwd: ""
				},
				rules: {
					"pwd": [{
							type: "string",
							required: true,
							message: "请填写密码",
							trigger: ["blur", "change"],
						},
						{
							asyncValidator: (rule, value, callback) => {
								let reg = /^[a-zA-Z0-9]{4,10}$/
								if (reg.test(value)) {
									callback();
								} else {
									callback(new Error('密码由4位以上的大小写字母和数字组成'));
								}
							}
						}
					],
					"repwd": [{
							type: "string",
							required: true,
							message: "请再次填写密码",
							trigger: ["blur", "change"],
						},
						{
							asyncValidator: (rule, value, callback) => {
								let reg = /^[a-zA-Z0-9]{4,10}$/
								if (reg.test(value)) {

									if (value == this.userInfo.pwd) {
										callback();
									} else {
										callback(new Error('两次密码不一致'));
									}
								} else {
									callback(new Error('密码由4位以上的大小写字母和数字组成'));
								}
							}
						}
					]
				},
				
			}
		},
		onReady(){
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			
		},
		methods: {
			updatePwds() {
				this.$refs.uForm.validate().then(resform => {
					let dataes = {
						"access_token": uni.getStorageSync("access_token"),
						"vtype": "updatepw",
						"companyid": uni.getStorageSync("companyid"),
						"userid": uni.getStorageSync("userid"),
						"password": this.userInfo.repwd,
						"fdbh": uni.getStorageSync("fdbh"),
						"computerid": uni.getStorageSync("uuid")//设备唯一标识
					}
					console.log("修改密码 dataes", dataes)
					usercheck(dataes).then((res) => {
						console.log("修改密码 res", res)
						if (res.error_code == 0) {
							this.$refs.uToast.show({
								type:"success",
								message: "修改成功"
							})
							setTimeout(()=> {
								uni.redirectTo({
									url: "/pages/login/login?ifCheckAll=false"
								});
							}, 1500)
						} else {
							this.$refs.uToast.show({
								type:"error",
								message: "错误"
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				}).catch(errors => {

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
			padding-top: calc(var(--status-bar-height) + 52px);
		}
		/deep/.uni-page {
			height: unset;
		}
		
		/deep/.u-form>* {
			margin-top: 10px;
		}
		
		/deep/.u-form-item__body {
			padding-top: 8px;
			padding-bottom: 8px;
		}
	}
</style>
<style lang="scss">
	// page {
	// 	background-color: #fff;
	// }
</style>
