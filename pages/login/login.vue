<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="box-content">
			<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" :style="uFormSty">
				<view :style="uFormChildSty">
					<text style="font-size:30px;font-weight:600;">登  录</text>
					<view class="point">
						<p></p>
						<p></p>
						<p></p>
					</view>
				</view>
				<u-form-item prop="name" :labelWidth="50" :style="uFormChildSty">
					<u-input type="text" v-model="userInfo.name" shape="circle" placeholder="请输入账号..."
						placeholderStyle="text-align:center;color: #c0c4cc;" :style="nameStyle" @blur="nameBlur">
					</u-input>
				</u-form-item>
				<u-form-item prop="pwd" :labelWidth="50" :style="uFormChildSty">
					<u-input type="password" v-model="userInfo.pwd" shape="circle" clearable placeholder="请输入密码..."
						placeholderStyle="text-align:center;color: #c0c4cc;" :style="pwdStyle">
					</u-input>
				</u-form-item>
				<u-form-item prop="selectValue" :labelWidth="50" :style="uFormChildSty">
					<uni-data-select v-model="userInfo.selectValue" :localdata="selectRange" :clear="false"></uni-data-select>
				</u-form-item>
				
				<u-form-item prop="code" :labelWidth="50" v-show="codeShow<=0" :style="uFormChildSty">
					<view class="codeView">
						<u-input type="text" placeholder="请输入验证码" placeholderStyle="text-align:center;color: #c0c4cc;" shape="circle" border="surround"
							v-model="userInfo.code" :style="codeStyle">
						</u-input>
						<veryficationCode ref="imgCode"></veryficationCode>
					</view>
				</u-form-item>
				<view class="quickRow" :style="uFormChildSty">
					<text v-if="quickLogShow" @tap="modalShow=true">快速登录</text>
					<text @tap="reset">重置注册信息</text>

				</view>
				<u-button type="primary" text="登 录" throttleTime="1000" @tap="tologin" :style="uFormChildSty"></u-button>

				<u-divider text="其他登录" :style="uFormChildSty"></u-divider>
				<view class="otherLog" :style="uFormChildSty">
					<view v-if="wx">
						<uni-icons type="weixin" size="30" color="#fff" @click="iswx"></uni-icons>
					</view>
					<uni-icons custom-prefix="iconfont" type="icon-cellphoneiphone" size="30" @click="showphone=true" v-if="phone">
					</uni-icons>
				</view>
			</u-form>
			
			<u-popup :show="wxcodeShow" mode="center" class="u-popup-center" :closeable="true" @close="wxcodeShow=false">
				<view class="codeView" v-show="codeShow<=0">
					<u-input type="text" placeholder="请输入验证码" shape="circle" border="surround"
						v-model="userInfo.code">
					</u-input>
					<veryficationCode ref="imgCodePopup"></veryficationCode>
				</view>
				<u-button type="primary" text="确定" throttleTime="1000" style="margin-top:10px;width:50%;" @tap="wxcodeCli"></u-button>
			</u-popup>
			<u-popup :show="showphone" mode="bottom" :closeable="true" @close="showphone=false">
				<getPhone></getPhone>
			</u-popup>
			<u-notify ref="wx"></u-notify>
			<text class="zi">麦 子 易 商 提 供 专 业 服 务</text>
		</view>
		<u-modal :show="modalShow" @confirm="confirm" confirmText="取消">
			<view class="slot-content" style="color: #909399;width: 100%;text-align: center;"> 
				<image src="@/static/images/finger.png" mode="widthFix" style="width:100px;margin-bottom: 20px;"></image>
				<u-button type="primary" :plain="true" text="指纹验证" throttleTime="1000" @tap="startFingerPrint" v-if="isBindFinger">
				</u-button>
				<u-button type="primary" :plain="true" text="手势验证" throttleTime="1000" @tap="gestureYZ" v-if="isBindGesture"></u-button>
				<u-button type="primary" :plain="true" text="人脸验证" throttleTime="1000" @tap="faceYZ" v-if="isBindFace"></u-button>
			</view>
		</u-modal>
		<u-popup :show="popupShow" mode="center" class="u-popup-center popup-log" zIndex="5000">
			<image src="@/static/images/finger.png" mode="widthFix"></image>
			<view class="zhiwen-cu">将触控id用于"麦子易商"</view>
			<view class="zhiwen-xi">请验证指纹</view>
			<uni-icons type="close" size="40" color="#fff" @tap="cancelFinger"></uni-icons>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
  
	</view>
