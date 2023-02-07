<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">{{option.dh}}</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			
			<u-form ref="uForm" :model="uFormModel" :rules="uFormRules">
				
				<u-form-item label="收货仓库:" :labelWidth="75" prop="shck" borderBottom @tap="openDrawer">
					<u-input placeholder="请选择收货仓库" v-model="uFormModel.shck" border="none" disabled disabledColor="#fff">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="原始单号:" :labelWidth="75" prop="ysdh" borderBottom>
					<u-input placeholder="请输入原始单号" v-model="uFormModel.ysdh" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="税票号码:" :labelWidth="75" prop="sphm" borderBottom>
					<u-input placeholder="请输入税票号码" v-model="uFormModel.sphm" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="备注说明:" :labelWidth="75" prop="remark" borderBottom>
					<u-input placeholder="备注说明" v-model="uFormModel.remark" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="订单时间:" :labelWidth="75" prop="ddsj" borderBottom>
					<u-input v-model="uFormModel.ddsj" disabled disabledColor="#fff" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="订单类型:" :labelWidth="75" prop="ddlx" borderBottom>
					<u-input v-model="uFormModel.ddlx" disabled disabledColor="#fff" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="直配商家:" :labelWidth="75" prop="zpsj" borderBottom>
					<u-input v-model="uFormModel.zpsj" disabled disabledColor="#fff" border="none">
					</u-input>
				</u-form-item>
				<!-- <view class="image-title">
					<view class="sectionTitle text-black">
						<view class="sectionPic"></view>
						<text>上传附件<text class="text-grey"> (选填，最多可上传1张)</text>
						</text>
					</view>
					<view class="text-grey">{{ imgList.length }}/1</view>
				</view>
				<view class="filepicker">
					<mk-upload :sourceType="['camera','album']" :imgList="imgList" @onDelete="onDelete"
						@onChoose="onChoose" :maxChooseCount="1" :maxCount="1" />
				</view> -->
				
				<u-button type="primary" text="审核" throttleTime="1000" @tap="audit"></u-button>
			</u-form>
			
			<lyy-table class="lyy-table" :headers="thData" :contents="tableDataLazy" :headerFixed="true" :height="tableH" @row-press="rowpress" @onPullup="pullup"></lyy-table>
			<uni-load-more :status="loadTState" v-if="tableDataLazy.length!=0"></uni-load-more>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					<view v-if="ifDrawer=='storage'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange(v.ckmc)">
							
							<text v-html="v.ckmc">{{v.ckmc}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='table-row'">
						<view class="list" v-for="(v,i) in list">
							<text>{{i}}:</text>
							<text v-html="v">{{v}}</text>
						</view>
					</view>
					
					<uni-load-more :status="loadState" v-if="ifDrawer!='table-row'"></uni-load-more>
				</scroll-view>
				<view style="text-align: center;" v-else>没有数据</view>
			</uni-drawer>
			
			<u-toast ref="uToast"></u-toast>
			
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import mkupload from '@/components/mk-upload/mk-upload.vue';
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		components: {
			mkupload
		},
		data() {
			return {
				option:"",
				uFormModel:{
					shck:"",
					ysdh:"",
					sphm:"",
					remark:"",
					ddsj:"",
					ddlx:"",
					zpsj:""
				},
				uFormRules: {
					"shck": {
						type: "string",
						required: true,
						message: "请选择仓库",
						trigger: ["blur", "change"]
					},
					"ysdh": {
						type: "string",
						required: true,
						message: "请输入原始单号",
						trigger: ["blur", "change"]
					},
					"sphm": {
						type: "string",
						required: true,
						message: "请输入税票号码",
						trigger: ["blur", "change"]
					}
				},
				ifDrawer:"",
				list:[],
				// imgList: [],
				
				tableH: "0",
				thData:[],
				tableData:[],
				tableDataLazy:[],
				loadTState: "more",
				tableTotal: 10,
				tableSize: 20,
				//.......................
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
				loadState: "more",
				pageSize: 20,
				pageTotal: 20,
				listLazy:[]
			}
		},
		onLoad(option) {
			this.option=option
			this.orderInfo(option.dh)
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			uni.getSystemInfo({
				success: function(res) {
					this.tableH= res.screenHeight-500+"px"
				}.bind(this)
			});
		},
		onShow() {
			
		},
		methods: {
			orderInfo(orderid) {
				let datas= JSON.stringify('DJMXCERTIFY${"vbmtype":"ZPQRD","djh":"' + orderid + '"}')
				commonMain(datas).then((res) => {
					console.log("直配单收货 详情。。。 res",res)
					if(res.retflag==0){
						this.searchCk(res.list.rows[0].shfdbh)
						
						this.uFormModel.ddsj=res.list.rows[0].zprq
						this.uFormModel.zpsj=res.list.rows[0].sjbh
						this.uFormModel.remark=res.list.rows[0].remark
						if(res.list.rows[0].djtype=="C"){
							this.uFormModel.ddlx="ZC-冲帐单"
						}else{
							this.uFormModel.ddlx="ZP-正常单"
						}
						for(var i in res.list.columns){
							if( res.list.columns[i].title!="#"){
								this.thData.push({
									"label": res.list.columns[i].title,
									"key": res.list.columns[i].field,
									"width": res.list.columns[i].width
								})
							}
							
						}
						this.tableData=res.list.rows
						this.tableLoadFunc()
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: res.retmsg
						})
					}
					
				}).catch((err) => {
					console.log(err)
				})
			},
			// 懒加载
			scrollToLower(event){
				if (this.loadState == "noMore") {
					
				} else {
					setTimeout(() => {
						this.loadState = "loading"
					}, 200)
					setTimeout(() => {
						this.loadFunc()
					}, 1000)
				}
			},
			loadFunc() {
				if (this.pageTotal < this.list.length) {
					this.pageTotal += this.pageSize
					this.listLazy = this.list.slice(0, this.pageTotal)
					if(this.listLazy.length < this.list.length){
						this.loadState = "more"
					}else{
						this.loadState = "noMore"
					}
				} else {
					this.listLazy = this.list
					this.loadState = "noMore"
				}
			},
			tableLoadFunc() {
				if (this.tableTotal < this.tableData.length) {
					this.tableTotal += this.tableSize
					this.tableDataLazy = this.tableData.slice(0, this.tableTotal)
					if(this.tableDataLazy.length < this.tableData.length){
						this.loadTState = "more"
					}else{
						this.loadTState = "noMore"
					}
				} else {
					this.tableDataLazy = this.tableData
					this.loadTState = "noMore"
				}
			},
			dateChange(event){
				this.uFormModel.range=event
			},
			// 搜索仓库
			searchCk(shfd){
				this.ifDrawer = "storage"
				this.pageTotal = this.pageSize
				let datas= JSON.stringify('SHCKCERTIFY${' + shfd + '}')
				commonMain(datas).then((res) => {
					// console.log("搜索仓库 res",res)
					if(res.retflag==0){
						this.list = res.list
						this.loadFunc()
						this.uFormModel.shck=res.list[0].ckmc
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			openDrawer(){
				this.$refs.drawer.open();
			},
			radioChange(event){
				this.uFormModel.shck=event
				this.$refs.drawer.close();
			},
			audit(){
				this.$refs.uForm.validate().then(res => {
					let djtype = this.uFormModel.ddlx.split("-")[0] == "ZC" ? "C" : "T"
					let userid=uni.getStorageSync("userid")
					let shck=this.uFormModel.shck.split(".")[0]
					let datas= JSON.stringify('ZPDRQCKCERTIFY${"djh":"' + this.option.dh +
						'","vtype":"' + djtype + '","userid":"' + userid + '","shck":"' +
						shck + '","sphm":"' + this.uFormModel.sphm + '","ysdh":"' + this.uFormModel.ysdh + '"}')
					console.log("审核详情 datas",datas)
					commonMain(datas).then((res) => {
						console.log("审核详情 res",res)
						if(res.retflag==0){
							this.$refs.uToast.show({
								type:"success",
								message: "审核单据成功"
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								})
							},1800)
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: res.retmsg
							})
						}
						
					}).catch((err) => {
						console.log(err)
					})
				})
				
			},
			pullup(){
				if (this.loadTState == "noMore") {
				
				} else {
					setTimeout(() => {
						this.loadTState = "loading"
					}, 200)
					
					setTimeout(() => {
						this.tableLoadFunc()
					}, 1000)
				}
			},
			
			// 长按单据
			rowpress(item,index) {
				this.ifDrawer="table-row"
				this.list = {}
				for(var i in this.thData){
					for(var j in this.tableData[index]){
						if(this.thData[i].key==j){
							this.$set(this.list, this.thData[i].label, this.tableData[index][j])
						}
					}
				}
				this.$refs.drawer.open();
			},
			toDownload(){
				uni.showModal({
					content: "下载离线数据才能继续操作，现在下载吗？",
					confirmText: "下载",
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: `/pages/function/component/download/download`
							})
						} else if (res.cancel) {
			
						}
					}
				});
			},
			// 
			// onDelete(index) {
			// 	this.imgList.splice(index, 1);
			// },
			// onChoose(e) {
			// 	var tempFilePaths = e.tempFilePaths;
			// 	tempFilePaths.forEach((v, i, arr) => {
			// 		this.imgList.push(v);
			// 	})
			// },
			
			
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
			
			/deep/.u-form{
				.u-button{
					margin-top: 10px;
					margin-bottom: 10px;
				}
			}
			
			/deep/.uni-drawer {
				.uni-scroll-view-content {
					box-sizing: border-box;
					padding: 10px 0;
			
					.list{
						padding:8px;
						border-bottom: 1px solid #EAEBEC;
					}
					.list:nth-child(even){
						background-color: #FAFAFA;
					}
					.list>uni-text:last-child{
						word-break: break-all;
					}
				}
			}
			
			/deep/.u-popup {
				.u-radio {
					margin-bottom: 14px;
				}
			}
			// 上传图片
			.mk-upload {
				padding-bottom: 0;
			}
			
			.image-title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				color: #606266;
			
			}
			
			.filepicker {
				margin-bottom: 28rpx;
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>