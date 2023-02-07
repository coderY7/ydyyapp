<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left"></view>
			<view class="center">注册</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
				<u-form-item label="序列号:" :labelWidth="72" prop="sn" borderBottom>
					<u-input type="text" v-model="userInfo.sn" placeholder="请输入序列号" border="none"></u-input>
				</u-form-item>
				<u-form-item label="分店号:" :labelWidth="72" prop="fdbh" borderBottom>
					<u-input type="text" v-model="userInfo.fdbh" placeholder="请输入分店号" border="none"></u-input>
				</u-form-item>
				<u-form-item label="分店类型:" :labelWidth="72" prop="fdlx">
					<uni-data-select v-model="userInfo.fdlx" :localdata="selectRange" @change="selectChange" :clear="false"></uni-data-select>
				</u-form-item>
				
				<u-button type="primary" class="my-primary-button" text="注册" @tap="regist"></u-button>
				<u-button type="primary" class="my-primary-button" :plain="true" text="扫码注册" @tap="scan"></u-button>
			</u-form>
			
			<u-toast ref="uToast"></u-toast>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					sn: "MOPMPI-MLKKNG-KFOLNF-QINPHH",
					fdbh: "0000",
					fdlx: "PS",
					// userid: ""
				},
				rules: {
					"sn": [{
						type: "string",
						required: true,
						message: "请填写序列号",
						trigger: ["blur", "change"]
					}, {
						validator: (rule, value, callback) => {
							var reg = /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/
							// var reg = /^[a-zA-Z0-9]{4,10}$/
							return reg.test(value)
						},
						message: '序列号格式不正确',
						trigger: ['change', 'blur'],
					}],
					"fdbh": [{
						type: "string",
						required: true,
						message: "请填写分店号",
						trigger: ["blur", "change"], //数字加字母
					}, {
						validator: (rule, value, callback) => {
							var reg = /^[a-zA-Z0-9]{4,10}$/
							return reg.test(value)
						},
						message: '分店号格式不正确',
						trigger: ['change', 'blur'],
					}],
					"fdlx": {
						type: "string",
						required: true,
						message: "请填写分店类型",
						trigger: ["blur", "change"] //总部，单店，分店
					},
				},
				selectRange: [{
						value: "PS",
						text: "PS-总部"
					},
					{
						value: "SD",
						text: "SD-单店"
					},
					{
						value: "ONFD",
						text: "ONFD-在线门店"
					}
				],
				// BD   FD    PS
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			regist() {
				this.$refs.uForm.validate().then(res => {
					uni.setStorageSync("sn", this.userInfo.sn);
					uni.setStorageSync("fdlx", this.userInfo.fdlx);
					this.$refs.uToast.show({
						type:"success",
						message: "注册成功"
					})
					setTimeout(()=>{
						uni.redirectTo({
							url: "/pages/login/login?ifCheckAll=true"
						});
					},1800)
				}).catch(errors => {
					
				})
			},
			scan() {
				uni.scanCode({
					success: (res) => {
						console.log('扫码内容', res)
						let URL = "http://resource.ecsun.cn/init.html"
						let urls = res.result.split('?')[0];
						let parame = res.result.split('?')[1]
						// let userid = parame.split('#')[0]
						let sn = parame.split('#')[1]
						let fdbh = parame.split('#')[2]
						let fdlx = parame.split('#')[3]
						this.userInfo.fdbh = fdbh
						this.userInfo.sn = sn
						this.userInfo.fdlx = fdlx
						// this.userInfo.userid = userid
						console.log(fdbh, sn)
						if (URL == urls) {
							this.regist()
						} else {
							this.$refs.uToast.show({
								type:"error",
								message: "二维码错误"
							})
						}
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type:"error",
							message: "扫码失败"
						})
					}
				});
			},
			selectChange(event){
				this.userInfo.fdlx=event
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
			/deep/.u-form{
				.u-form-item__body{
					padding-top: 8px;
					padding-bottom: 8px;
				}
				.u-form-item__body__left__content__label{
					display: inline-block;
					text-align-last: justify;
				}
				.uni-stat__select{
					width: 100%;
					padding: 0;
					.uni-select__selector{
						box-shadow: 0px 2px 12px 0 rgba(0,0,0,.38);
					}
				}
			}
			
			/deep/.u-form>* {
				margin-top: 10px;
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>