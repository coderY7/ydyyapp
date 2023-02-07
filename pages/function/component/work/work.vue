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
				<text>我的工作</text>
			</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#3386c4"></uni-segmented-control>
			<view class="content">
				<view v-if="current == 0">
					
					<view v-if="incompleteData.length!=0">
						<view class="workList" v-for="(v,i) in incompleteData" @tap="handle(v)">
							<image src="@/static/images/w4.png" mode="widthFix" v-if="v.LinkState == 'W'||v.LinkState == 'H'||v.LinkState == 'T'"></image>
							<image src="@/static/images/w7.png" mode="widthFix" v-else-if="v.LinkState == 'P'||v.LinkState == 'PrnLable'||v.LinkState == 'R'"></image>
							<image src="@/static/images/w3.png" mode="widthFix" v-else></image>
							<view class="right">
								<view class="right-title">
									<view>
										<text class="cu">{{v.InfoTypeName}}</text>
									</view>
									<text class="ts">{{v.InfoDate}}</text>
								</view>
								<view class="right-con">
									<text class="con">{{v.InfoContent}}</text>
								</view>
							</view>
						</view> 
					</view>
					<text class="notText" v-else>没有待处理的工作</text>
					
				</view>
				<view v-else-if="current == 1">
					
					<view v-if="completeData.length!=0">
						<view class="workList" v-for="(v,i) in completeData" @tap="look(v)">
							<image src="@/static/images/w4.png" mode="widthFix" v-if="v.LinkState == 'W'||v.LinkState == 'H'||v.LinkState == 'T'"></image>
							<image src="@/static/images/w7.png" mode="widthFix" v-else-if="v.LinkState == 'P'||v.LinkState == 'PrnLable'||v.LinkState == 'R'"></image>
							<image src="@/static/images/w3.png" mode="widthFix" v-else></image>
							<view class="right">
								<view class="right-title">
									<view>
										<text class="cu">{{v.infonumber}}</text>
									</view>
									<text class="ts">{{v.CheckRQ}}</text>
								</view>
								<view class="right-con">
									<text class="con">{{v.InfoContent}}</text>
								</view>
							</view>
						</view> 
					</view>
					<text class="notText" v-if="completeData.length==0">没有已完成的工作</text>
					
				</view>
				
				
			</view>
			
			<u-toast ref="uToast"></u-toast>
			
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		oaWorkFlow
	} from "@/network/api.js";
	export default {
		data() {
			return {
				items: ['待处理工作', '已完成工作'],
				current: 0,
				incompleteData:[],
				completeData:[],
				
			}
		},
		onLoad() {
			
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.getwork("G0001",-99)
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
					if(this.current==0){
						this.getwork("G0001",-99)
					}else if(this.current==1){
						this.getwork("G0001",-1)
					}
					// console.log("this.current",this.current)
				}
			},
			handle(item){
				if (item.ztbz == 'NO' || item.ztbz == 'O') {
					this.$refs.uToast.show({
						type:"error",
						message: "该项工作需要您在PC客户端处理！"
					})
					return
				} else if (item.ztbz == 'T' && (item.LinkState == 'P' || item.LinkState == 'R')) {
					this.$refs.uToast.show({
						type:"error",
						message: "该项工作需要您在PC客户端处理！"
					})
					return
				} else if (item.ztbz == 'T' && item.LinkState == 'PrnLable') {
					this.$refs.uToast.show({
						type:"error",
						message: "该项工作需要您在PC客户端处理！"
					})
					return
				}else{
					uni.navigateTo({
						url: `/pages/function/component/work/detail?RecordID=${item.RecordID}&LinkState=${item.LinkState}&ztbz=${item.ztbz}&CheckBillNo=${item.CheckBillNo}&Wbilltype=${item.Wbilltype}&InfoContent=${item.InfoContent}`
					})
				}
				
			},
			look(item){
				uni.showModal({
					title: "我的意见",
					content: item.CheckSM,
					confirmText: "确定",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							
						}
					}
				});
			},
			getwork(groupId, recordID) {
				let data={
					"access_token": uni.getStorageSync("access_token"),
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"groupId": groupId,
					"recordID": recordID,//-99 拉取未完成工作，-1 拉取已完成工作
					"sn": uni.getStorageSync("sn"),
					"dtmark": "app2"
				}
				console.log("oaWorkFlow data", data)
				oaWorkFlow(data).then((res) => {
					console.log("oaWorkFlow res", res)
					if(res.err_code==0){
						
						if(recordID==-99){
							this.incompleteData=res.data
						}else if(recordID==-1){
							this.completeData=res.data
							for(var i in this.completeData){
								this.completeData[i].CheckRQ=this.completeData[i].CheckRQ.split("T")[0]
							}
						}
						
					}else{
						// uni.$u.toast('查询失败')
					}
					
				}).catch((err) => {
					console.log(err)
				})
			}
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
		}
		/deep/.segmented-control{
			margin-top: 5px;
		}
		.content{
			margin-top: 8px;
		}
		.workList{
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
			.ts{
				font-size: 12px;
				font-weight: 400;
				color: #8d8d8d;
			}
			.con{
				font-size: 14px;
				font-weight: 500;
				color: #8d8d8d;
				word-break: break-all;
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
