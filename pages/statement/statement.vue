<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="box-content">
			<view class="cell-group">
				<u-cell isLink v-for="(item,index) in list" :key="index" :name="item.cxmc" :title="item.cxmc"
					@tap="cellClick(item)" :style="{backgroundColor: getColor(item.cxbh)}">
					<!-- <uni-icons slot="icon" custom-prefix="iconfont" :type="item.iconType" size="17" color="#303133"></uni-icons> -->
				</u-cell>
			</view>
		</view>
		
		
		<tabbar :tabVal="2"></tabbar>
		<u-toast ref="uToast"></u-toast>
		
 
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import tabbar from "@/components/tabbar/tabbar.vue";
	import {
		reportForm
	} from "@/network/api.js"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				// alllist: [{
				// 		name: "商家销售",
				// 		id: "SjSale",
				// 		iconType: "icon-baobiao"
				// 	},
				// 	{
				// 		name: "收银缴款",
				// 		id: "SyySaleJK",
				// 		iconType: "icon-tubiao-"
				// 	},
				// 	{
				// 		name: "销售日报",
				// 		id: "SaleCWbb",
				// 		iconType: "icon-xiaoshouribao"
				// 	},
				// 	{
				// 		name: "部门分析",
				// 		id: "BMSalebb",
				// 		iconType: "icon-bumen"
				// 	},
				// 	{
				// 		name: "大类分析",
				// 		id: "SuperSale",
				// 		iconType: "icon-ERP_pinzhongdalei"
				// 	},
				// 	{
				// 		name: "门店分析",
				// 		id: "FDAnalyze",
				// 		iconType: "icon-8"
				// 	},
				// 	{
				// 		name: "大类指标",
				// 		id: "SPTyAnaly",
				// 		iconType: "icon-zhibiaoguanli"
				// 	},
				// 	{
				// 		name: "应付账款",
				// 		id: "CWSJJXC",
				// 		iconType: "icon-yingfuzhangkuan"
				// 	},
				// 	{
				// 		name: "商品详情",
				// 		id: "Spkcinfo",
				// 		iconType: "icon-shangpin"
				// 	},
				// 	{
				// 		name: "销售客单统计",
				// 		id: "Custombb",
				// 		iconType: "icon-xiaoshoutongji"
				// 	},
				// 	{
				// 		name: "顾客消费分析",
				// 		id: "Query002",
				// 		iconType: "icon-gukeyingxiao"
				// 	},
				// 	{
				// 		name: "商品销售综合",
				// 		id: "SPSalebb",
				// 		iconType: "icon-zonghetongjifenxi"
				// 	}
				// ],
				list:[]
			};
		},
		onReady() {
			// 设置状态栏文字颜色为 白色
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.getReport()
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			getReport(){
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"userid": "00000"
					// "userid": uni.getStorageSync("userid")
				}
				console.log("reportForm dataes",dataes)
				reportForm(dataes).then((res) => {
					console.log("reportForm res", res)
					if (res.error_code == 0) {
						this.list=res.data
						let newDate = dayjs().format('YYYY-MM-DD')
						if (newDate != uni.getStorageSync('pushReportDate')){
							for(var i in res.data){
								getApp().globalData.appArr.push({
									"name": res.data[i].cxmc,
									"url": "/pages/statement/component/reports/reports",
									"permissionName": res.data[i].cxbh,
								})
							}
						}
						// for(var i in this.list){
						// 	for(var j in this.alllist){
						// 		if(this.list[i].cxbh==this.alllist[j].id){
						// 			this.list[i].iconType=this.alllist[j].iconType
						// 		}
						// 	}
						// }
						uni.setStorageSync('pushReportDate',newDate)
					}else{
						
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			cellClick(obj) {
				uni.navigateTo({
					url: `/pages/statement/component/reports/reports?cxmc=${obj.cxmc}&cxbh=${obj.cxbh}`
				})
			},
			getColor(name) {
				// let myAuth = uni.getStorageSync("myAuth")
				// for (var i in this.alllist) {
				// 	if(name==this.alllist[i].id){
				// 		if (myAuth.indexOf(this.alllist[i].id) <= -1) {
				// 			return "rgba(0,0,0,.1)"
				// 		} else {
							
				// 		}
				// 	}
				// }
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
		background-image: linear-gradient(to bottom, var(--linear-bg) 0%, #fff 50%, #fff 100%);
		
		.status-bar {
			background-color: transparent;
		}
		
		.box-content {
			.cell-group{
				padding-top: 1px;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				background-color: #fff;
				/deep/.u-cell{
					background-color: transparent;
				}
			}
		}
	}
</style>
