<template>
	<view class="box">
		<view class="status-bar"></view>
		<view v-show="!setShow">
			<uni-nav-bar fixed="true" backgroundColor="#fff" color="#303133">
				<view slot="left">
					<navigator open-type="navigateBack">
						<uni-icons type="back"></uni-icons>
						<view>返回</view>
					</navigator>
				</view>
				<view style="margin:auto;">移动收银台</view>
				<view slot="right">
					<uni-icons type="gear" size="20" @tap="goSet"></uni-icons>
				</view>
			</uni-nav-bar>
			<view class="box-content">
				
				<view class="fixed">
					<view class="fixedcon">
						<view class="fixedconleft">
							<text>总计:</text>
							<text>￥0.00</text>
						</view>
						<u-button type="primary" text="结算" throttleTime="1000"></u-button>
						
						<view class="iconView" @tap="scanFunc">
							<uni-icons type="scan" size="30" color="#fff"></uni-icons>
						</view>
					</view>
				</view>
				
				<u-popup :show="popupHyShow" mode="center" class="u-popup-center" :closeable="true" @close="popupHyclose">
					<text class="popup-title">查询会员</text>
					<view>
						<u-input prefixIcon="search" placeholder="请输入会员卡号或手机号" confirm-type="search"></u-input>
						<u-button type="primary" text="确定" throttleTime="1000"></u-button>
					</view>
				</u-popup>
				<u-popup :show="popupSpShow" mode="center" class="u-popup-center" :closeable="true" @close="popupSpclose">
					<text class="popup-title">查询商品</text>
					<view>
						<u-input prefixIcon="search" placeholder="请输入商品条码" confirm-type="search"></u-input>
						<u-button type="primary" text="确定" throttleTime="1000"></u-button>
					</view>
				</u-popup>
				<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupclose">
					<view>
						<view style="font-size:18px;">POS机初始化</view> 
						<view>首次使用请扫描配置二维码</view>
						<u-button type="primary" :plain="true" text="扫描配置二维码" @tap="scanFunc" throttleTime="1000"></u-button>
					</view>
				</u-popup>
				
				
				<u-toast ref="uToast"></u-toast>
			
			</view>
		</view>
		
		<view class="set" v-show="setShow">
			<uni-nav-bar fixed="true" backgroundColor="#fff" color="#303133">
				<view slot="left">
					<view class="navleftview" @tap="exitSet">
						<uni-icons type="back"></uni-icons>
						<view>返回</view>
					</view>
				</view>
				<view style="margin:auto;">基础设置</view>
				<view slot="right"></view>
			</uni-nav-bar>
			<view class="box-content">
				<view class="list">
					<view>
						<uni-icons type="scan" size="20"></uni-icons>
						<text>商品连续扫码</text>
					</view>
					<u-switch v-model="scan" @change="isScan"></u-switch>
				</view>
				<view class="list">
					<view>
						<uni-icons type="scan" size="20"></uni-icons>
						<text>自动打印小票</text>
					</view>
					<u-switch v-model="autoPrint" @change="isAutoPrint"></u-switch>
				</view>
				<view class="list">
					<view>
						<uni-icons type="close" size="20"></uni-icons>
						<text>删除单品确认</text>
					</view>
					<u-switch v-model="delGoods" @change="isDelGoods"></u-switch>
				</view>
				<view class="list">
					<view>
						<uni-icons type="trash-filled" size="20"></uni-icons>
						<text>删除整单确认</text>
					</view>
					<u-switch v-model="delGoodslist" @change="isDelGoodslist"></u-switch>
				</view>
				<u-cell isLink @tap="resetPos">
					<view slot="title">
						<uni-icons type="reload" size="20"></uni-icons>
						<text class="u-cell-text">pos配置重置</text>
					</view>
				</u-cell>
				
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
				popupHyShow:false,
				popupSpShow:false,
				popupShow:true,
				
				//set.............
				setShow:false,
				scan: false,
				autoPrint: false,
				delGoods: false,
				delGoodslist: false,
			}
		},
		onReady() {
			
		},
		onShow() {
			
		},
		methods: {
			scanFunc() {
				uni.scanCode({
					success: (res) => {
						console.log('扫码内容', res)
						
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type:"error",
							message: "识别失败"
						})
					}
				});
			}, 
			popupHyclose(){
				this.popupHyShow=false
			},
			popupSpclose(){
				this.popupSpShow=false
			},
			popupclose(){
				this.popupShow=false
			},
			//set............................
			goSet(){
				this.setShow=true
			},
			exitSet(){
				this.setShow=false
			},
			isScan(e){
				this.scan=e
			},
			isAutoPrint(e){
				this.autoPrint=e
			},
			isDelGoods(e){
				this.delGoods=e
			},
			isDelGoodslist(e){
				this.delGoodslist=e
			},
			resetPos(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-content {
		padding-left: 0;
		padding-right: 0;
		padding-bottom: 10px;
	}
	
	.fixed{
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		.fixedcon{
			height: 56px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			
			.fixedconleft{
				font-size:18px;
			}
			.fixedconleft>uni-text:last-child{
				font-weight: 600;
				color: #EC8B09;
			}
			
			/deep/.u-button{
				width: 80px;
				height: 34px;
				margin: 0;
			}
			
			.iconView{
				width: 30px;
				z-index: 10;
				padding: 10px;
				border-radius: 50%;
				background-image: linear-gradient(to top, #087AB8, #43BAFC);
				position: absolute;
				top: -27px;
				left: calc(50% - 25px);
			}
		}
	}
	
	.set .list{
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: #fff;
		border-bottom: 1px solid #EAEBEC;
	}
	.set .list>uni-view{
		/deep/.uni-icons{
			margin-right: 10px;
		}
	}
	/deep/.u-cell{
		.u-cell__body{
			padding: 13px 10px;
		}
		.uni-icons{
			margin-right: 10px;
		}
	}
	/deep/.u-popup-center{
		.u-button{
			min-width: 80px;
			max-width: 120px;
		}
	}
	
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
