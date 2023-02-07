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
				
				<u-form-item label="调出分店:" :labelWidth="75" prop="dcfd" borderBottom>
					<u-input placeholder="请选择调出分店" v-model="uFormModel.dcfd" border="none" disabled disabledColor="#fff">
					</u-input>
				</u-form-item>
				<u-form-item label="收货分店:" :labelWidth="75" prop="shfd" borderBottom>
					<u-input placeholder="请选择收货分店" v-model="uFormModel.shfd" border="none" disabled disabledColor="#fff">
					</u-input>
				</u-form-item>
				<u-form-item label="收货仓库:" :labelWidth="75" prop="shck" borderBottom @tap="openDrawer">
					<u-input placeholder="请选择收货仓库" v-model="uFormModel.shck" border="none" disabled disabledColor="#fff">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="配调类型:" :labelWidth="75" prop="pdlx" borderBottom>
					<u-input placeholder="请选择配调类型" v-model="uFormModel.pdlx" color="pdlxColor" border="none" disabled disabledColor="#fff">
					</u-input>
				</u-form-item>
				<u-form-item label="配调时间:" :labelWidth="75" prop="pdsj" borderBottom>
					<u-input placeholder="请选择配调时间" v-model="uFormModel.pdsj" border="none" disabled disabledColor="#fff">
					</u-input>
				</u-form-item>
				<u-form-item label="被冲单号:" :labelWidth="75" prop="bcdh" borderBottom>
					<u-input placeholder="请选择被冲单号" v-model="uFormModel.bcdh" border="none" disabled disabledColor="#fff">
					</u-input>
				</u-form-item>
				<u-form-item label="收货状态:" :labelWidth="75" prop="shzt" borderBottom>
					<u-input placeholder="请选择收货状态" v-model="uFormModel.shzt" border="none" disabled disabledColor="#fff">
					</u-input>
				</u-form-item>
				
				<u-button type="primary" class="my-primary-button" text="审核" throttleTime="1000" @tap="audit"></u-button>
			</u-form>
			
			<lyy-table class="lyy-table" :headers="thData" :contents="tableDataLazy" :headerFixed="true" :height="tableH" @row-press="rowpress" @onPullup="pullup"></lyy-table>
			<uni-load-more :status="loadTState" v-if="tableDataLazy.length!=0"></uni-load-more>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					<view v-if="ifDrawer=='storage'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange(v.checkstorage_id+'-'+v.checkstorage_name)">
							<text v-html="v.checkstorage_id">{{v.checkstorage_id}}</text>-
							<text v-html="v.checkstorage_name">{{v.checkstorage_name}}</text>
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
					dcfd:"",
					shfd:"",
					shck:"",
					pdlx:"",
					pdsj:"",
					bcdh:"",
					shzt:"",
				},
				uFormRules: {
					"shck": {
						type: "string",
						required: true,
						message: "请选择仓库",
						trigger: ["blur", "change"]
					}
				},
				pdlxColor:"",
				ifDrawer:"",
				list:[],
				
				
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
				let datas= JSON.stringify('DJMXCERTIFY${"vbmtype":"PHQRD","djh":"' + orderid + '"}')
				commonMain(datas).then((res) => {
					console.log("配调单收货 详情。。。 res",res)
					if(res.retflag==0){
						this.searchCk(res.list.rows[0].shfdbh)
						if(res.list.rows[0].djtype){
							if(res.list.rows[0].djtype=="T"){
								this.uFormModel.pdlx="PH-正常单"
								this.pdlxColor="#000"
							}else if(res.list.rows[0].djtype=="C"){
								this.uFormModel.pdlx="PC-冲帐单"
								this.pdlxColor="#ff0000"
							}else if(res.list.rows[0].djtype=="B"){
								this.uFormModel.pdlx="PB-追补单"
								this.pdlxColor="#ff0000"
							}else if(res.list.rows[0].djtype=="K"){
								this.uFormModel.pdlx="PK-退库单"
								this.pdlxColor="#000"
							}
						}
						//注入订单信息
						this.uFormModel.dcfd=res.list.rows[0].chfdbh
						this.uFormModel.shfd=res.list.rows[0].shfdbh
						this.uFormModel.remark=res.list.rows[0].remark
						
						this.uFormModel.pdsj=res.list.rows[0].bzjzrq
						this.uFormModel.bcdh=res.list.rows[0].bcdh
						this.uFormModel.shzt="未收货上账确认"
						for(var i in res.list.columns){
							if(res.list.columns[i].title!="#"){
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
					let djtype = this.uFormModel.pdlx.split("-")[0] == 'ZC' ? 'C' : 'T'
					let userid=uni.getStorageSync("userid")
					let shck=this.uFormModel.shck.split("-")[0]
					let datas= JSON.stringify(
						'PSDBQRSAVECKCERTIFY${"djh":"' +
							this.option.dh + '","shck":"' +
							shck + '","userid":"' +
							userid + '","djtype":"' + djtype + '"}'
					)
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
		}
		
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
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>