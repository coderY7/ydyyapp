<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">流程图</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<!-- 采购预采流程 -->
			<view class="section">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>采购预采流程</text>
				</view>
				<view class="lctcon">
					<view class="lctrow lctrow1">
						<view class="card" @tap="wherego('ychz')" :style="{backgroundColor: getColor('ychz')}">
							<image src="@/static/images/lct/cghz.png"></image>
							<view>预采汇总</view>
						</view>
						<image src="@/static/images/lct/lct-1.png" mode="heightFix"></image>
						<view class="card" @tap="wherego('spycg')" :style="{backgroundColor: getColor('spycg')}">
							<image src="@/static/images/lct/ychh.png"></image>
							<view>商品预采</view>
						</view>
						<image src="@/static/images/lct/lct-1.png" mode="heightFix"></image>
						<view class="card" @tap="wherego('ycgdhys')" :style="{backgroundColor: getColor('ycgdhys')}">
							<image src="@/static/images/lct/cgys.png"></image>
							<view>预采验收</view>
						</view>
					</view>
					<view class="lctrow lctrow2">
						<image src="@/static/images/lct/lct-2.png"></image>
					</view>
					<view class="lctrow">
						<view class="card" @tap="wherego('spfjph')" :style="{backgroundColor: getColor('spfjph')}">
							<image src="@/static/images/lct/mdjh.png"></image>
							<view>门店分拣</view>
						</view>
						<view class="card" @tap="wherego('yxzjjh')" :style="{backgroundColor: getColor('yxzjjh')}">
							<image src="@/static/images/lct/zjfh.png"></image>
							<view>直接拣货</view>
						</view>
					</view>
					<view class="lctrow lctrow2">
						<image src="@/static/images/lct/lct-3.png"></image>
					</view>
					<view class="lctrow lctrow3">
						<view class="card" @tap="wherego('mddhqr')" :style="{backgroundColor: getColor('mddhqr')}">
							<image src="@/static/images/lct/mdsh.png"></image>
							<view>门店验收</view>
						</view>
					</view>
					<view class="lctrow lctrow4">
						<image src="@/static/images/lct/lct-4.png" mode="widthFix"></image>
					</view>
					<view class="lctrow lctrow3">
						<view class="card" @tap="wherego('yxbhsh')" :style="{backgroundColor: getColor('yxbhsh')}">
							<image src="@/static/images/lct/zbhy.png"></image>
							<view>永续审核</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 其他功能 -->
			<view class="section">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>其他功能</text>
				</view>
				<view class="lctrowqt">
					<view class="card" @tap="wherego('bzxth')" :style="{backgroundColor: getColor('bzxth')}">
						<image src="@/static/images/lct/bzxth.png"></image>
						<view>包装箱退回</view>
					</view>
					<view class="card" @tap="wherego('ycdwh')" :style="{backgroundColor: getColor('ycdwh')}">
						<image src="@/static/images/lct/zbhy.png"></image>
						<view>永采单维护</view>
					</view>
				</view>
			</view>
			
			<u-toast ref="uToast"></u-toast>
			

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				replist: getApp().globalData.replist,
				
			}
		},
		onLoad: function(option) {

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
		},
		methods: {
			getColor(name) {
				let myAuth = uni.getStorageSync("myAuth")
				for (var i in this.replist) {
					if(name==this.replist[i].alias){
						if (myAuth.indexOf(this.replist[i].id) <= -1) {
							return "rgba(0,0,0,.1)"
						} else {
							
						}
					}
					
				}
			},
			wherego(name) {
				let myAuth = uni.getStorageSync("myAuth")
				for (var i in this.replist) {
					if (name == this.replist[i].alias) {
						// if (myAuth.indexOf(this.replist[i].id) <= -1) {
						// 	this.$refs.uToast.show({
						// 		type:"error",
						// 		message: "没有权限"
						// 	})
						// } else {
							let urls=this.getUrl(name)
							uni.navigateTo({
								url: urls
							});
						// }
					}
				}
			},
			getUrl(name) {
				let urls = ""
				if (name == "ychz") {
					urls = "/pages/function/component/lct/bhychz"
				} else if (name == "spycg") {
					urls = "/pages/function/component/lct/spycg/spycg"
				} else if (name == "ycgdhys") {
					urls = "/pages/function/component/lct/ycgdhys/ycgdhys"
				} else if (name == "yxzjjh") {
					urls = "/pages/function/component/lct/yxzjjh/yxzjjh"
				} else if (name == "spfjph") {
					urls = "/pages/function/component/lct/spfjph/spfjph"
				} else if (name == "mddhqr") {
					urls = "/pages/function/component/lct/mddhqr/mddhqr"
				} else if (name == "yxbhsh") {
					urls = "/pages/function/component/lct/yxbhsh/yxbhsh"
				} else if (name == "bzxth") {
					urls = "/pages/function/component/lct/bzxth/bzxth"
				} else if (name == "ycdwh") {
					urls = "/pages/function/component/lct/ycdwh/ycdwh"
				}
				return urls
			},
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
			padding-top: calc(var(--status-bar-height) + 44px);
			
			.section {
				.sectionTitle {
					padding: 0;
				}
			}
			
			.lctrow {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			
			.lctrow1 {
				uni-image {
					width: 40px;
					height: 8px;
			
					img {
						width: 40px;
						height: 8px;
					}
				}
			}
			
			.lctrow2 {
				uni-image {
					margin: auto;
					width: 80%;
					height: 48px;
			
					img {
						height: 48px;
					}
				}
			}
			
			.lctrow3 {
				justify-content: center;
			}
			
			.lctrow4 {
				uni-image {
					margin: auto;
					width: 8px;
			
					img {
						width: 8px;
					}
				}
			}
			
			.lctrowqt {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			
				.card {
					margin-right: 10px;
				}
			}
			
			.card {
				padding: 0 7px 10px;
				background-color: #fff;
				text-align: center;
			
				uni-image {
					width: 40px;
					height: 40px;
			
					img {
						width: 40px;
						height: 40px;
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