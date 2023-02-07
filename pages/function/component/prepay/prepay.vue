<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">商家预付款</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-tabs :list="tabsList" @click="click"></u-tabs>
			
			<view class="contents">
				<uni-collapse v-model="collapseVal" v-show="collapseShow">
					<uni-collapse-item title-border="show">
						<template v-slot:title>
							<view class="uni-collapse-item__title-box">
								<uni-icons custom-prefix="iconfont" type="icon-tubiao-bingtu"></uni-icons>
								<text style="padding-left: 10px;">按条件查询全部单据</text>
							</view>
						</template>
						<view class="">
							<u-form labelPosition="left" ref="serchForm" :model="serchModel">
								<u-form-item prop="text" borderBottom>
									<u-input placeholder="搜索供应商(可选)" prefixIcon="search" v-model="serchModel.text" border="none" confirm-type="search"
										@confirm="searchId">
									</u-input>
									<uni-icons type="right" size="16" @tap="searchId"></uni-icons>
								</u-form-item>
								<u-form-item prop="paydate" borderBottom>
									<uni-datetime-picker type="daterange" v-model="serchModel.dateRange" :clear-icon="true" @change="dateChange"/>
								</u-form-item>
								
								<view class="btns">
									<u-button type="primary" :plain="true" text="清空" throttleTime="1000" @tap="clear"></u-button>
									<u-button type="primary" :plain="false" text="搜索" throttleTime="1000" @tap="clickFunc"></u-button>
								</view>
							</u-form>
						</view>
					</uni-collapse-item>
				</uni-collapse>
				<!-- 申请 -->
				<view v-if="clickIndex==0">
					<u-button type="primary" class="my-primary-button" text="新增申请单" throttleTime="1000" style="margin-bottom:10px;" v-show="addBtnShow" @tap="goDetail('add','selfselall','')">
						<uni-icons type="plusempty" size="20" color="#fff"></uni-icons>新增申请单
					</u-button>
					<view class="bhorder" v-for="(v,i) in data">
						<view class="orders">
							<text>供应商编号:</text>
							<text>{{v.supplierid}}</text>
						</view>
						<view class="orders">
							<text>供应商名称:</text>
							<text>{{v.suppliername}}</text>
						</view>
						<view class="orders">
							<text>申请金额:</text>
							<text>{{v.applicationmoney}}</text>
						</view>
						<view class="orders">
							<text>申请日期:</text>
							<text>{{v.applicationdate}}</text>
						</view>
						<view class="orders">
							<text>申请状态:</text>
							<text style="color:#FF8112;display:inline-block;">
								<text v-if="v.prepaystatus=='T'">待审核</text>
								<text v-else-if="v.prepaystatus=='R'">待付款</text>
								<text v-else-if="v.prepaystatus=='B'">审核未通过</text>
								<text v-else-if="v.prepaystatus=='P'">待复核</text>
								<text v-else-if="v.prepaystatus=='S'">已完成</text>
								<text v-else-if="v.prepaystatus=='C'">复核未通过</text>
								<text v-else-if="v.prepaystatus=='F'">撤销作废</text>
								<text v-else>{{v.prepaystatus}}</text>
							</text>
						</view>
						<view class="btns">
							<u-button type="warning" :plain="true" text="撤销" throttleTime="1000"
								v-if="v.prepaystatus=='T'||v.prepaystatus=='B'" @tap="revoke(v.prepayid)"></u-button>
							<u-button type="primary" text="查看" throttleTime="1000"
								@tap="goDetail(v.prepayid,'selfselall',v.prepaystatus)"></u-button>
						</view>
					</view>
				</view>
				<!-- 审核 -->
				<view v-else-if="clickIndex==1">
					<view class="bhorder" v-for="(v,i) in data">
						<view class="orders">
							<text>申请人:</text>
							<text>{{v.applicantid}}-{{v.applicant}}</text>
						</view>
						<view class="orders">
							<text>供应商:</text>
							<text>{{v.supplierid}}-{{v.suppliername}}</text>
						</view>
						<view class="orders">
							<text>申请金额:</text>
							<text>{{v.applicationmoney}}</text>
						</view>
						<view class="orders">
							<text>申请日期:</text>
							<text>{{v.applicationdate}}</text>
						</view>
						<view class="orders">
							<text>申请状态:</text>
							<text style="color:#FF8112;display:inline-block;">
								<text v-if="v.prepaystatus=='T'">待审核</text>
								<text v-else-if="v.prepaystatus=='R'">待付款</text>
								<text v-else-if="v.prepaystatus=='B'">审核未通过</text>
								<text v-else-if="v.prepaystatus=='P'">待复核</text>
								<text v-else-if="v.prepaystatus=='S'">已完成</text>
								<text v-else-if="v.prepaystatus=='C'">复核未通过</text>
								<text v-else-if="v.prepaystatus=='F'">撤销作废</text>
								<text v-else>{{v.prepaystatus}}</text>
								&lt;<text v-if="v.deallevel==1">一般</text>
								<text v-else-if="v.deallevel==2">较急</text>
								<text v-else-if="v.deallevel==3">加急</text>&gt;
							</text>
						</view>
						<view class="btns">
							<u-button type="primary" :plain="v.prepaystatus=='T'?true:false" :text="v.prepaystatus=='T'?'审核':'查看'" throttleTime="1000" @tap="goDetail(v.prepayid,'reviewselall',v.prepaystatus)"></u-button>
							
						</view> 
					</view>
				</view>
				<!-- 付款 -->
				<view v-else-if="clickIndex==2">
					<view class="bhorder" v-for="(v,i) in data">
						<view class="orders">
							<text>申请人:</text>
							<text>{{v.applicantid}}-{{v.applicant}}</text>
						</view>
						<view class="orders">
							<text>供应商:</text>
							<text>{{v.supplierid}}-{{v.suppliername}}</text>
						</view>
						<view class="orders">
							<text>申请金额:</text>
							<text>{{v.applicationmoney}}</text>
						</view>
						<view class="orders">
							<text>转款备注:</text>
							<text v-if="v.supplieraccounttype==1">对私</text>
							<text v-else-if="v.supplieraccounttype==2">对公</text>
							<text v-if="v.suppliermark">（{{v.suppliermark}}）</text>
						</view>
						<view class="orders">
							<text>审核人:</text>
							<text>{{v.reviewerid}}-{{v.reviewer}}</text>
						</view>
						<view class="orders">
							<text>审核日期:</text>
							<text>{{v.reviewdate}}</text>
						</view>
						<view class="orders">
							<text>申请状态:</text>
							<text style="color:#FF8112;display:inline-block;">
								<text v-if="v.prepaystatus=='T'">待审核</text>
								<text v-else-if="v.prepaystatus=='R'">待付款</text>
								<text v-else-if="v.prepaystatus=='B'">审核未通过</text>
								<text v-else-if="v.prepaystatus=='P'">待复核</text>
								<text v-else-if="v.prepaystatus=='S'">已完成</text>
								<text v-else-if="v.prepaystatus=='C'">复核未通过</text>
								<text v-else-if="v.prepaystatus=='F'">撤销作废</text>
								<text v-else>{{v.prepaystatus}}</text>
								&lt;<text v-if="v.deallevel==1">一般</text>
								<text v-else-if="v.deallevel==2">较急</text>
								<text v-else-if="v.deallevel==3">加急</text>&gt;
							</text>
						</view>
						<view class="btns">
							<u-button type="primary" :plain="v.prepaystatus=='R'?true:false" :text="v.prepaystatus=='R'?'付款':'查看'" throttleTime="1000" @tap="goDetail(v.prepayid,'payselall',v.prepaystatus)"></u-button>
						</view>
					</view>
				</view>
				<!-- 复核 -->
				<view v-else-if="clickIndex==3">
					<view class="bhorder" v-for="(v,i) in data">
						<view class="orders">
							<text>申请人:</text>
							<text>{{v.applicantid}}-{{v.applicant}}</text>
						</view>
						<view class="orders">
							<text>供应商:</text>
							<text>{{v.supplierid}}-{{v.suppliername}}</text>
						</view>
						<view class="orders">
							<text>申请金额:</text>
							<text>{{v.applicationmoney}}</text>
						</view>
						<view class="orders">
							<text>实付金额:</text>
							<text>{{v.paymoney}}</text>
						</view>
						<view class="orders">
							<text>审核人:</text>
							<text>{{v.reviewerid}}-{{v.reviewer}}</text>
						</view>
						<view class="orders">
							<text>付款人:</text>
							<text>{{v.paycashierid}}-{{v.paycashier}}</text>
						</view>
						<view class="orders">
							<text>付款日期:</text>
							<text>{{v.paydate}}</text>
						</view>
						<view class="orders">
							<text>申请状态:</text>
							<text style="color:#FF8112;display:inline-block;">
								<text v-if="v.prepaystatus=='T'">待审核</text>
								<text v-else-if="v.prepaystatus=='R'">待付款</text>
								<text v-else-if="v.prepaystatus=='B'">审核未通过</text>
								<text v-else-if="v.prepaystatus=='P'">待复核</text>
								<text v-else-if="v.prepaystatus=='S'">已完成</text>
								<text v-else-if="v.prepaystatus=='C'">复核未通过</text>
								<text v-else-if="v.prepaystatus=='F'">撤销作废</text>
								<text v-else>{{v.prepaystatus}}</text>
								&lt;<text v-if="v.deallevel==1">一般</text>
								<text v-else-if="v.deallevel==2">较急</text>
								<text v-else-if="v.deallevel==3">加急</text>&gt;
							</text>
						</view>
						<view class="btns">
							<u-button type="primary" :plain="v.prepaystatus=='P'?true:false" :text="v.prepaystatus=='P'?'复核':'查看'" throttleTime="1000" @tap="goDetail(v.prepayid,'checkselall',v.prepaystatus)"></u-button>
						</view>
					</view>
				</view>
			</view>
			
			<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupclose">
				<scroll-view style="max-height: 70vh;" scroll-y="true">
					<u-radio-group placement="column" @change="serchChange" v-if="serchData.length!=0">
						<u-radio shape="square" v-for="(v, i) in serchData" :key="v.supplierid" :name="v.supplierid"
							:label="v.supplierid+'-'+v.suppliername">
						</u-radio>
					</u-radio-group>
				</scroll-view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>
		
		</view>
	</view>
