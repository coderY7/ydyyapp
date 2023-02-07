<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">
				<text>公告</text>
			</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			
			<view v-if="list.length!=0">
				<view class="noticeList" v-for="(v,i) in list" :key="v.id" @tap="reply(v)">
					<image src="@/static/images/nvip.png" mode="widthFix" v-if="v.typename=='重要公告'"></image>
					<image src="@/static/images/ncool.png" mode="widthFix" v-else-if="v.typename=='特殊公告'"></image>
					<image src="@/static/images/nsup.png" mode="widthFix" v-else-if="v.typename=='商家公告'"></image>
					<image src="@/static/images/nual.png" mode="widthFix" v-else></image>
					<view class="right">
						<view class="right-title">
							<view>
								<text class="cu">{{v.typename}}</text>
								<text class="xiao">阅读({{v.readNum}})</text>
							</view>
							<text class="ts">{{v.publishTime}}</text>
						</view>
						<view class="right-con">
							<text class="con">{{v.noticeTitle}}</text>
						</view>
					</view>
				</view> 
			</view>
			<text class="notText" v-else>没有公告内容</text>
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		oaNoticec
	} from "@/network/api.js";
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {

		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			uni.showLoading({
				title: "拉取公告中..."
			})
			setTimeout(() => {
				this.oaNoticecFunc()
			}, 800)
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			oaNoticecFunc() {
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"id": "0", //记录ID
					"userid": uni.getStorageSync("userid"),
					"nid": "0",
					"startTime": "2000-01-01",
					"endTime": "2099-01-01",
					"typeID": "0", //公告类型ID
					"vtype": "sel",
					"content": "", //公告内容
					"keywords": "", //关键词
					"remark": "app2",
				}

				oaNoticec(data).then((res) => {
					console.log("oaNoticec res", res)
					if (res.err_code == 0) {
						this.list = res.data
					}
				}).catch((err) => {
					
					console.log(err) 
				})
				uni.hideLoading();
			},
			reply(val){
				uni.navigateTo({
					url: `/pages/function/component/notice/reply?id=${val.id}`
				})
			}
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
			padding-bottom: 10px;
		}
		
		.noticeList{
			padding: 10px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			border-bottom: 1px solid #e9e9e9;
			
			uni-image {
				width: 36px;
				height: 36px;
				margin-right: 10px;
				img {
					width: 36px;
					height: 36px;
				}
			}
			.right{
				width: 100%;
				.right-title{
					display: flex;
					justify-content: space-between;
				}
			}
			.cu{
				font-size: 15px;
			}
			.xiao{
				margin-left: 3px;
				font-size: 12px;
				font-weight: 400;
				color: #8d8d8d;
			}
			.ts{
				font-size: 12px;
				font-weight: 400;
				color: #8d8d8d;
			}
			.con{
				font-size: 14px;
				font-weight: 500;
				color: #8d8d8d;
			}
		}
		// /deep/.uni-card{
		// 	margin:10px 0 0 0 !important;
		// }
		// /deep/.notice .uni-card__content{
		// 	width: 100%;
		
		
		// 	.noticeRight{
		// 		width: 100%;
		// 		margin-left: 10px;
		// 	}
		// 	.noticecon {
		// 		display: flex;
		// 		justify-content: space-between;
		// 		align-items: center;
		// 	}
		// }
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
