<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">问题反馈</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="searchBox">
				<u-input prefixIcon="search" placeholder="请输入要查询的问题" v-model="searchText" confirm-type="search"
					@confirm="searchQuestion('sels')">
				</u-input>

				<view class="searchRes" v-show="showListBol">
					<view v-if="showList.length!=0">
						<view class="searchResList" v-for="(item,index) in showList" @tap="toDetail(item)">{{item.title}}</view>
					</view>
					<text class="notText" v-else>搜索数据为空</text>
				</view>
			</view>
			<view>
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>常见问题</text>
				</view>
				<u-cell :title="item.title" isLink v-for="(item,index) in commonQues" :key="index" @tap="toDetail(item)"></u-cell>
			</view>

			<view class="feedback-body">
				<view class="sectionTitle text-black">
					<view class="sectionPic"></view>
					<text>问题反馈和意见建议<text style="color: red;">*</text></text>
				</view>

				<textarea placeholder="请描述您遇到的问题或对本产品的建议..." v-model="feedbackContent" class="feedback-textare"
					maxlength="-1" />

				<view class="image-title">
					<view class="sectionTitle text-black">
						<view class="sectionPic"></view>
						<text>上传问题截图<text class="text-grey"> (选填，最多可上传6张)</text>
						</text>
					</view>
					<view class="text-grey">{{ imgList.length }}/6</view>
				</view>
				<view class="filepicker">
					<mk-upload :sourceType="['camera','album']" :imgList="imgList" @onDelete="onDelete"
						@onChoose="onChoose" :maxChooseCount="9" :maxCount="9" />
				</view>

				<u-button type="primary" class="my-primary-button" text="提交" throttleTime="1000" @tap="upQuestion"></u-button>
				
			</view>

			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import mkupload from '@/components/mk-upload/mk-upload.vue';
	import {
		getQuestion,
		Question,
		comQuestion
	} from "@/network/api.js";
	export default {
		components: {
			mkupload
		},
		data() {
			return {
				searchText: "",
				commonQues: [],
				showList: [],
				showListBol: false,
				feedbackContent: '', //反馈内容
				imgList: []
			};
		},
		onLoad() {

		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.searchQuestion("sel")
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			searchQuestion(type) {
				let dataes = {
					"access_token": uni.getStorageSync("access_token"),
					"vtype": type,
					"title": this.searchText
				}
				comQuestion(dataes).then((res) => {
					console.log("comQuestion res", res)
					if (res.err_code == 0) {
						if (type == "sel") {
							this.commonQues = res.data
						} else if (type == "sels") {
							this.showListBol=true
							this.showList = res.data
						}
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			toDetail(item) {
				this.showListBol=false
				uni.navigateTo({
					url: `/pages/my/component/set/component/feeback/detail?title=${item.title}&connects=${item.connects}`
				})
			},
			onDelete(index) {
				this.imgList.splice(index, 1);
			},
			onChoose(e) {
				var tempFilePaths = e.tempFilePaths;
				tempFilePaths.forEach((v, i, arr) => {
					this.imgList.push(v);
				})
			},
			upQuestion() {
				if (this.feedbackContent == "") {
					this.$refs.uToast.show({
						type: "error",
						message: "反馈问题不能为空"
					})
				} else {
					let dataes = {
						"access_token": uni.getStorageSync("access_token"),
						"sn": uni.getStorageSync("sn"),
						"userid": uni.getStorageSync("userid"),
						"uname": uni.getStorageSync("model"),
						"suggest": this.feedbackContent,
						"phone": uni.getStorageSync("uuid"),
						"ztbz": "F"
					}
					getQuestion(dataes).then((res) => {
						console.log("getQuestion res", res)
						if (res.err_code == 0) {

						}
					}).catch((err) => {
						console.log(err)
					})
				}
			}

		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
		watch: {
			imgList: function(newv, oldv) {
				if (newv.length > 6) {
					this.imgList = this.imgList.splice(0, 6)
				}
			}
		}
	};
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
			padding-left: 0;
			padding-right: 0;
		}
		.searchBox {
			padding: 8px 10px 0;
			position: relative;
			
			.searchRes{
				box-sizing: border-box;
				width: 94%;
				position: absolute;
				top: 46px;
				left: 3%;
				padding:10px 0;
				border-radius: 6px;
				background-color: #fff;
				box-shadow: 0px 2px 12px 0 rgba(0,0,0,.38);
				margin-top: 0;
				z-index: 100;
				.searchResList{
					padding: 8px 10px;
					border-bottom: 1px solid #EAEBEC;
				}
				.searchResList:nth-child(even){
					background-color: #FAFAFA;
				}
			}
		}
		
		.text-black {
			color: #303133;
			font-size: 32rpx;
		}
		
		.text-grey {
			color: #BCBCBC;
			font-size: 24rpx;
			margin-left: 15rpx;
		}
		
		.feedback-quick {
			padding-right: 10rpx;
			color: #606266;
			font-size: 32rpx;
		}
		
		.feedback-body {
			padding: 0 30rpx 30rpx;
		
			.sectionTitle {
				padding-left: 0;
			}
		}
		
		.feedback-textare {
			margin-bottom: 30rpx;
			height: 266rpx;
			color: #303133;
			font-size: 28rpx;
			line-height: 2em;
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			border-radius: 20rpx;
			background-color: #F5F6F8;
		}
		
		// 上传图片
		.mk-upload {
			padding-bottom: 0;
		}
		
		.image-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			color: #606266;
		
		}
		
		.filepicker {
			margin-bottom: 28rpx;
		}
	}
</style>
<style lang="scss">
	// page {
	// 	background-color: #fff;
	// }
</style>
