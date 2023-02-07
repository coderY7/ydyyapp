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
				
				<u-form-item label="调出分店:" :labelWidth="90" prop="detail_dcfd" borderBottom @tap="searchFd('dcfd')">
					<u-input placeholder="调出分店" v-model="uFormModel.detail_dcfd" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="调入分店:" :labelWidth="90" prop="detail_drfd" borderBottom @tap="searchFd('drfd')">
					<u-input placeholder="调入分店" v-model="uFormModel.detail_drfd" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="出货仓库:" :labelWidth="90" prop="detail_chck" borderBottom @tap="searchCk('chck')">
					<u-input placeholder="出货仓库" v-model="uFormModel.detail_chck" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="收货仓库:" :labelWidth="90" prop="detail_shck" borderBottom @tap="searchCk('shck')">
					<u-input placeholder="收货仓库" v-model="uFormModel.detail_shck" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="备注说明:" :labelWidth="90" prop="remark" borderBottom>
					<u-input placeholder="备注说明" v-model="uFormModel.remark" border="none">
					</u-input>
				</u-form-item>
				
				<view class="btns" v-if="option.orderType=='add'&&option.title!='已审核'&&option.title!='拣货中'&&option.title!='待拣货确认'">
					<u-button type="primary" text="添加商品" throttleTime="1000" @tap="addGoods"></u-button>
					<u-button type="primary" text="审核" throttleTime="1000" @tap="auditOrder"></u-button>
					<u-button type="primary" text="删单" throttleTime="1000"></u-button>
				</view>
			</u-form>
			
			<lyy-table class="lyy-table" :headers="thData" :height="tableH" :contents="tableData" :headerFixed="true" @row-press="rowpress" @rowClick="rowClick"></lyy-table>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					<view v-if="ifDrawer=='dcfd'"><!-- 调出分店 -->
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange1(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='drfd'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange2(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='chck'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange3(v.ckmc)">
							<text v-html="v.ckmc">{{v.ckmc}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='shck'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange4(v.ckmc)">
							<text v-html="v.ckmc">{{v.ckmc}}</text>
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
				option:"",
				uFormModel:{
					detail_dcfd:"",
					detail_drfd:"",
					detail_chck:"",
					detail_shck:"",
					remark:"",
				},
				uFormRules: {
					"detail_dcfd": {
						type: "string",
						required: true,
						message: "请选择调出分店",
						trigger: ["blur", "change"]
					},
					"detail_drfd": {
						type: "string",
						required: true,
						message: "请选择调入分店",
						trigger: ["blur", "change"]
					},
					"detail_chck": {
						type: "string",
						required: true,
						message: "请选择出货仓库",
						trigger: ["blur", "change"]
					},
					"detail_shck": {
						type: "string",
						required: true,
						message: "请选择收货仓库",
						trigger: ["blur", "change"]
					}
				},
				
				ifDrawer:"",
				list:[],
				tableH:"0",
				thData:[],
				tableData:[],
				//.......................
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
				loadState: "more",
				pageSize: 20,
				pageTotal: 10,
				listLazy:[]
			}
		},
		onLoad(option) {
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
				let datas= JSON.stringify('DJMXCERTIFY${"vbmtype":"PHDSORT","djh":"' + orderid + '","showdel":"true","fdbh":"' + fdbh + '"}')
				// console.log("orderInfo 新单 datas",datas)
				commonMain(datas).then((res) => {
					console.log("orderInfo 新单 res",res)
					if(res.list.rows.length>0){
						this.uFormModel.detail_dcfd=res.list.rows[0].chfdbh
						this.uFormModel.detail_drfd=res.list.rows[0].shfdbh
						this.uFormModel.detail_chck=res.list.rows[0].chckbm
						this.uFormModel.detail_shck=res.list.rows[0].shckbm
						this.uFormModel.remark=res.list.rows[0].remark
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
			// 搜索分店
			searchFd(type){
				if(this.option.orderType=="add"){
					this.ifDrawer = type
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
			// 搜索仓库
			searchCk(type){
				if(this.option.orderType=="add"){
					this.ifDrawer = type
					this.pageTotal = this.pageSize
					let dataes= JSON.stringify('SHCKCERTIFY${""}')
					// console.log("配调单录入 仓库 dataes",dataes)
					commonMain(dataes).then((res) => {
						// console.log("配调单录入 仓库 res",res)
						if(res.retflag==0){
							this.list=res.list
							this.loadFunc()
							this.$refs.drawer.open();
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "获取仓库信息失败"
							})
						}
					}).catch((err) => {
						console.log(err)
					})
					
				}
			},
			
			addGoods(){
				if (this.option.title == "已审核" || this.option.title == "拣货中" || this.option.title == "待拣货确认"){
					this.$refs.uToast.show({
						type:"error",
						message: "该单据已审核，无法添加商品"
					})
					return
				}
				this.$refs.uForm.validate().then(res => {
					uni.navigateTo({
						url: `/pages/function/component/pddlr/goods?dh=${this.option.dh}&orderType=add&detail_dcfd=${this.uFormModel.detail_dcfd}&detail_drfd=${this.uFormModel.detail_drfd}&detail_chck=${this.uFormModel.detail_chck}&detail_shck=${this.uFormModel.detail_shck}`
					})
				})
			},
			// 审核商品
			auditOrder(){
				if (this.option.title == '已审核' || this.option.title == '拣货中' || this.option.title == '待拣货确认'){
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
				if (this.option.title == '已审核' || this.option.title == '拣货中' || this.option.title == '待拣货确认'){
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
			orderCheck(type,checkin){
				let dataes={}
				let userid=uni.getStorageSync("userid")
				let fdbh=uni.getStorageSync("fdbh")
				if(type=="audit"){
					if(checkin){
						dataes= JSON.stringify(
							'PSDBSAVECERTIFY${"djh":"' +
								this.option.dh +
								'","userid":"' + userid +
								'","remark":"","checkin":"T","fdbh":"' +
								fdbh + '"}'
						)
					}else{
						dataes= JSON.stringify(
							'PSDBSAVECERTIFY${"djh":"' +
								this.option.dh +
								'","userid":"' + userid +
								'","remark":"","checkin":"F","fdbh":"' +
								fdbh + '"}'
						)
					}
				}else{
					dataes= JSON.stringify(
						'DELDJCERTIFY${"vbmtype":"PHDSORT","djh":"' + this.option.dh + '","userid":"' + userid + '","username":"' + userid + '"}'
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
					}else if(res.retflag==3){
						uni.showModal({
							content: res.retmsg,
							success: function(resmod) {
								if (resmod.confirm) {
									this.orderCheck("audit","T")
								} else if (resmod.cancel) {
									
								}
							}.bind(this)
						});
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
			
			radioChange1(event){
				this.uFormModel.detail_dcfd=event
				this.$refs.drawer.close();
			},
			radioChange2(event){
				this.uFormModel.detail_drfd=event
				this.$refs.drawer.close();
			},
			radioChange3(event){
				this.uFormModel.detail_chck=event
				this.$refs.drawer.close();
			},
			radioChange4(event){
				this.uFormModel.detail_shck=event
				this.$refs.drawer.close();
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
					uni.navigateTo({
						url: `/pages/function/component/pddlr/goods?orderType=${this.option.orderType}&dh=${this.option.dh}&guid=${event.guid}&spbm=${event.spbm}&spsmm=${event.spsmm}&spmc=${event.spmc}&phsl=${event.phsl}&phjg=${event.phjg}&remark=${event.remark}&detail_dcfd=${this.uFormModel.detail_dcfd}&detail_drfd=${this.uFormModel.detail_drfd}&detail_chck=${this.uFormModel.detail_chck}&detail_shck=${this.uFormModel.detail_shck}`
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
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>