</template>

<script>
	import {
		businessprepay
	} from "@/network/api.js";
	export default {
		data() {
			return {
				collapseVal:[],
				collapseShow: false,
				addBtnShow: false,
				tabsList: [
					{
						name: '申请',
					},
					{
						name: '审核',
					},
					{
						name: '付款'
					},
					{
						name: '复核'
					},
				],
				clickIndex: 0,
				userid: uni.getStorageSync("userid"),
				data: [],
				//....................
				serchModel:{
					text: "",
					dateRange: []
				},
				popupShow: false,
				serchData:[]
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.clickFunc()
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			click(item) {
				this.clickIndex = item.index
				this.clickFunc()
			},
			clickFunc(){
				if (this.clickIndex == 0) {
					this.getprepayinfo("selfselall", this.userid, this.serchModel.text, this.serchModel.dateRange)
				} else if (this.clickIndex == 1) {
					this.getprepayinfo("reviewselall", this.serchModel.text, this.serchModel.dateRange, "")
				} else if (this.clickIndex == 2) {
					this.getprepayinfo("payselall", this.serchModel.text, this.serchModel.dateRange, "")
				} else if (this.clickIndex == 3) {
					this.getprepayinfo("checkselall", this.serchModel.text, this.serchModel.dateRange, "")
				}
			},
			searchId(){
				let datas={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "supplier",
					"item1": this.serchModel.text
				}
				// console.log("搜索供应商编号 datas",datas)
				businessprepay(datas).then(res => {
					// console.log("搜索供应商编号 res",res)
					if(res[0].result=="success"){
						this.popupShow=true
						this.serchData=res
					}else{
						this.$refs.uToast.show({
							type: "error",
							message: res[0].message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
				
			},
			getprepayinfo(vtype, item1, item2, item3) {
				let myAuth=uni.getStorageSync('myAuth')
				let datas = {}
				// console.log("权限 myAuth",myAuth)
				if(vtype=="selfselall"){
					// if (myAuth.indexOf("999947") <= -1) {
					// 	this.$refs.uToast.show({
					// 		type: "error",
					// 		message: "未获得预付款单据申请权限！联系管理员授权！"
					// 	})
					// 	this.collapseShow=false
					// 	this.addBtnShow=false
					// 	// console.log("myAuth 11111111111111111111111111")
					// 	return;
					// } else {
						this.collapseShow=true
						this.addBtnShow=true
					// }
					datas = {
						"access_token": uni.getStorageSync("access_token"),
						"vtype": vtype,
						"item1": item1,
						"item2": item2,
						"item3": item3.length==0?"":item3[0],
						"item4": item3.length==0?"":item3[1]
					}
				}else if(vtype=="reviewselall"){
					// if (myAuth.indexOf("999948") <= -1) {
					// 	this.$refs.uToast.show({
					// 		type: "error",
					// 		message: "未获得预付款单据审核权限！联系管理员授权！"
					// 	})
					// 	this.collapseShow=false
					// 	return;
					// }else{
						this.collapseShow=true
					// }
					datas = {
						"access_token": uni.getStorageSync("access_token"),
						"vtype": vtype,
						"item1": item1,
						"item2": item2.length==0?"":item2[0],
						"item3": item2.length==0?"":item2[1],
						"item4": ""
					}
				}else if(vtype=="payselall"){
					// if (myAuth.indexOf("999949") <= -1) {
					// 	this.$refs.uToast.show({
					// 		type: "error",
					// 		message: "未获得预付款单据付款权限！联系管理员授权！"
					// 	})
					// 	this.collapseShow=false
					// 	return;
					// }else{
						this.collapseShow=true
					// }
					datas = {
						"access_token": uni.getStorageSync("access_token"),
						"vtype": vtype,
						"item1": item1,
						"item2": item2.length==0?"":item2[0],
						"item3": item2.length==0?"":item2[1],
						"item4": ""
					}
				}else if(vtype=="checkselall"){
					// if (myAuth.indexOf("999951") <= -1) {
					// 	this.$refs.uToast.show({
					// 		type: "error",
					// 		message: "未获得预付款单据复核权限！联系管理员授权！"
					// 	})
					// 	this.collapseShow=false
					// 	return;
					// }else{
						this.collapseShow=true
					// }
					datas = {
						"access_token": uni.getStorageSync("access_token"),
						"vtype": vtype,
						"item1": item1,
						"item2": item2.length==0?"":item2[0],
						"item3": item2.length==0?"":item2[1],
						"item4": ""
					}
				}
				 
				console.log(vtype+"预付款 datas", datas)
				businessprepay(datas).then(res => {
					this.data = []
					console.log(vtype+"预付款 res", res)
					if (res[0].result == "success") {
						this.data = res
						for (var i in this.data) {
							this.data[i].applicationmoney = Number(this.data[i].applicationmoney).toFixed(2)
							if(vtype=="checkselall"){
								this.data[i].paymoney = Number(this.data[i].paymoney).toFixed(2)
							}
						}
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: res[0].message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 撤销
			revoke(prepayid) {
				uni.showModal({
					content: "确认撤销当前申请吗?",
					confirmText: "撤销",
					success: (resvoke)=> {
						if (resvoke.confirm) {
							this.billRevoke(prepayid);
						} else if (resvoke.cancel) {

						}
					}
				});
			},
			goDetail(pid, type, prepaystatus) {
				uni.navigateTo({
					url: `/pages/function/component/prepay/detail?pid=${pid}&type=${type}&prepaystatus=${prepaystatus}`
				})
			},
			billRevoke(prepayid) {
				let datas = {
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "selfcancel",
					"item1": prepayid,
					"item2": this.userid
				}
				businessprepay(datas).then(res => {
					console.log("撤销 res", res)
					if (res[0].result == "success") {
						this.$refs.uToast.show({
							type: "success",
							message: res[0].message
						})
						this.getprepayinfo("selfselall", this.userid, "", "")
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			//...............................
			serchChange(e){
				this.serchModel.text=e
				this.popupShow=false
			},
			dateChange(event){
				this.serchModel.dateRange=event
				// console.log("this.serchModel.dateRange",this.serchModel.dateRange)
			},
			clear(){
				this.serchModel.text=""
				this.serchModel.dateRange=""
			},
			popupclose(){
				this.popupShow=false
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
			padding-top: calc(var(--status-bar-height) + 44px);
			padding-left: 0;
			padding-right: 0;
			padding-bottom: 10px;
		}
		
		.contents {
			padding: 44px 10px 0;
			/deep/.u-form{
				padding: 0 20px 10px;
				box-sizing: border-box;
				.btns {
					margin-top: 8px;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
				
					.u-button {
						width: 20%;
						height: 32px;
						margin: 0;
					}
				}
			}
		}
		//..........................................
		/deep/.uni-collapse{
			margin:8px 0;
			.uni-collapse-item__title-box {
				height: 44px;
				line-height: 44px;
				padding: 0 10px;
			}
			.uni-collapse-item .uni-icons{
				color: #323232 !important;
			}
			.uni-collapse-item__wrap {
				width: 100%;
			
				.uni-collapse-item__wrap-content {
					width: 100%;
			
					.uni-card {
						box-sizing: border-box;
					}
				}
			}
			.uni-collapse-item__wrap-content>* {
				width: 100%;
			}
		}
		
		
		/deep/.u-tabs {
			position: fixed;
			width: 100%;
			top:  calc(var(--status-bar-height) + 44px);
			left: 0;
			z-index: 100;
			background-color: #fff;
		
			.u-tabs__wrapper__nav {
				margin-left: calc(50% - 104px);
			}
		}
		
		.btns {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
		
			/deep/.u-button {
				width: 28%;
				margin: 0;
			}
		}
		
		.bhorder {
			padding: 10px;
			background-color: #fff;
			margin-bottom: 10px;
			border: 1px solid #dddddd;
			border-radius: 4px;
		
			.orders>uni-text:first-child {
				display: inline-block;
				width: 100px;
				text-align-last: justify;
				margin-right: 10px;
			}
		}
		
		.bhorder>uni-view {
			margin-top: 10px;
		}
		
		/deep/.u-popup{
			max-height: 60vh;
			.u-popup__content {
				padding: 15px 10px 20px;
			}
			.uni-scroll-view-content {
				box-sizing: border-box;
				.u-radio {
					margin-top: 14px;
			
					.u-radio__text {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>