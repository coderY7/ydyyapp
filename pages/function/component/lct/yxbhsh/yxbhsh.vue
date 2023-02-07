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
			<view style="margin:auto;">永续补货审核</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<view class="bhorder">
				<view v-if="orderData.length!=0"></view>
				<view v-else class="notText">
					<image src="@/static/images/no.png" mode="widthFix"></image>
					<view>暂无单据信息</view>
				</view>
			</view>
			
			
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
				orderData:[]
			}
		},
		onLoad: function(option) {

		},
		onReady() {
			this.getOrder()
		},
		methods: {
			getOrder(){
				var datas = JSON.stringify('GetCGDCheckList${}')
				commonMain(datas).then((res) => {
					console.log("getOrder res", res)
					this.orderData = res.list
				}).catch((err) => {
					console.log(err)
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.bhorder {
		display: flex;
		justify-content: space-between;
		/deep/uni-image{
			margin: auto;
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
