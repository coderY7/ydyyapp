<template>
	<view class="box-compents">

		<view class="box-view-card">
			<view class="card-title">常用功能</view>
			<swiper :indicator-dots="true" indicator-color="#E6EBF6" indicator-active-color="#0B4A8D" class="swiper"
				:current="current">
				<swiper-item>
					<scroll-view style="height:100%;margin-top:10px;" scroll-y="true">
						<view class="function">
							<view class="functionView guideJS1" @tap="wherego('goshoping')"
								:style="{backgroundColor: getColor('goshoping')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">商品采购</view>
							</view>
							<view class="functionView guideJS2" @tap="wherego('addshoping')"
								:style="{backgroundColor: getColor('addshoping')}">
								<image class="" src="@/static/images/spbh.png" mode="heightFix"></image>
								<view class="zi">商品补货</view>
							</view>
							<view class="functionView guideJS3" @tap="wherego('getstorage')"
								:style="{backgroundColor: getColor('getstorage')}">
								<image class="" src="@/static/images/sprk.png" mode="heightFix"></image>
								<view class="zi">商品入库</view>
							</view>
							<view class="functionView guideJS4" @tap="wherego('checking')"
								:style="{backgroundColor: getColor('checking')}">
								<image class="" src="@/static/images/sppd.png" mode="heightFix"></image>
								<view class="zi">商品盘点</view>
							</view>
							<view class="functionView" @tap="wherego('getcgd')"
								:style="{backgroundColor: getColor('getcgd')}">
								<image class="" src="@/static/images/cgys.png" mode="heightFix"></image>
								<view class="zi">采购验收</view>
							</view>
							<view class="functionView" @tap="wherego('work')"
								:style="{backgroundColor: getColor('work')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">我的工作</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view style="height:100%;margin-top:10px;" scroll-y="true">
						<view class="function">
							<view class="functionView" @tap="wherego('notice')"
								:style="{backgroundColor: getColor('notice')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">公告通知</view>
							</view>
							<view class="functionView" @tap="wherego('down')"
								:style="{backgroundColor: getColor('down')}">
								<image class="" src="@/static/images/sjxz.png" mode="heightFix"></image>
								<view class="zi">数据下载</view>
							</view>
							<view class="functionView" @tap="wherego('spriceLable')"
								:style="{backgroundColor: getColor('spriceLable')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">录标价签</view>
							</view>
							<view class="functionView" @tap="wherego('picking')"
								:style="{backgroundColor: getColor('picking')}">
								<image class="" src="@/static/images/psjh.png" mode="heightFix"></image>
								<view class="zi">配送拣货</view>
							</view>
							<view class="functionView" @tap="wherego('goodsstock')"
								:style="{backgroundColor: getColor('picking')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">商品库存</view>
							</view>
							<view class="functionView" @tap="wherego('yxaddshoping')"
								:style="{backgroundColor: getColor('yxaddshoping')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">永续补货</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view style="height:100%;margin-top:10px;" scroll-y="true">
						<view class="function">
							<view class="functionView" @tap="wherego('prepay')"
								:style="{backgroundColor: getColor('prepay')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">商家预付款</view>
							</view>
							<!-- <view class="functionView" @tap="wherego('mpos')"
								:style="{backgroundColor: getColor('mpos')}" v-show="ispos">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">移动收银</view>
							</view> -->
							<view class="functionView" @tap="lct">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">永续采购</view>
							</view>
							<view class="functionView" @tap="wherego('zpdlr')"
								:style="{backgroundColor: getColor('zpdlr')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">直配单录入</view>
							</view>
							<view class="functionView" @tap="wherego('pddlr')"
								:style="{backgroundColor: getColor('pddlr')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">配调单录入</view>
							</view>
							<view class="functionView" @tap="wherego('zpdsh')">
								<!-- v-show="zpdshShow" -->
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">直配单收货</view>
							</view>
							<view class="functionView guideJS5" @tap="wherego('pddsh')">
								<!-- v-show="pddshShow" -->
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">配调单收货</view>
							</view>

						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view style="height:100%;margin-top:10px;" scroll-y="true">
						<view class="function">
							<view class="functionView" @tap="wherego('spthd')"
								:style="{backgroundColor: getColor('spthd')}">
								<image class="" src="@/static/images/spcg.png" mode="heightFix"></image>
								<view class="zi">商品退货单</view>
							</view>

						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	import {
		ckonlinefd
	} from "@/network/api.js";
	export default {
		name: "Functions",
		data() {
			return {
				ispos: uni.getStorageSync('pos'),
				current: 0,
				replist: getApp().globalData.replist,

				popupShow: false,
				list: [],
				// zpdshShow: false,
				// pddshShow: false,
			}
		},
		mounted() {
			// let datas={
			// 	"access_token": uni.getStorageSync("access_token"),
			// 	"fdbh": uni.getStorageSync("fdbh"),
			// }
			// ckonlinefd(datas).then((res) => {
			// 	// console.log("检测是否在线门店 res", res)
			// 	if(res.error_code == "success"){
			// 		this.zpdshShow=true
			// 		this.pddshShow=true
			// 	}else{
			// 		this.zpdshShow=false
			// 		this.pddshShow=false
			// 	}
			// }).catch((err) => {
			// 	console.log(err)
			// })
		},
		methods: {
			getColor(name) {
				// let myAuth = uni.getStorageSync("myAuth")
				// for (var i in this.replist) {
				// 	if (name == this.replist[i].alias) {
				// 		if (myAuth.indexOf(this.replist[i].id) <= -1) {
				// 			return "rgba(0,0,0,.1)"
				// 		} else {

				// 		}
				// 	}
				// }
			},
			wherego(name) {
				// if (name == "zpdsh" || name == "pddsh") {
					let urls = this.getUrl(name)
					uni.navigateTo({
						url: urls
					});
				// } else {
				// 	let myAuth = uni.getStorageSync("myAuth")
				// 	for (var i in this.replist) {
				// 		if (name == this.replist[i].alias) {
				// 			if (myAuth.indexOf(this.replist[i].id) <= -1) {
				// 				this.$refs.uToast.show({
				// 					type: "error",
				// 					message: "您没有该功能权限"
				// 				})
				// 			} else {
				// 				let urls = this.getUrl(name)
				// 				uni.navigateTo({
				// 					url: urls
				// 				});
				// 			}
				// 		}
				// 	}
				// }
			},
			getUrl(name) {
				let urls = ""
				if (name == "goshoping") {
					urls = "/pages/function/component/goshoping/goshoping"
				} else if (name == "addshoping") {
					urls = "/pages/function/component/addshoping/addshoping"
				} else if (name == "getstorage") {
					urls = "/pages/function/component/getstorage/getstorage"
				} else if (name == "checking") {
					urls = "/pages/function/component/checkshoping/checkshoping"
				} else if (name == "getcgd") {
					urls = "/pages/function/component/getcgd/getcgd"
				} else if (name == "work") {
					urls = "/pages/function/component/work/work"
				} else if (name == "notice") {
					urls = "/pages/function/component/notice/notice"
				} else if (name == "down") {
					urls = "/pages/function/component/download/download"
				} else if (name == "spriceLable") {
					urls = "/pages/function/component/goodspricelable/goodspricelable"
				} else if (name == "picking") {
					urls = "/pages/function/component/picking/picking"
				} else if (name == "goodsstock") {
					urls = "/pages/function/component/goodsstock/goodsstock"
				} else if (name == "yxaddshoping") {
					urls = "/pages/function/component/yxaddshoping/yxaddshoping"
				} else if (name == "prepay") {
					urls = "/pages/function/component/prepay/prepay"
				} else if (name == "mpos") {
					urls = "/pages/function/component/mpos/mpos"
				} else if (name == "zpdlr") {
					urls = "/pages/function/component/zpdlr/zpdlr"
				} else if (name == "pddlr") {
					urls = "/pages/function/component/pddlr/pddlr"
				} else if (name == "zpdsh") {
					urls = "/pages/function/component/zpdsh/zpdsh"
				} else if (name == "pddsh") {
					urls = "/pages/function/component/pddsh/pddsh"
				} else if (name == "spthd") {
					urls = "/pages/function/component/spthd/spthd"
				}
				return urls
			},
			lct() {
				uni.navigateTo({
					url: "/pages/function/component/lct/lct"
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.box-compents {
		.box-view-card {
			padding: 10px;
			background-color: #fff;
			border-radius: 20px;
		}

		.card-title {
			font-size: 17px;
		}

		.swiper {
			padding: 10px 0;
			height: 140px;

			/deep/.uni-swiper-dot {
				width: 15px;
				height: 4px;
				border-radius: 5px;
			}

			/deep/.uni-swiper-dots-horizontal {
				bottom: 0;
			}
		}

		.function {
			width: 100%;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			box-sizing: border-box;
			// padding: 0 10px 10px;

			.functionView {
				width: 33%;
				background-color: #fff;
				border-radius: 10px;
				// margin: 0 !important;
				// padding: 36px 0;
				margin-bottom: 10px;
				text-align: center;

				uni-image {
					width: 26px;
					height: 26px;
					border-radius: 0;

					img {
						width: 26px;
						height: 26px;
					}
				}

				.zi {
					font-size: 15px;
				}
			}
		}
	}
</style>
