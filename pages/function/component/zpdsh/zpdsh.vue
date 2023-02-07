<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">直配单收货处理</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			
			<u-form ref="uForm" :model="uFormModel">
				<u-form-item prop="range" borderBottom>
					<uni-datetime-picker v-model="uFormModel.range" type="daterange" :clear-icon="true" @change="dateChange"/>
				</u-form-item>
				<u-form-item label="直配商家:" :labelWidth="90" prop="sjbh" borderBottom>
					<u-input placeholder="直配商家" v-model="uFormModel.sjbh" border="none" confirm-type="search" @confirm="searchSj">
					</u-input>
					<uni-icons type="right" size="16" @tap="searchSj"></uni-icons>
				</u-form-item>
				<u-form-item label="商品条码:" :labelWidth="90" prop="spsmm" borderBottom>
					<u-input placeholder="商品条码" v-model="uFormModel.spsmm" border="none">
					</u-input>
					<uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#606060" @tap="scan()"></uni-icons>
				</u-form-item>
				<u-form-item label="直配分店:" :labelWidth="90" prop="zpfd" borderBottom>
					<u-input v-model="uFormModel.zpfd" disabled border="none">
					</u-input>
				</u-form-item>
				
				<u-button type="primary" class="my-primary-button" text="查询" throttleTime="1000" @tap="search"></u-button>
			</u-form>
			
			
			<lyy-table class="lyy-table" :headers="thData" :contents="tableDataLazy" :headerFixed="true" :height="tableH" @rowClick="rowClick" @row-press="rowpress" @onPullup="pullup"></lyy-table>
			<uni-load-more :status="loadTState" v-if="tableDataLazy.length!=0"></uni-load-more>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					<view v-if="ifDrawer=='Supply'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange1(v.supply_id+'-'+v.supply_name)">
							<text v-html="v.supply_id">{{v.supply_id}}</text>-
							<text v-html="v.supply_name">{{v.supply_name}}</text>
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
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				uFormModel:{
					range: ["2019-01-01",dayjs().format('YYYY-MM-DD')],
					sjbh: "",
					spsmm: "",
					zpfd: uni.getStorageSync("fdbh")+"-"+uni.getStorageSync("fdmc"),
				},
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
		onLoad() {
			
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			uni.getSystemInfo({
				success: function(res) {
					this.tableH= res.screenHeight-396+"px"
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
			dateChange(event){
				this.uFormModel.range=event
			},
			// 搜索商家
			searchSj(){
				this.ifDrawer = "Supply"
				this.pageTotal = this.pageSize
				plus.sqlite.selectSql({
					name: 'downloadDb',
					sql: 'select * from supplier',
					success: function(res) {
						// console.log("Supply res",res)
						this.list = []
						for (var i in res) {
							if (res[i].supply_id.indexOf(this.uFormModel.sjbh) > -1) {
								res[i].supply_id=res[i].supply_id.replace(this.uFormModel.sjbh,this.fontStart + this.uFormModel.sjbh + this.fontEnd)
								this.list.push(res[i])
							}else if (res[i].supply_name.indexOf(this.uFormModel.sjbh) > -1) {
								res[i].supply_name=res[i].supply_name.replace(this.uFormModel.sjbh,this.fontStart + this.uFormModel.sjbh + this.fontEnd)
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
				
			},
			
			radioChange1(event){
				let str=this.removeFont(event)
				this.uFormModel.sjbh=str
				this.$refs.drawer.close();
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
			search(){
				let start=this.uFormModel.range[0]
				let end=this.uFormModel.range[1]
				// let end= dayjs().date(dayjs(this.uFormModel.range[1]).date() + 1).format('YYYY-MM-DD')
				let sjbh=this.uFormModel.sjbh.split("-")[0]
				let zpfd=this.uFormModel.zpfd.split("-")[0]
				let exeStr = "'ZPQRD','" + start + "','" + end + "','" + sjbh + "','" + zpfd + "','" + this.uFormModel.spsmm + "','" + "T'";
				let fendian=uni.getStorageSync("fdbh")
				let datas= JSON.stringify('GETORDERLISTINFO${"fdbh":"' + fendian + '","exeStr":"' + exeStr + '","checkbox":' + "false" + ',"showsum":false}')
				console.log("直配单收货 datas",datas)
				commonMain(datas).then((res) => {
					// console.log("直配单收货 res",res)
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
							this.$set(this.tableData[j], "#",Number(j)+1)
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
				// console.log("rowClick event",event)
				uni.navigateTo({
					url: `/pages/function/component/zpdsh/detail?dh=${event.直配单号}`
				});
			},
			// 长按单据
			rowpress(item,index) {
				this.ifDrawer="table-row"
				this.list = item
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
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>