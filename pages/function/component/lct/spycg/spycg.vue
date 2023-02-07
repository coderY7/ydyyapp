<template>
	<view class="box">
		<view class="status-bar"></view>
		<uni-nav-bar fixed="true" backgroundColor="#fff" color="#303133">
			<view slot="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back"></uni-icons>
					<view>返回</view>
				</navigator>
			</view>
			<view style="margin:auto;">商品预采</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" ref="uForm">
				<u-form-item label="选择补货单类型:" :labelWidth="120" borderBottom @tap="searchBhlx">
					<u-input v-model="uFormModel.bhlx" disabled disabledColor="#fff" placeholder="请选择补货类型"
						border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
			</u-form>
			<view class="bhorder" v-for="(v,i) in cglist">
				<view class="title" @tap="goInfo(v.cgdbh)">
					<view class="sectionPic"></view>
					<view class="titlecenter">
						<view class="cu">{{v.cgdbh}}</view>
						<text class="ts">
							<text class="ts1">采购数量：{{v.jycgsl}}</text>
							<text>采购时间：{{v.rq}}</text>
						</text>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="bhlx">
					<text class="ts">补货单类型</text>
					<view class="cu">{{v.fcgname}}</view>
				</view>
				<view class="bhcon">
					<view>
						<text class="ts">实采总量</text>
						<view class="cu">{{v.sjcgzl}}</view>
					</view>
					<view>
						<text class="ts">实采总额</text>
						<view class="cu">{{v.sjcgje}}</view>
					</view>
					<view>
						<text class="ts">实采皮重</text>
						<view class="cu">{{v.sjpzzl}}</view>
					</view>
					<view>
						<text class="ts">验收总量</text>
						<view class="cu">{{v.yscgzl}}</view>
					</view>
					<view>
						<text class="ts">验收总额</text>
						<view class="cu">{{v.yscgje}}</view>
					</view>
					<view>
						<text class="ts">验收皮重</text>
						<view class="cu">{{v.yspzzl}}</view>
					</view>
				</view>
			</view>
			
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="list" v-for="(v, i) in bhlxData" @tap="radioChange(v.fcgdno+'-'+v.fcgname)">
						<text v-html="v.fcgdno">{{v.fcgdno}}</text>-
						<text v-html="v.fcgname">{{v.fcgname}}</text>
					</view>
				</scroll-view>
			</uni-drawer>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				uFormModel: {
					bhlx: "",
				},
				bhlxData:[],
				cglist:[]
			}
		},
		onLoad: function(option) {

		},
		onReady() {
			
		},
		methods: {
			searchBhlx() {
				let datas = JSON.stringify('GetCGDForeverType${"userid":""}')
				commonMain(datas).then((res) => {
					console.log("GetCGDForeverType res",res)
					if(res.retflag==0){
						this.bhlxData=res.list
						this.$refs.drawer.open();
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(e){
				this.uFormModel.bhlx = e
				this.selectType(e)
				this.$refs.drawer.close();
			},
			selectType(text){
				let foreverid=text.split("-")[0]
				var datas = JSON.stringify('GetCGDForeverList${"foreverid":"'+foreverid+'",vtype:"YC"}')
				commonMain(datas).then((res) => {
					console.log("selectType res",res)
					if(res.retflag==0){
						this.cglist=res.list
						for(var i in this.cglist){
							this.cglist[i].jycgsl=Number(this.cglist[i].jycgsl).toFixed(2)
							this.cglist[i].sjcgzl=Number(this.cglist[i].sjcgzl).toFixed(2)
							this.cglist[i].sjcgje=Number(this.cglist[i].sjcgje).toFixed(2)
							this.cglist[i].sjpzzl=Number(this.cglist[i].sjpzzl).toFixed(2)
							this.cglist[i].yscgzl=Number(this.cglist[i].yscgzl).toFixed(2)
							this.cglist[i].yscgje=Number(this.cglist[i].yscgje).toFixed(2)
							this.cglist[i].yspzzl=Number(this.cglist[i].yspzzl).toFixed(2)
						}
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			goInfo(cgdh){
				uni.navigateTo({
					url: `/pages/function/component/lct/spycg/spdhinfo?cgdh=${cgdh}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-content{
		padding-left: 0;
		padding-right: 0;
		padding-bottom: 20px;
	}
	/deep/.u-form{
		background-color: #fff;
		.u-form-item__body{
			padding: 10px;
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
			.shop {
				.list{
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.shopleft{
					word-break: break-all;
				}
				
				/deep/uni-button {
					min-width: 80px;
					margin-left: 10px;
					padding: 0;
				}
			}
		}
	}
	.bhorder{
		padding: 8px;
		margin-bottom: 10px;
		background-color: #fff;
		box-sizing: border-box;
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.sectionPic{
				margin-right: 0;
			}
			.titlecenter{
				width: calc(100% - 46px);
				.cu{
					font-size: 16px;
					font-weight: 600;
				}
			}
		}
		.ts{
			font-size: 12px;
			font-weight: 400;
			color: #818181;
		}
		.ts1{
			margin-right: 14px;
		}
		.cu{
			font-size: 16px;
			font-weight: 500;
			color: #000;
		}
		.bhlx{
			padding: 8px;
		}
		.bhcon{
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding:0 8px;
		}
		.bhcon>uni-view{
			width: 33%;
		}
	}
	
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
