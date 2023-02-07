<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">配调单录入</view>
			<view class="right">
				<u-button class="icon-button guideJS1" text="" throttleTime="2000" @tap="newOrder">
					<uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
				</u-button>
			</view>
		</view>
		<view class="box-content">
			<u-form ref="uForm" :model="uFormModel">
				<u-form-item prop="range" borderBottom>
					<uni-datetime-picker v-model="uFormModel.range" type="daterange" :clear-icon="true" @change="dateChange"/>
				</u-form-item>
				<u-form-item label="部门编号:" :labelWidth="90" prop="title_bm" borderBottom @tap="searchBm">
					<u-input placeholder="部门编号" v-model="uFormModel.title_bm" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="商品条码:" :labelWidth="90" prop="spsmm" borderBottom>
					<u-input placeholder="商品条码" v-model="uFormModel.spsmm" border="none">
					</u-input>
					<uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#606060" @tap="scan()"></uni-icons>
				</u-form-item>
				<u-form-item label="出货分店:" :labelWidth="90" prop="title_chfd" borderBottom @tap="searchFd('chfd',false)">
					<u-input placeholder="出货分店" v-model="uFormModel.title_chfd" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="收货分店:" :labelWidth="90" prop="title_shfd" borderBottom @tap="searchFd('shfd',false)">
					<u-input placeholder="收货分店" v-model="uFormModel.title_shfd" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="配调单号:" :labelWidth="90" prop="title_djbh" borderBottom>
					<u-input placeholder="配调单号" v-model="uFormModel.title_djbh" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="状态标志:" :labelWidth="90" prop="title_ztbz" borderBottom @tap="popupShow=true">
					<u-input placeholder="状态标志" v-model="uFormModel.title_ztbz" disabled disabledColor="#fff" border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-button type="primary" class="my-primary-button" text="查询" throttleTime="1000" @tap="search"></u-button>
			</u-form>
			
			<lyy-table class="lyy-table" :headers="thData" :contents="tableDataLazy" :headerFixed="true" :height="tableH" @row-press="rowpress" @rowClick="rowClick" @onPullup="pullup"></lyy-table>
			<uni-load-more :status="loadTState" v-if="tableDataLazy.length!=0"></uni-load-more>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					<view v-if="ifDrawer=='bm'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange1(v.depart_id+'-'+v.depart_name)">
							<text v-html="v.depart_id">{{v.depart_id}}</text>-
							<text v-html="v.depart_name">{{v.depart_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='chfd'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange2(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='shfd'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange3(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
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
			<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupShow=false">
				<view>
					<u-radio-group placement="column" :value="uFormModel.title_ztbz" @change="radioChange0">
						<u-radio name="ALL" label="全部"></u-radio>
						<u-radio name="O" label="已审核"></u-radio>
						<u-radio name="T" label="未审核"></u-radio>
					</u-radio-group>
				</view>
			</u-popup>
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
				uFormModel:{
					range: ["2021-01-01",dayjs().format('YYYY-MM-DD')],
					title_bm:"",
					spsmm:"",
					title_chfd: "",
					title_shfd:"",
					title_djbh:"",
					title_ztbz: "ALL",
				},
				popupShow:false,
				ifDrawer:"",
				list:[],
				
				tableH: "0",
				thData:[],
				tableData:[],
				tableDataLazy:[],
				//.......................
				tableTotal:10,
				tableSize:20,
				loadTState: "more",
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
				loadState: "more",
				pageSize: 20,
				pageTotal: 10,
				listLazy:[]
			}
		},
		onLoad() {
			this.searchFd("chfd",true)
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			uni.getSystemInfo({
				success: function(res) {
					this.tableH= res.screenHeight-520+"px"
				}.bind(this)
			});
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
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
			
			search(){
				this.tableData=[]
				let fdbh=uni.getStorageSync("fdbh")
				let bmbh=this.uFormModel.title_bm.split("-")[0]
				let title_ztbz=this.uFormModel.title_ztbz=="ALL"?"":this.uFormModel.title_ztbz
				let chfd=this.uFormModel.title_chfd.split("-")[0]
				let shfd=this.uFormModel.title_shfd.split("-")[0]
				
				let exeStr = "'PHDSORT','" + this.uFormModel.range[0] + "','" + this.uFormModel.range[1] + "','" + bmbh + "','" + chfd + "','" + shfd + "','" + this.uFormModel.title_djbh  + "','" + this.uFormModel.spsmm + "','" + title_ztbz + "'"
				let dataes= JSON.stringify('GETORDERLISTINFO${"fdbh":"' + fdbh + '","exeStr":"' + exeStr + '","checkbox":' + 'false' + ',"showsum":false}')
				// console.log("调配单录入 查询 dataes",dataes)
				commonMain(dataes).then((res) => {
					console.log("调配单录入 查询 res",res)
					if(res.retflag==0){
						this.thData=[]
						for(var i in res.list[0].columns){
							this.thData.push({
								"label": res.list[0].columns[i].title,
								"key": res.list[0].columns[i].title,
								"width": res.list[0].columns[i].width
							})
						}
						this.tableData=res.list[0].rows
						for(var j in this.tableData){
							if(this.tableData[j].审核状态=="已审核"){
								this.tableData[j].审核状态="<font style='color:green;'>已审核</font>"
							}else{
								this.tableData[j].审核状态="<font style='color:red;'>"+this.tableData[j].审核状态+"</font>"
							}
						}
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
			// 新增单据
			newOrder(){
				let fdbh=uni.getStorageSync("fdbh")
				let dataes= JSON.stringify('DJHCERTIFY${"vbmtype":"PHDSORT","fdbh":"' + fdbh + '"}')
				// console.log("配调单录入 新单 dataes",dataes)
				commonMain(dataes).then((res) => {
					console.log("配调单录入 新单 res",res)
					if (res.retflag == 0) {
						uni.navigateTo({
							url: `/pages/function/component/pddlr/pddxd?dh=${res.djh}&orderType=add&title=未审核`
						});
					} else {
						this.$refs.uToast.show({
							type:"error",
							message: "获取新单号失败，请稍后再试"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			
			dateChange(event){
				this.uFormModel.range=event
			},
			// 搜索部门
			searchBm(){
				this.ifDrawer = "bm"
				this.pageTotal = this.pageSize
				plus.sqlite.selectSql({
					name: 'downloadDb',
					sql: 'select * from depart',
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
			},
			// 扫码 搜索商品
			scan() {
				uni.scanCode({
					success: (res) => {
						console.log('扫码内容', res)
						this.uFormModel.spsmm=res.result
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type:"error",
							message: "识别失败"
						})
					}
				});
			}, 
			searchFd(type,bol){
				this.ifDrawer = type
				this.pageTotal = this.pageSize
				plus.sqlite.selectSql({
					name: 'downloadDb',
					sql: 'select * from shop',
					success: function(res) {
						if(bol){
							if(type=="chfd"){
								let xx=uni.getStorageSync("fdbh")
								for(var i in res){
									if(xx==res[i].shop_num){
										this.uFormModel.title_chfd=res[i].shop_num+"-"+res[i].shop_name
									}
								}
							}
						}else{
							this.list = res
							this.loadFunc()
							this.$refs.drawer.open();
						}
					}.bind(this),
					fail: function(e) {
						this.toDownload()
						console.log('查询SQL语句失败: ');
					}.bind(this)
				});
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
			// 编辑单据
			rowClick(event){
				console.log("rowClick event",event)
				let reg = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
				let ztbz=event.审核状态.replace(reg, '')
				uni.navigateTo({
					url: `/pages/function/component/pddlr/pddxd?dh=${event.配调单编号}&orderType=edit&title=${ztbz}`
				});
			},
			rowpress(item,index) {
				this.ifDrawer="table-row"
				this.list = item
				this.$refs.drawer.open();
			},
			radioChange0(event){
				this.uFormModel.title_ztbz=event
				this.popupShow=false
			},
			radioChange1(event){
				this.uFormModel.title_bm=event
				this.$refs.drawer.close();
			},
			radioChange2(event){
				this.uFormModel.title_chfd=event
				this.$refs.drawer.close();
			},
			radioChange3(event){
				this.uFormModel.title_shfd=event
				this.$refs.drawer.close();
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
			
			/deep/.u-form{
				.u-button{
					margin-top: 10px;
					margin-bottom: 10px;
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