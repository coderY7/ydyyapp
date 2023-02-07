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
			<view style="margin:auto;">{{cgdh}}</view>
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
			</u-form>

			<view class="top">
				<view>
					<text class="ts">商品品种</text>
					<view class="cu">{{topData.pinzong}}</view>
				</view>
				<view>
					<text class="ts">预采总数</text>
					<view class="cu">{{topData.zongshu}}</view>
				</view>
				<view>
					<text class="ts">预采总额</text>
					<view class="cu">{{topData.zonge}}</view>
				</view>
				<view>
					<text class="ts">总库存量</text>
					<view class="cu">{{topData.zongcun}}</view>
				</view>
			</view>
			<view class="bhorder" v-for="(v,i) in infoData">
				<view class="title" @tap="goodsinfo(v.spbm,v.spsmm,v.spmc)">
					<view style="display: flex;">
						<view class="sectionPic"></view>
						<view class="cu">
							<text style="margin-right:8px;">{{v.spmc}}</text>
							<text>{{v.gg}}</text>
						</view>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="bhcon">
					<view>
						<text class="ts">预采数量</text>
						<view class="cu">{{v.jycgsl}}</view>
					</view>
					<view>
						<text class="ts">预采价格</text>
						<view class="cu">{{v.jycgjg}}</view>
					</view>
					<view>
						<text class="ts">当前存量</text>
						<view class="cu">{{v.dqkcl}}</view>
					</view>
					<view>
						<text class="ts">实采数量</text>
						<view class="cu">{{v.sjcgzl}}</view>
					</view>
					<view>
						<text class="ts">实采价格</text>
						<view class="cu">{{v.sjcgje}}</view>
					</view>
					<view>
						<text class="ts">实采皮重</text>
						<view class="cu">{{v.sjpzzl}}</view>
					</view>
				</view>
				<view class="btns">
					<u-button type="warning" text="恢复预采" throttleTime="1000"
						v-if="v.ztbz!='T'&&v.ztbz!='Y'&&v.ztbz!='C'" @tap="hfyc(v.cgdbh,v.spbm,v.spsmm)">
					</u-button>
					<u-button type="warning" text="采货完成" throttleTime="1000" v-if="v.ztbz=='T'"
						@tap="chwc(v.cgdbh,v.jysjbh,v.spbm,v.spsmm,v.recordid)"></u-button>

					<u-button type="warning" text="已采清单" throttleTime="1000" v-if="v.ztbz=='T'&&v.sjcgzl>0" @tap="ycqd(v.cgdbh,v.spbm,v.spsmm,v.spmc)"></u-button>
					<u-button type="primary" text="已采清单" throttleTime="1000"
						v-if="v.ztbz!='T'&&v.ztbz!='Y'&&v.ztbz!='C'" @tap="ycqd(v.cgdbh,v.spbm,v.spsmm,v.spmc)"></u-button>
					<u-button type="primary" text="实采录入" throttleTime="1000" v-if="v.ztbz=='T'" @tap="sclr(v.cgdbh,v.spbm,v.spsmm,v.spmc,v.jysjbh,v.jycgjg,v.jycgsl)"></u-button>
				</view>
			</view>
			
			<u-toast ref="uToast"></u-toast>
			
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
				cgdh: "",
				uFormModel: {
					shopname: ""
				},
				iconShow: true,
				topData: {},
				infoData: []
			}
		},
		onLoad: function(option) {
			this.cgdh = option.cgdh
			this.getOrderInfo(option.cgdh)
		},
		onReady() {

		},
		methods: {
			search() {
				this.getOrderInfo(this.cgdh, this.uFormModel.shopname)
				if (this.uFormModel.shopname != "") {
					this.iconShow = false
				}
			},
			clear() {
				this.uFormModel.shopname = ""
				this.iconShow = true
			},
			getOrderInfo(djh, key) {
				let keys = ""
				if (key) {
					keys = key
				} else {
					keys = ""
				}
				var datas = JSON.stringify('GetDYCList${"djh":"' + djh + '","keys":"' + keys + '"}')
				commonMain(datas).then((res) => {
					console.log("getOrderInfo res", res)
					this.topData.pinzong = res.list.length
					this.topData.zongshu = 0
					this.topData.zonge = 0
					this.topData.zongcun = 0
					this.infoData = res.list
					for (var i in this.infoData) {
						this.topData.zongshu += Number(this.infoData[i].jycgsl)
						this.topData.zonge += Number(this.infoData[i].jycgsl) * Number(this.infoData[i]
							.jycgjg)
						this.topData.zongcun += Number(this.infoData[i].dqkcl)
						//。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
						this.infoData[i].jycgsl = Number(this.infoData[i].jycgsl).toFixed(2)
						this.infoData[i].jycgjg = Number(this.infoData[i].jycgjg).toFixed(2)
						this.infoData[i].dqkcl = Number(this.infoData[i].dqkcl).toFixed(2)
						this.infoData[i].sjcgzl = Number(this.infoData[i].sjcgzl).toFixed(2)
						this.infoData[i].sjcgje = Number(this.infoData[i].sjcgje).toFixed(2)
						this.infoData[i].sjpzzl = Number(this.infoData[i].sjpzzl).toFixed(2)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			goodsinfo(spbm, spsmm, spmc) {
				uni.navigateTo({
					url: `/pages/function/component/lct/spycg/goodsinfo?cgdh=${this.cgdh}&spbm=${spbm}&spsmm=${spsmm}&spmc=${spmc}`
				})
			},
			// 采货完成
			chwc(cgdbh, jysjbh, spbm, spsmm, recordid) {
				let _this=this
				uni.showModal({
					content: "确定强制采货吗?",
					confirmText: "确定",
					success: function(resm) {
						if (resm.confirm) {
							let userid = uni.getStorageSync("userid")
							var datas = JSON.stringify('EditCGDmxForever${"djh":"' + cgdbh + '","spbm":"' + spbm +
								'","spsmm":"' + spsmm + '","recordid":"' + recordid +
								'","userid":"' + userid + '","cgcheck":"T","sjsjbh":"' + jysjbh + '"}')
							
							commonMain(datas).then((res) => {
								console.log("采货完成 res", res)
								if(res.retflag==0){
									_this.getOrderInfo(cgdbh)
								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (resm.cancel) {
							
						}
					}
				});
			},
			// 恢复预采
			hfyc(cgdbh, spbm, spsmm) {
				let userid = uni.getStorageSync("userid")
				var datas = JSON.stringify('CallbackYCGZT${"djh":"' + cgdbh + '","spbm":"' + spbm + '","spsmm":"' + spsmm + '","userid":"' + userid + '"}')
				commonMain(datas).then((res) => {
					console.log("恢复预采 res", res)
					if(res.retflag==0){
						this.$refs.uToast.show({
							type:"success",
							message: "恢复预采成功"
						})
						this.getOrderInfo(cgdbh)
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: "恢复预采失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 实采录入
			sclr(cgdbh,spbm,spsmm,spmc,jysjbh,jycgjg,jycgsl){
				// console.log("xx",cgdbh,spbm,spsmm,spmc,jysjbh,jycgjg,jycgsl)
				uni.navigateTo({
					url: `/pages/function/component/lct/spycg/sclr?cgdbh=${cgdbh}&spbm=${spbm}&spsmm=${spsmm}&spmc=${spmc}&jysjbh=${jysjbh}&jycgjg=${jycgjg}&jycgsl=${jycgsl}`
				})
			},
			// 已采清单
			ycqd(cgdbh,spbm,spsmm,spmc){
				// console.log("xxx",cgdbh,spbm,spsmm,spmc)
				uni.navigateTo({
					url: `/pages/function/component/lct/spycg/ycqd?cgdbh=${cgdbh}&spbm=${spbm}&spsmm=${spsmm}&spmc=${spmc}`
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

	.ts {
		font-size: 12px;
		font-weight: 400;
		color: #818181;
	}

	.cu {
		font-size: 16px;
		font-weight: 500;
		color: #000;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 8px;
		margin-bottom: 10px;
		background-color: #fff;
		text-align: center;

		.ts {
			margin-bottom: 8px;
		}
	}

	.top>uni-view {
		width: 20%;
	}

	.bhorder {
		padding: 8px;
		margin-bottom: 10px;
		background-color: #fff;
		box-sizing: border-box;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;
		}

		.bhcon {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 8px;

			.cu {
				font-size: 14px;
				font-weight: 400;
				color: #000;
			}
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
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
