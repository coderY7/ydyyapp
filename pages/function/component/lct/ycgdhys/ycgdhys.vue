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
			<view style="margin:auto;">预采到货验收</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" ref="uForm">
				<u-form-item label="商品名称:" :labelWidth="80" borderBottom>
					<u-input placeholder="输入采购商品名称" v-model="uFormModel.shopname" border="none" confirm-type="search"
						@confirm="search">
						<template slot="suffix">
							<uni-icons type="search" size="24" @tap="search" v-if="iconShow"></uni-icons>
							<uni-icons type="closeempty" size="24" @tap="clear" v-else></uni-icons>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="选择补货单类型:" :labelWidth="120" borderBottom @tap="searchBhlx">
					<u-input v-model="uFormModel.bhlx" disabled disabledColor="#fff" placeholder="请选择补货类型"
						border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
			</u-form>
			<view class="danhaoZ" v-for="(v,i) in orderData">
				<view class="dhTitle">
					<text>单据号：{{v.cgdbh}}</text>
					<u-button type="primary" text="一键收货" throttleTime="1000" @tap="yjsh(v)"></u-button>
				</view>
				<view v-for="(item,index) in v.child" class="bhback">
					<view class="bhorder">
						<view class="title" @tap="goodsinfo(v.cgdbh,item.spbm,item.spsmm,item.spmc)">
							<view style="display:flex;align-items:center;">
								<view class="sectionPic"></view>
								<view class="titlecenter">
									<view class="cu">{{item.spmc}}</view>
									<view class="ts">
										<text>{{item.sjsjbh}}</text>-
										<text>{{item.sjmc}}</text>
									</view>
								</view>
							</view>
							<uni-icons type="forward" size="20"></uni-icons>
						</view>
						<view class="bhcon">
							<view>
								<text class="ts">实采数量</text>
								<view class="cu">{{item.sjcgsl}}</view>
							</view>
							<view>
								<text class="ts">实采价格</text>
								<view class="cu">{{item.sjcgjg}}</view>
							</view>
							<view>
								<text class="ts">实采皮重</text>
								<view class="cu">{{item.sjpzsl}}</view>
							</view>
							<view>
								<text class="ts">验收数量</text>
								<view class="cu">{{item.yscgsl}}</view>
							</view>
							<view>
								<text class="ts">验收价格</text>
								<view class="cu">{{item.yscgjg}}</view>
							</view>
							<view>
								<text class="ts">验收皮重</text>
								<view class="cu">{{item.yspzsl}}</view>
							</view>
						</view>
						<view class="btns">
							<u-button type="warning" text="强制验收" throttleTime="1000"
								v-if="item.ztbz=='T'&&item.yscgsl!=0"
								@tap="qzys(v.cgdbh,item.sjsjbh,item.spbm,item.spsmm,item.recordid)"></u-button>
							<u-button type="primary" text="验收录入" throttleTime="1000" v-if="item.ztbz=='T'" @tap="goYclr(v.cgdbh,item.spbm,item.spsmm,item.spmc,item.sjmc,item.sjsjbh,item.sjcgjg,item.sjcgsl,item.sjpzsl,item.recordid)"></u-button>
							<u-button type="warning" text="恢复验收" throttleTime="1000"
								v-if="item.ztbz!='T'&&item.ztbz!='C'" @tap="hfys(v.cgdbh,item.spbm,item.spsmm)"></u-button>
						</view>
					</view>
					<image src="@/static/images/yys.png" mode="widthFix" class="imgFix" v-if="item.ztbz!='T'"></image>
				</view>
			</view>
 
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="list" v-for="(v, i) in bhlxData" @tap="radioChange(v.fcgdno+'-'+v.fcgname)">
						<text v-html="v.fcgdno">{{v.fcgdno}}</text>-
						<text v-html="v.fcgname">{{v.fcgname}}</text>
					</view>
				</scroll-view>
			</uni-drawer>
			<u-toast ref="uToast"></u-toast>

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
					shopname: "",
					bhlx: ""
				},
				bhlxData: [],
				iconShow: true,
				orderData: [],
				styObj: {}
			}
		},
		onLoad: function(option) {

		},
		onReady() {

		},
		methods: {
			search() {
				this.getOrderInfo(this.uFormModel.bhlx.split("-")[0], this.uFormModel.shopname)
				if (this.uFormModel.shopname != "") {
					this.iconShow = false
				}
			},
			clear() {
				this.uFormModel.shopname = ""
				this.iconShow = true
			},
			searchBhlx() {
				let userid = uni.getStorageSync("userid")
				var datas = JSON.stringify('GetCGDForeverType${"userid":"' + userid + '"}')
				// console.log("datas",datas)
				commonMain(datas).then((res) => {
					this.bhlxData = res.list
					this.$refs.drawer.open();
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(e) {
				this.uFormModel.bhlx = e
				this.getOrderInfo(e.split("-")[0])
				this.$refs.drawer.close();
			},
			getOrderInfo(bhlx, key) {
				let keys = ""
				if (key) {
					keys = key
				} else {
					keys = ""
				}
				var datas = JSON.stringify('GetYCWCList${"foreverid":"' + bhlx + '","keys":"' + keys + '"}')
				commonMain(datas).then((res) => {
					let resl = res.list
					console.log("getOrderInfo resl", resl)
					this.orderData = []
					let dhao = []
					for (var i in resl) {
						dhao.push(resl[i].cgdbh)
						var Setdhao = new Set(dhao)
						var repeatdhao = [...Setdhao]
					}
					for (var k = 0; k < repeatdhao.length; k++) {
						this.orderData.push({
							"cgdbh": repeatdhao[k],
							"child": []
						})
						for (var j in resl) {
							if (this.orderData[k].cgdbh == resl[j].cgdbh) {
								this.orderData[k].child.push({
									"recordid": resl[j].recordid,
									"spmc": resl[j].spmc,
									"sjsjbh": resl[j].sjsjbh,
									"sjmc": resl[j].sjmc,
									"spbm": resl[j].spbm,
									"spsmm": resl[j].spsmm,
									"sjcgsl": Number(resl[j].sjcgsl).toFixed(2),
									"sjcgjg": Number(resl[j].sjcgjg).toFixed(2),
									"sjpzsl": Number(resl[j].sjpzsl).toFixed(2),
									"yscgsl": Number(resl[j].yscgsl).toFixed(2),
									"yscgjg": Number(resl[j].yscgjg).toFixed(2),
									"yspzsl": Number(resl[j].yspzsl).toFixed(2),
									"ztbz": resl[j].ztbz
								})
							}
						}
					}
					console.log("this.orderData", this.orderData)
				}).catch((err) => {
					console.log(err)
				})
			},
			// 一键收货
			yjsh(val){
				
			},
			// 分店明细
			goodsinfo(cgdbh, spbm, spsmm, spmc) {
				uni.navigateTo({
					url: `/pages/function/component/lct/ycgdhys/goodsinfo?cgdh=${cgdbh}&spbm=${spbm}&spsmm=${spsmm}&spmc=${spmc}`
				})
			},
			// 强制验收
			qzys(cgdbh, sjsjbh, spbm, spsmm, recordid) {
				let _this=this
				uni.showModal({
					content: "确定强制验收吗",
					confirmText: "确定",
					success: function(resm) {
						if (resm.confirm) {
							let userid = uni.getStorageSync("userid")
							var datas = JSON.stringify('EditYSYCSPMX${"djh":"' + cgdbh + '","spbm":"' + spbm +
								'","spsmm":"' + spsmm + '","userid":"' + userid + '","recordid":"' +
								recordid + '","yscheck":"T"}')
							
							commonMain(datas).then((res) => {
								console.log("强制验收 res",res)
								let resl = res.retflag
								if(resl==0){
									_this.$refs.uToast.show({
										type:"success",
										message: "强制验收成功"
									})
									_this.getOrderInfo(_this.uFormModel.bhlx.split("-")[0])
								}else{
									_this.$refs.uToast.show({
										type:"error",
										message: "强制验收失败"
									})
								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (resm.cancel) {

						}
					}
				});
			},
			// 验收录入
			goYclr(cgdbh,spbm,spsmm,spmc,sjmc,sjsjbh,sjcgjg,sjcgsl,sjpzsl,recordid){
				uni.navigateTo({
					url: `/pages/function/component/lct/ycgdhys/yslr?cgdbh=${cgdbh}&spbm=${spbm}&spsmm=${spsmm}&spmc=${spmc}&sjmc=${sjmc}&sjsjbh=${sjsjbh}&sjcgjg=${sjcgjg}&sjcgsl=${sjcgsl}&sjpzsl=${sjpzsl}&recordid=${recordid}`
				})
				// console.log("sssssssssss")
			},
			// 恢复验收
			hfys(cgdbh,spbm,spsmm){
				let userid = uni.getStorageSync("userid")
				var datas = JSON.stringify('CallbackYSYCGZT${"djh":"' + cgdbh + '","spbm":"' + spbm + '","spsmm":"' + spsmm + '","userid":"' + userid + '"}')
				
				commonMain(datas).then((res) => {
					let resl = res.retflag
					console.log(resl)
					if(resl==0){
						this.$refs.uToast.show({
							type:"success",
							message: "恢复验收成功"
						})
						this.getOrderInfo(this.uFormModel.bhlx.split("-")[0])
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: "恢复验收失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-content {
		padding-left: 0;
		padding-right: 0;
		padding-bottom: 20px;
	}

	/deep/.u-form {
		background-color: #fff;

		.u-form-item__body {
			padding: 10px;
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
			.shop {
				.list{
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.shopleft{
					word-break: break-all;
				}
				
				/deep/uni-button {
					min-width: 80px;
					margin-left: 10px;
					padding: 0;
				}
			}
		}
	}

	.danhaoZ {
		// box-sizing: border-box;
		margin-bottom: 10px;
	}

	.dhTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// width: 100%;
		padding: 8px 10px;
		background-color: #7ED76B;
		box-sizing: border-box;

		/deep/.u-button {
			width: 80px;
			height: 30px;
			line-height: 30px;
			padding-left: 10px;
			padding-right: 10px;
			margin: 0;
		}
	}

	.bhback {
		background-color: #fff;
		position: relative;
	}

	.bhorder {
		padding: 8px;
		box-sizing: border-box;
		border-bottom: 1px dashed #ccc;
		position: relative;
		z-index: 10;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;

			.titlecenter {
				.cu {
					font-size: 16px;
					font-weight: 600;
				}

				.ts {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}

		.ts {
			font-size: 12px;
			font-weight: 400;
			color: #818181;
		}

		.cu {
			font-size: 14px;
			font-weight: 500;
		}

		.bhcon {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 8px;
		}

		.bhcon>uni-view {
			width: 33%;
			margin-bottom: 10px;
		}

		.btns {
			display: flex;
			justify-content: flex-start;

			/deep/.u-button {
				width: 30%;
				margin: 0;
				margin-right: 10px;
			}
		}
	}

	.imgFix {
		width: 80px;
		position: absolute;
		top: 30%;
		left: 38%;
		z-index: 1;
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
