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
			<view style="margin:auto;">到货历史订单</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" ref="uForm" v-show="historyData.length!=0">
				<u-form-item label="商品名称:" :labelWidth="90" prop="goods" borderBottom>
					<u-input v-model="uFormModel.goods" placeholder="请输入商品名称查询" border="none" confirm-type="search"
						@confirm="getHistory">
						<template slot="suffix">
							<uni-icons type="search" size="24" @tap="getHistory"></uni-icons>
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			
			<view v-if="historyData.length!=0">
				<!-- <uni-collapse v-for="(v,i) in historyData" class="fold">
					<uni-collapse-item :title="v.cgdbh" :open="true" title-border="show">
						<view class="bhorder-con">
							<view>
								<text class="ts">补货数量</text>
								<view class="cu">{{v.bhsl}}</view>
							</view>
							<view>
								<text class="ts">分拣数量</text>
								<view class="cu">{{v.sortsl}}</view>
							</view>
							<view>
								<text class="ts">收货数量</text>
								<view class="cu">{{v.shsl}}</view>
							</view>
							<view>
								<text class="ts">补货价格</text>
								<view class="cu lightGreen">{{v.pjjj}}</view>
							</view>
							<view>
								<text class="ts">补货金额</text>
								<view class="cu">{{v.bhje}}</view>
							</view>
							<view>
								<text class="ts">零售价格</text>
								<view class="cu">{{v.nsjg}}</view>
							</view>
						</view>
						<view class="bhorder-rq">
							<text class="ts">分拣日期</text>：
							<text class="cu">{{v.ztrq}}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse> -->
			</view>
			<view v-else class="notText">
				<image src="@/static/images/no.png" mode="widthFix"></image>
				<view>暂无历史订单信息</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				uFormModel: {
					goods: "",
				},
				historyData:[]
			}
		},
		onLoad: function(option) {
			this.getHistory(option.fdbh,this.uFormModel.goods)
		},
		onReady() {
			
		},
		methods: {
			getHistory(fdbh,keys){
				let getKeys = ""
				if (keys) {
					getKeys = keys
				}
				var datas = JSON.stringify('GetFDHistoryList${"fdbh":"' + fdbh + '","keys":"' + getKeys + '"}')
				commonMain(datas).then((res) => {
					console.log("getHistory res",res)
					if(res.retflag==0){
						this.historyData=resel.list
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-form {
		background-color: #fff;
	}

	
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