</template>

<script>
	import {
		checkuserid,
		usercheck,
		userfast
	} from "@/network/api.js";
	import veryficationCode from '@/components/veryficationCode/veryficationCode';
	import getPhone from '@/pages/login/component/getPhone';
	export default {
		components: {
			veryficationCode,
			getPhone
		},
		data() {
			return {
				showphone: false, //手机号组件
				wx: uni.getStorageSync('wx') ? uni.getStorageSync('wx') : false, //微信绑定
				phone: uni.getStorageSync('phone') ? uni.getStorageSync('phone') : false, //手机号绑定
				selectRange: [],
				userInfo: {
					name: "", 
					pwd: "",
					code: "",
					selectValue:"",
				},
				rules: {
					"name": [{
							type: "string",
							required: true,
							message: "请输入账号",
							trigger: ["blur", "change"]
						},
						{
							validator: (rule, value, callback) => {
								if (value == "") {
									this.nameStyle = {
										"border": "1px solid red !important",
									}
									return false
								} else {
									this.nameStyle = {}
									return true
								}
							},
							trigger: ['change', 'blur'],
						}
					],
					"pwd": [{
							type: "string",
							required: true,
							message: "请输入密码",
							trigger: ["blur", "change"]
						},
						{
							validator: (rule, value, callback) => {
								if (value == "") {
									this.pwdStyle = {
										"border": "1px solid red !important",
									}
									return false
								} else {
									this.pwdStyle = {}
									return true
								}
							},
							trigger: ['change', 'blur'],
						}
					],
					"code": {
						asyncValidator: (rule, value, callback) => {
							if (uni.getStorageSync('loginNum') <= 0) {
								if (value == uni.getStorageSync("imgCode")) {
									this.codeStyle = {}
									callback();
								} else {
									this.codeStyle = {
										"border": "1px solid red !important",
									}
									callback(new Error('验证码错误'));
								}
							} else {
								callback();
							}
						}
					},
					"selectValue": {
						type: "string",
						required: true,
						message: "请选择分店",
						trigger: ["blur", "change"]
					},
				},
				wxcodeShow: false,
				codeShow: uni.getStorageSync('loginNum'),
				isFirstLog: "",
				isBindWei: "",
				isBindPhone: "",

				nameStyle: {},
				pwdStyle: {},
				codeStyle: {},
				modalShow: false,
				isBindFinger: uni.getStorageSync('isBindFinger'),
				isBindGesture: uni.getStorageSync('isBindGesture'),
				isBindFace: uni.getStorageSync('isBindFace'),
				quickLogShow: false,
				uFormSty: {},
				uFormChildSty:{},
				popupShow:false
			}
		},
		onLoad: function(option) {
			this.checkAll(option.ifCheckAll)
		},
		onReady() {
			uni.getSystemInfo({
				success: function (res) {
					// console.log("getSystemInfo",res)
					let heights=""
					if(res.screenHeight - 70>480){
						heights=res.screenHeight - 70
					}else{
						heights=480
					}
					let diffce=parseInt((heights-278)/8)
					//验证 安卓版本号
					if(res.system.split(" ")[1].split(".")[0]<8){
						this.uFormSty = {
							"height": heights + "px",
							"min-height": "480px",
						}
						this.uFormChildSty={
							"margin-top":diffce+"px"
						}
					}else{
						this.uFormSty = {
							"height": heights + "px",
							"min-height": "480px",
							"justify-content": "space-evenly"
						}
					}
				}.bind(this)
			});
			this.checkIsFinger()
		},
		onShow() {
			this.imgCodeFunc()
		},
		methods: {
			nameBlur(value){
				checkuserid({
					"userid":this.userInfo.name
				}).then((rescheck) => {
					// console.log("checkuserid rescheck", rescheck)
					if(rescheck.error_code==0){
						uni.setStorageSync("companyid", rescheck.companyid)
						this.userInfo.selectValue=rescheck.fdlist[0].fdbh
						this.selectRange=[]
						for(var u in rescheck.fdlist){
							this.selectRange.push({
								"value":rescheck.fdlist[u].fdbh,
								"text":`${rescheck.fdlist[u].fdbh}-${rescheck.fdlist[u].fdmc}`,
							})
						}
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: rescheck.message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			imgCodeFunc() {
				setTimeout(() => {
					this.$refs.imgCode.init();
				}, 500)
			},
			codeShowFunc() {
				this.codeShow = uni.getStorageSync("loginNum")
			},
			tologin() {
				this.$refs.uForm.validate().then(resf => {
					// 登录
					let dataes = {
						"access_token": "",
						"vtype": "login",
						"companyid": uni.getStorageSync("companyid"),
						"userid": this.userInfo.name,
						"password": this.userInfo.pwd,
						"fdbh": this.userInfo.selectValue,
						"computerid": uni.getStorageSync("uuid"),//设备唯一标识
						"ipaddress": uni.getStorageSync("ip"),
						// "apptype": "app"
					}
					console.log("登录 dataes", dataes)
					usercheck(dataes).then((res) => {
						console.log("登录 res", res)
						if (res.error_code == 0) {
							this.$refs.uToast.show({
								type:"success",
								message: "登录成功"
							})
							uni.setStorageSync("userid", this.userInfo.name);
							uni.setStorageSync("password", this.userInfo.pwd);
							uni.setStorageSync("fdbh", this.userInfo.selectValue);
							uni.setStorageSync("fdmc", res.companyinfo.erp_fdmc);
							uni.setStorageSync("access_token", res.access_token);
							uni.setStorageSync("refresh_token", res.refresh_token);
							uni.setStorageSync("expires_in", res.expires_in);
							
							uni.setStorageSync("companyname", res.companyinfo.erp_companyname)
							uni.setStorageSync("dlmc", res.userinfo.erp_username);
							uni.setStorageSync("groupid", res.userinfo.erp_groupid);
							uni.setStorageSync("groupname", res.userinfo.erp_groupname);
							//设置快速解锁(指纹、手势、人脸)的次数
							uni.setStorageSync("quiteNum", 3);
							//设置登录状态
							uni.setStorageSync("hasLogin", true);
							//设置不是第一次登录
							uni.setStorageSync("isFirstLog", false);
							//设置账号密码登录的有效期 15天
							uni.setStorageSync("infoVld", new Date().valueOf() + 15*24*60*60*1000);
							uni.setStorageSync("loginWay", "ZC");
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/index/indexCheck"
								});
							}, 900)
						} else {
							this.$refs.uToast.show({
								type:"error",
								message: res.message
							})
							uni.setStorageSync('loginNum', uni.getStorageSync('loginNum') - 1)
							this.codeShowFunc()
							if (uni.getStorageSync('loginNum') <= 0) {
								this.imgCodeFunc()
							}
						}
					}).catch((err) => {
						console.log(err)
					})
				}).catch(errors => {
					// console.log("表单验证错误 errors",errors)
					uni.setStorageSync('loginNum', uni.getStorageSync('loginNum') - 1)
					this.codeShowFunc()
					if (uni.getStorageSync('loginNum') <= 0) {
						this.imgCodeFunc()
					}
				})
			},
			//检查权限
			checkAll(ifCheckAll) {
				uni.getStorage({
					key: 'isFirstLog',
					success: (res)=> {
						//不是第一次登录
						this.isFirstLog = false
						//判断账号密码登录是否过期
						uni.getStorage({
							key: 'infoVld',
							success: (resinfo)=> {
								var now = new Date().valueOf()
								//登录信息是否过期
								if (now <= resinfo.data) {
									if (ifCheckAll == "true") {
										if (uni.getStorageSync('quiteNum') > 0) {
											if (uni.getStorageSync('isBindFinger')) {
												if(uni.getStorageSync('isBindGesture')||uni.getStorageSync('isBindFace')){
													this.modalShow = true
												}else{
													this.startFingerPrint()
												}
											} else if (uni.getStorageSync('isBindGesture')) {
												this.modalShow = true
											} else if (uni.getStorageSync('isBindFace')) {
												this.modalShow = true
											} else {
												this.$refs.uToast.show({
													type: "error",
													message: "没有绑定快速解锁，请使用工号、微信或手机号登录"
												})
											}
										} else {
											this.modalShow = false
											this.$refs.uToast.show({
												type:"error",
												message: "快速解锁次数已用完，请重新使用工号、微信或手机号登录"
											})
										}
									}
								} else {
									this.$refs.uToast.show({
										type:"error",
										message: "登录信息已过期，请重新使用工号、微信或手机号登录"
									})
								}
							},
							fail: function(err) {

							},
						});
					},
					fail: (err)=> {
						//第一次登录
						this.isFirstLog = true
						console.log("isFirstLog", this.isFirstLog)
					},
				});
			},
			//检查是否录入指纹
			checkIsFinger() {
				// #ifdef APP-PLUS
				if(!plus.fingerprint.isSupport()) {
					uni.setStorageSync("isBindFinger", false);
					return;
				}
				if(plus.fingerprint.isKeyguardSecure()) {
					if(plus.fingerprint.isEnrolledFingerprints()) {
						uni.setStorageSync("isBindFinger", true);
					}else{
						uni.setStorageSync("isBindFinger", false);
						this.$refs.uToast.show({
							type: "error",
							message: "此设备未录入指纹，请先录入指纹"
						})
					}
				}else{
					uni.setStorageSync("isBindFinger", false);
					this.$refs.uToast.show({
						type: "error",
						message: "此设备未设置密码锁屏，无法使用指纹识别"
					})
				}
				// #endif
			},
			// 开始指纹验证
			startFingerPrint() {
				this.modalShow=false
				this.popupShow=true
				// #ifdef APP-PLUS
				plus.fingerprint.authenticate((res)=> {
					if (res.code == 0) {
						this.$refs.uToast.show({
							type: "success",
							message: "指纹解锁成功"
						})
						uni.setStorageSync('quiteNum', 3);
						this.popupShow=false
						setTimeout(()=>{
							uni.redirectTo({
								url: "/pages/index/indexCheck"
							});
						},1500)
					}
				}, (err)=> {
					let toast_mess=""
					if(err.code==1){
						toast_mess="当前设备不支持指纹识别"
					}else if(err.code==2){
						toast_mess="当前设备无法使用指纹识别"
					}else if(err.code==3){
						toast_mess="当前设备未录入指纹"
					}else if(err.code==4){
						toast_mess="用户指纹识别认证不通过"
					}else if(err.code==5){
						toast_mess="指纹识别次数超过限制"
					}else if(err.code==6){
						toast_mess="用户取消指纹识别认证"
					}else if(err.code==7){
						toast_mess="未知错误"
					}
					uni.setStorageSync('quiteNum', uni.getStorageSync('quiteNum') - 1);
					if(uni.getStorageSync("quiteNum")<=0){
						this.modalShow = false
						uni.$u.toast("快速解锁次数已用完，请重新使用工号、微信或手机号登录")
					}else{
						uni.$u.toast(toast_mess+"，还剩" + uni.getStorageSync("quiteNum") + "次机会")
						// this.modalShow=true
						// this.popupShow=false
					}
				});
				// #endif
			},
			//取消指纹验证
			cancelFinger(){
				// #ifdef APP-PLUS
				plus.fingerprint.cancel();
				// #endif
				this.popupShow=false
				if (uni.getStorageSync('isBindFinger')==true&&uni.getStorageSync('isBindGesture')==false&&uni.getStorageSync('isBindFace')==false) {
					this.modalShow=false
				}else{
					this.modalShow=true
				}
			},
			confirm() {
				this.modalShow = false;
				this.quickLogShow = true
			},
			
			gestureYZ() {
				uni.navigateTo({
					url: "/pages/login/component/getGesture"
				});
			},
			faceYZ() {
				uni.navigateTo({
					url: "/pages/login/component/getFace"
				});
			},
			reset() {
				uni.getStorageInfo({
					success: function (res) {
						res.keys.forEach((v,i,arr)=>{
							if(v!="launchFlag"&&v!="openid"&&v!="wx"&&v!="nickName"&&v!="avatarUrl"&&v!="isBindGesture"&&v!="gesturePass"){
								uni.removeStorageSync(v)
							}
						})
					}
				});
				uni.getSavedFileList({
					success: function(resget) {
						// console.log("获取已保存文件列表 resget",resget)
						if (resget.fileList.length > 0) {
							uni.setStorageSync('downloadTime',0)
							for(var i in resget.fileList){
								uni.removeSavedFile({
									filePath: resget.fileList[i].filePath,
									success: function(resdel) {
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
						success: function(res) {
							console.log('删除SQL '+v+' 成功');
						},
						fail: function(e) {
							console.log('删除SQL '+v+' 失败');
						}
					});
					// #endif
				})
				uni.redirectTo({
					url: "/pages/login/register"
				});
			},
			//微信登录
			iswx() {
				if(uni.getStorageSync('loginNum')<=0){
					this.wxcodeShow=true
					setTimeout(()=>{
						this.$refs.imgCodePopup.init();
					},400)
					return
				}
				this.wxloginFunc()
			},
			wxcodeCli(){
				if(this.userInfo.code== uni.getStorageSync("imgCode")){
					this.wxloginFunc()
				}else{
					this.userInfo.code=""
					setTimeout(()=>{
						this.$refs.imgCodePopup.init();
					},400)
					this.$refs.uToast.show({
						type: "error",
						message: "验证码错误"
					})
				}
			},
			wxloginFunc(){
				// 获取微信openid
				uni.getProvider({
					service: 'oauth',
					success: (resAuth)=> {
						if (~resAuth.provider.indexOf('weixin')) {
							uni.login({
								provider: "weixin",
								success: (reslogin) => {
									// console.log("微信登录 reslogin",reslogin)
									let data = {
										type: 'wx',
										openid: reslogin.authResult.openid,
										phone: '',
									}
									// console.log("微信登录 data",data)
									userfast(data).then(res => {
										console.log("微信登录 res",res)
										if (res.error_code == 0) {
											this.$refs.uToast.show({
												type:"success",
												message: "微信登录成功"
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
											uni.setStorageSync("loginWay", "WX");
											setTimeout(function() {
												uni.redirectTo({
													url: "/pages/index/indexCheck"
												});
											}, 1900)
										}else{
											this.$refs.uToast.show({
												type:"error",
												message: res.message
											})
											uni.setStorageSync('loginNum', uni.getStorageSync('loginNum') - 1)
											this.codeShowFunc()
											if (uni.getStorageSync('loginNum') <= 0) {
												setTimeout(()=>{
													this.$refs.imgCodePopup.init();
												},400)
											}
										}
									}).catch((err) => {
										console.log(err)
									})
								},
								fail: (err) => {
									console.log("err", err);
									this.$refs.uToast.show({
										type: "error",
										message: "获取微信openid失败"
									})
								}
							});
						}
					}
				});
			},
			//获取验证码
			getcode() {
				if (uni.getStorageSync("imgCode") == this.iscode) {
					this.verify = true
				} else {
					this.verify = false
				}
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
	.box {
		width: 100%;
		height: 100vh;
		background-size: 100% auto;
		padding: 0;
		margin: 0;
		overflow: hidden;

		.box-content {
			height: 100%;
			padding: 20px 30px 0;
			background-size: 100% auto;
		}
		
		.point{
			display: flex;
			margin-top: 4px;
		}
		.point>p{
			width: 8px;
			height: 8px;
			border-radius: 5px;
			background-color: #0B5591;
			margin-left: 6px;
		}
		.point>p:nth-child(2){
			background-color: #528CC4;
		}
		.point>p:nth-child(3){
			background-color: #A9BDCC;
		}
		/deep/.u-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			.u-form-item__body {
				padding: 0;
				.uni-input-input{
					text-align: center;
				}
			}
		}
		
		/deep/.u-form>* {
			width: 100%;
		}
		
		/deep/.uni-stat__select{
			width: 100%;
			padding: 0;
			.uni-select{
				padding: 10px 9px;
				border-radius: 40px;
				border-bottom: 0;
				border: 0.5px solid #dadbde;
				.uni-select__input-box{
					min-height: 26px;
					justify-content: center;
					.uni-select__input-text {
						width: auto;
						margin-right: 6px;
					}
					.uni-select__input-placeholder{
						color: #c0c4cc;
					}
					.uni-icons{
						color: #c0c4cc;
					}
				}
			}
			
			.uni-select__selector{
				box-shadow: 0px 2px 12px 0 rgba(0,0,0,.38);
				.uni-select__selector-item{
					justify-content: center;
					line-height: 44px;
				}
			}
		}
		
		/deep/.u-popup-center .u-popup__content {
		   padding: 28px 10px 20px;
		}
		
		.codeView {
			display: flex;
			justify-content: space-between;
			align-items: center;
		
			/deep/.u-input {
				margin-right: 10px;
			}
		}
		
		/deep/.u-input {
			height: 34px;
		}
		
		/deep/.u-form:first-child{
			.u-button {
				height: 44px;
				border-radius: 30px;
				background-image: linear-gradient(135deg, #45BAFD,#0578BB);
				.u-button__text{
					font-size: 18px !important;
				}
			}
		}
		
		.otherLog {
			display: flex;
			justify-content: space-around;
		}
		
		.otherLog>uni-view {
			display: inline-block;
			border-radius: 45px;
			background-color: #32BD44;
		}
		
		/deep/.u-divider {
			margin: 0;
		}
		
		/deep/.u-modal{
			.u-modal__content {
				padding: 0;
			}
			.u-button {
				color: #909399;
				border-color: #EAEBEC;
				border-bottom: 0;
			}
		}
		
		.quickRow {
			display: flex;
			justify-content: space-between;
			color: #0679BC;
			font-size: 14px;
		
			uni-text {
				margin-left: 4px;
			}
		}
		
		.zi {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #909399;
			position: fixed;
			bottom: 10px;
			left: 0;
		}
		
		/deep/.popup-log {
			.u-popup__content {
				text-align: center;
				padding: 28px 18px 30px;
				box-sizing: border-box;
				border-radius: 16px;
				
				uni-image {
					width: 100px;
					margin-bottom: 14px;
					margin-left: auto;
					margin-right: auto;
				}
				.zhiwen-cu{
					max-width: 260px;
					font-size: 16px;
					font-weight: 600;
					letter-spacing: 4px;
				}
				.zhiwen-xi{
					color: #AFAFAF;
					font-weight: 400;
					margin-top: 10px;
					letter-spacing: 4px;
				}
				.uni-icons {
					position: absolute;
					bottom: -51px;
					left: calc(50% - 20px);
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>