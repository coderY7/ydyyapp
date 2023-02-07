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
			<view style="margin:auto;">{{spmc}}</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<view class="bhorder" v-for="(v,i) in goodsData">
				<view class="title">
					<view class="sectionPic"></view>
					<view class="titlecenter">
						<view class="cu">
							<text>{{v.fdbh}}</text>-
							<text>{{v.fdmc}}</text>
						</view>
					</view>
				</view>
				<view class="bhcon">
					<view>
						<text class="ts">要货数量</text>
						<view class="cu">{{v.bhsl}}</view>
					</view>
					<view>
						<text class="ts">存货数量</text>
						<view class="cu">{{v.fdshsl}}</view>
					</view>
				</view>
				<view class="bhlx">
					<text class="ts">要货备注</text>
					<view class="cu">{{v.spremark}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		
	} from "@/network/api.js";
	export default {
		data() {
			return {
				spmc:"",
				goodsData:[]
			}
		},
		onLoad: function(option) {
			this.spmc=option.spmc
			this.goodsinfo(option.cgdh,option.spbm,option.spsmm,option.spmc)
		},
		onReady() {

		},
		methods: {
			goodsinfo(cgdh,spbm,spsmm,spmc) {
				var datas = JSON.stringify('GetFDSPBHMxList${"djh":"' + cgdh +'","spbm":"' + spbm + '","spsmm":"' + spsmm + '"}')
				commonMain(datas).then((res) => {
					let resl = res.list
					console.log("goodsinfo res",resl)
					this.goodsData=resl
					for(var i in this.goodsData){
						this.goodsData[i].bhsl=Number(this.goodsData[i].bhsl).toFixed(2)
						this.goodsData[i].fdshsl=Number(this.goodsData[i].fdshsl).toFixed(2)
					}
				}).catch((err) => {
					console.log(err)
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
	.bhorder{
		padding: 8px;
		margin-bottom: 10px;
		background-color: #fff;
		box-sizing: border-box;
		.title{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 10px;
			.titlecenter{
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
		.cu{
			font-size: 16px;
			font-weight: 400;
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
			// margin-bottom: 10px;
			.cu{
				font-size: 16px;
				font-weight: 500;
			}
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
