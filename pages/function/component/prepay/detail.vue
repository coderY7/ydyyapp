<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">{{title}}</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view v-if="option.type=='selfselall'" class="shenqing">
				<shenQing :option="option"></shenQing>
			</view>
			<view v-else-if="option.type=='reviewselall'" class="shenhe">
				<shenHe :option="option"></shenHe>
			</view>
			<view v-else-if="option.type=='payselall'" class="fukuan">
				<fuKuan :option="option"></fuKuan>
			</view>
			<view v-else-if="option.type=='checkselall'" class="fuhe">
				<fuHe :option="option"></fuHe>
			</view>
		</view>
		
		<u-toast ref="uToast"></u-toast>
		
		
	</view>
</template>

<script>
	import shenQing from "./shenQing.vue";
	import shenHe from "./shenHe.vue";
	import fuKuan from "./fuKuan.vue";
	import fuHe from "./fuHe.vue";
	export default {
		components: {
			shenQing,
			shenHe,
			fuKuan,
			fuHe
		},
		data() {
			return {
				title: "",
				option: "",
			}
		},
		onLoad: function(option) {
			this.option=option
			if(option.type=="selfselall"){
				this.title="申请详情"
			}else if(option.type=="reviewselall"){
				this.title="审核详情"
			}else if(option.type=="payselall"){
				this.title="付款详情"
			}else if(option.type=="checkselall"){
				this.title="复核详情"
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {

		},
		methods: {
			
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
		.box-content{
			padding-top: calc(var(--status-bar-height) + 44px);
			padding-bottom: 10px;
			
			.sectionTitle {
				padding: 0;
			}
			
			//。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			.describe {
				padding:0 10px 10px;
				background-color: #fff;
				margin-bottom: 10px;
				border-bottom: 1px solid #dddddd;
				.row-describe>uni-text:first-child{
					display: inline-block;
					width: 90px;
					text-align-last: justify;
					margin-right: 10px;
				}
				.row-describe>uni-text:last-child{
					word-break: break-all;
				}
			}
			.row-flex{
				display: flex;
				justify-content: flex-start;
			}
			.row-describe{
				margin-top: 10px;
			}
			.describe>.row-describe:first-child{
				margin-top: 0;
			}
			.shenhe{
				.describe{
					.row-describe>uni-text:first-child{
						width: 96px;
					}
				}
			}
			
			.shenqing{
				/deep/.u-form {
					.u-form-item__body__left__content__label span{
						width: 100%;
						display: inline-block;
						text-align-last: justify;
					}
					.u-button--mini{
						width: 50px;
					}
					.image-title {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						color: #606266;
						margin-top: 10px;
						.text-black {
							color: #303133;
							font-size: 32rpx;
						}
						
						.text-grey {
							color: #BCBCBC;
							font-size: 24rpx;
							margin-left: 15rpx;
						}
					}
				}
			}
			
			.fukuan{
				/deep/.uni-date{
					width: 100%;
					.uni-date__x-input{
						height: 20px;
					}
					.uni-date-editor--x .uni-date__icon-clear{
						border: 2px solid transparent;
					}
					.uni-date-editor--x__disabled>.uni-date-x{
						background-color: #F5F7FA;
					}
				}
			}
			
			.btns {
				display: flex;
				justify-content: space-around;
				margin-top: 10px;
			
				/deep/.u-button {
					width: 30%;
					margin: 0;
				}
			}
			
			/deep/.u-cell__body{
				padding: 10px 0;
				.uni-icons{
					margin-right: 5px;
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
				}
			}
			
			/deep/.u-popup{
				max-height: 60vh;
				.u-popup__content {
					padding: 15px 10px 20px;
				}
				.uni-scroll-view-content {
					box-sizing: border-box;
					.u-radio {
						margin-top: 14px;
				
						.u-radio__text {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>