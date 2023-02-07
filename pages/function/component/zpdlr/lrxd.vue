<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">{{option.dh}}/{{option.title}}</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-form ref="uForm" :model="uFormModel" :rules="uFormRules">
				
				<u-form-item label="供货商家:" :labelWidth="90" prop="detail_sj" borderBottom>
					<u-input placeholder="供货商家" v-model="uFormModel.detail_sj" border="none" :disabled="option.orderType=='edit'" @change="sjChange">
					</u-input>
				</u-form-item>
				<u-form-item label="分店:" :labelWidth="90" prop="detail_fd" borderBottom @tap="searchFd">
					<u-input placeholder="请选择分店" v-model="uFormModel.detail_fd" disabled :disabledColor="option.orderType=='add'?'#fff':'#F5F7FA'" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="订货人员:" :labelWidth="90" prop="detail_ry" borderBottom @tap="searchRy">
					<u-input placeholder="请选择订货人员" v-model="uFormModel.detail_ry" disabled :disabledColor="option.orderType=='add'?'#fff':'#F5F7FA'" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="到货日期:" :labelWidth="90" prop="detail_ddrq" borderBottom>
					<uni-datetime-picker type="date" :border="false" ref="datetimePicker" :start="startDate" :end="endDate" v-model="uFormModel.detail_ddrq" :disabled="option.orderType=='edit'" @change="datetimeChange"/>
				</u-form-item>
				
				<u-form-item label="备注说明:" :labelWidth="90" prop="detail_remark" borderBottom>
					<u-input placeholder="备注说明" v-model="uFormModel.detail_remark" border="none" :disabled="option.orderType=='edit'">
					</u-input>
				</u-form-item>
				
				<view class="btns" v-if="option.orderType=='add'||option.title=='未审核'">
					<u-button type="primary" text="添加商品" throttleTime="1000" @tap="addGoods"></u-button>
					<u-button type="primary" text="审核" throttleTime="1000" @tap="auditOrder"></u-button>
					<u-button type="primary" text="删单" throttleTime="1000" @tap="delOrder"></u-button>
				</view>
				
			</u-form>
			
			<lyy-table class="lyy-table" :headers="thData" :height="tableH" :contents="tableData" :headerFixed="true" @row-press="rowpress" @rowClick="rowClick"></lyy-table>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					 <!--  -->
					<view v-if="ifDrawer=='Supply'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange1(v.supply_id+'-'+v.supply_name)">
							<text v-html="v.supply_id">{{v.supply_id}}</text>-
							<text v-html="v.supply_name">{{v.supply_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='fendian'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange2(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='detail_ry'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange3(v.userid+'-'+v.username)">
							<text v-html="v.userid">{{v.userid}}</text>-
							<text v-html="v.username">{{v.username}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='table-row'">
						<view class="list" v-for="(v,i) in list">
							<text>{{i}}:</text>
							<text v-html="v">{{v}}</text>
						</view>
					</view>
					
					
					<uni-load-more :status="loadState"></uni-load-more>
				</scroll-view>
				<view style="text-align: center;" v-else>没有数据</view>
			</uni-drawer>
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				option: "",
				startDate: "2020-01-01",
				endDate: "2025-12-31",
				uFormModel:{
					detail_sj: "",
					detail_fd: uni.getStorageSync("fdbh"),
					detail_ry: uni.getStorageSync("userid"),
					detail_ddrq: "",
					detail_remark: ""
				},
				uFormRules: {
					"detail_sj": {
						type: "string",
						required: true,
						message: "请选择商家",
						trigger: ["blur", "change"]
					},
					"detail_fd": {
						type: "string",
						required: true,
						message: "请选择分店",
						trigger: ["blur", "change"]
					},
					"detail_ry": {
						type: "string",
						required: true,
						message: "请选择人员",
						trigger: ["blur", "change"]
					},
					"detail_ddrq": {
						type: "string",
						required: true,
						message: "请选择到货日期",
						trigger: ["blur", "change"]
					}
				},
				tableH:"0",
				ifDrawer:"",
				list:[],
				thData:[],
				tableData:[],
				//.......................
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
				loadState: "more",
				pageSize: 10,
				pageTotal: 20,
				listLazy:[]
				
			}
		},
		onLoad: function(option) {
			this.option=option
			console.log("录入新单 option",option)
			this.orderInfo(option.dh)
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			uni.getSystemInfo({
				success: function(res) {
					let removeH=0
					if(this.option.orderType=='add'){
						removeH=375
					}else{
						removeH=335
					}
					this.tableH= res.screenHeight-removeH+"px"
				}.bind(this)
			});
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			orderInfo(orderid){
				let fdbh=uni.getStorageSync("fdbh")
				let datas= JSON.stringify('DJMXCERTIFY${"vbmtype":"ZPDBH","djh":"' + orderid + '","showdel":"true","fdbh":"' + fdbh + '"}')
				console.log("orderInfo 新单 datas",datas)
				commonMain(datas).then((res) => {
					console.log("orderInfo 新单 res",res)
					if(res.list.rows.length>0){
						this.uFormModel.detail_sj=res.list.rows[0].sjbh
						this.uFormModel.detail_fd=res.list.rows[0].fdbh
						this.uFormModel.detail_ry=res.list.rows[0].userid
						this.uFormModel.detail_ddrq=res.list.rows[0].zprq.split(" ")[0]
						this.uFormModel.detail_remark=res.list.rows[0].remark
						
					}else{
						
					}
					this.thData=[]
					for(var i in res.list.columns){
						if(res.list.columns[i].field){
							this.thData.push({
								"label": res.list.columns[i].title,
								"key": res.list.columns[i].field,
								"width": res.list.columns[i].width
							})
						}
					}
					this.tableData=res.list.rows
				}).catch((err) => {
					console.log(err)
				})
			},
			// 新增商品
			addGoods(){
				if (this.option.title == '已审核'){
					this.$refs.uToast.show({
						type:"error",
						message: "该单据已审核，无法添加商品"
					})
					return
				}
				this.$refs.uForm.validate().then(res => {
					uni.navigateTo({
						url: `/pages/function/component/zpdlr/goods?orderType=add&detail_sj=${this.uFormModel.detail_sj}&detail_fd=${this.uFormModel.detail_fd}&detail_ry=${this.uFormModel.detail_ry}&dh=${this.option.dh}&detail_ddrq=${this.uFormModel.detail_ddrq}&detail_remark=${this.uFormModel.detail_remark}`
					})
				})
			},
			// 审核商品
			auditOrder(){
				if (this.option.title == '已审核'){
					this.$refs.uToast.show({
						type:"error",
						message: "该单据已审核，无法继续审核"
					})
					return
				}
				uni.showModal({
					content: "审核后无法恢复，是否确定审核？",
					success: function(res) {
						if (res.confirm) {
							this.orderCheck("audit")
						} else if (res.cancel) {
							
						}
					}.bind(this)
				});
			},
			// 删除商品
			delOrder(){
				if (this.option.title == '已审核'){
					this.$refs.uToast.show({
						type:"error",
						message: "该单据已审核，无法删单"
					})
					return
				}
				uni.showModal({
					content: "删除后无法恢复，是否确定删除？",
					success: function(res) {
						if (res.confirm) {
							this.orderCheck("del")
						} else if (res.cancel) {
							
						}
					}.bind(this)
				});
			},
			// 审核和删除使用的
			orderCheck(type){
				let dataes={}
				let userid=uni.getStorageSync("userid")
				let fdbh=uni.getStorageSync("fdbh")
				if(type=="audit"){
					dataes= JSON.stringify(
						'ZPDJCHECKCERTIFY${"djh":"' +
							this.option.dh +
							'","fdbh":"' +
							this.uFormModel.detail_fd +
							'","userid":"' +
							userid +
							'","username":"' +
							userid +
							'","remark":"","fdbh":"' +
							fdbh + '"}'
					)
				}else{
					dataes= JSON.stringify(
						'DELDJCERTIFY${"vbmtype":"ZPDBH","djh":"' + this.option.dh  + '","userid":"' + userid + '","username":"' + userid + '"}'
					)
				}
				console.log("lrxd "+type+" dataes",dataes)
				commonMain(dataes).then((res) => {
					console.log("lrxd "+type+" res",res)
					if(res.retflag==0){
						if(type=="audit"){
							this.$refs.uToast.show({
								type:"success",
								message: "单据审核成功"
							})
						}else{
							this.$refs.uToast.show({
								type:"success",
								message: "删除单据成功"
							})
						}
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
			
			// 搜索商家
			sjChange(val){
				setTimeout(() => {
					if (val != "") {
						if (val == this.uFormModel.detail_sj) {
							this.searchSj(val)
							uni.hideKeyboard()
						}
					}
				}, 2000)
			},
			searchSj(val){
				if(this.option.orderType=='add'){
					this.ifDrawer = "Supply"
					this.pageTotal = this.pageSize
					plus.sqlite.selectSql({
						name: 'downloadDb',
						sql: 'select * from supplier',
						success: function(res) {
							// console.log("Supply res",res)
							this.list = []
							for (var i in res) {
								if (res[i].supply_id.indexOf(val) > -1) {
									res[i].supply_id=res[i].supply_id.replace(val,this.fontStart + val + this.fontEnd)
									this.list.push(res[i])
								}else if (res[i].supply_name.indexOf(val) > -1) {
									res[i].supply_name=res[i].supply_name.replace(val,this.fontStart + val + this.fontEnd)
									this.list.push(res[i])
								}
							}
							this.loadFunc()
							this.$refs.drawer.open();
						}.bind(this),
						fail: function(e) {
							this.toDownload()
							console.log('查询SQL语句失败: ');
						}.bind(this)
					});
				}
			},
			searchFd(){
				if(this.option.orderType=='add'){
					this.ifDrawer = "fendian"
					this.pageTotal = this.pageSize
					plus.sqlite.selectSql({
						name: 'downloadDb',
						sql: 'select * from shop',
						success: function(res) {
							this.list = res
							this.loadFunc()
							this.$refs.drawer.open();
						}.bind(this),
						fail: function(e) {
							this.toDownload()
							console.log('查询SQL语句失败: ');
						}.bind(this)
					});
				}
			},
			searchRy(){
				if(this.option.orderType=='add'){
					this.ifDrawer="detail_ry"
					this.pageTotal = this.pageSize
					let datas=JSON.stringify('CGYCERTIFY${"userid":""}')
					commonMain(datas).then((res) => {
						// console.log("searchRy res",res)
						if(res.retflag==0){
							this.list=res.list
							this.loadFunc()
							this.$refs.drawer.open();
						}else{
							
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			radioChange1(event){
				let str=this.removeFont(event)
				this.uFormModel.detail_sj=str
				this.$refs.drawer.close();
			},
			radioChange2(event){
				this.uFormModel.detail_fd=event
				this.$refs.drawer.close();
			},
			radioChange3(event){
				this.uFormModel.detail_ry=event
				this.$refs.drawer.close();
			},
			datetimeChange(event) {
				this.uFormModel.detail_ddrq=event
			},
			// 编辑商品
			rowClick(event){
				console.log("rowClick2222 event",event)
				if(event.ztbz!="T"){
					this.$refs.uToast.show({
						type:"error",
						message: "该单据已审核，无法修改商品"
					})
				}else{
					let ztrq=event.ztrq.split(" ")[0]
					uni.navigateTo({
						url: `/pages/function/component/zpdlr/goods?orderType=${this.option.orderType}&dh=${this.option.dh}&guid=${event.guid}&zpdbh=${event.zpdbh}&spbm=${event.spbm}&remark=${event.remark}&dhrbh=${event.dhrbh}&detail_sj=${event.sjbh}&nsjg=${event.nsjg}&sl=${event.sl}&splx=${event.splx}&spsmm=${event.spsmm}&cxjbz=${event.cxjbz}&ztrq=${ztrq}&bzjzrq=${event.bzjzrq}&spremark=${event.spremark}&ydhrq=${event.ydhrq}&spmc=${event.spmc}&phsl=${event.phsl}&hsjj=${event.hsjj}&jjje=${event.jjje}&zprq=${event.zprq}&detail_fd=${event.fdbh}`
					})
				}
			},
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
			removeFont(item){
				let value;
				value=item.replace(this.fontStart,"")
				value=value.replace(this.fontEnd,"")
				return value
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
			
			.btns{
				display: flex;
				justify-content: space-around;
				margin: 10px 0;
				
				/deep/.u-button{
					width: 75px;
					margin: 0;
				}
			}
			
			/deep/.uni-date{
				width: 100%;
				.uni-date__x-input{
					height: 20px;
				}
				.uni-date-editor--x .uni-date__icon-clear{
					border: 2px solid transparent;
				}
				.uni-date-editor--x__disabled>.uni-date-x{
					background-color: #F5F7FA;
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
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>