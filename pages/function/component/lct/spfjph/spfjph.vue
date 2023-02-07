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
			<view style="margin:auto;">商品分拣配货</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" ref="uForm">
				<u-form-item label="商品名称:" :labelWidth="90" prop="goods" borderBottom>
					<u-input v-model="uFormModel.goods" placeholder="请输入采购商品名称" border="none" confirm-type="search"
						@confirm="searchGoods">
						<template slot="suffix">
							<uni-icons type="search" size="24" @tap="searchGoods"></uni-icons>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="补货类型:" :labelWidth="90" prop="bhlx" borderBottom @tap="searchBhlx">
					<u-input v-model="uFormModel.bhlx" disabled disabledColor="#fff" placeholder="请选择补货单类型"
						border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
			</u-form>

			<view class="danhaoZ" v-for="(v,i) in goodsData">
				<view class="dhTitle">
					<text>单据号：{{v.cgdbh}}</text>
				</view>
				<view v-for="(item,index) in v.child"
					@tap="goGoodsInfo(v.cgdbh,item.spbm,item.spsmm,item.spmc,item.gg,item.maysortkcl)">
					<view class="bhorder">
						<view class="title">
							<view style="display:flex;align-items:center;">
								<view class="sectionPic"></view>
								<view class="cu">{{item.spmc}}</view>
							</view>
							<view class="sortztbz" v-if="item.sortztbz=='未拣货'" style="color:#F91514;">{{item.sortztbz}}
							</view>
							<view class="sortztbz" v-else-if="item.sortztbz=='已拣完'" style="color:#7BC87A;">
								{{item.sortztbz}}</view>
							<view class="sortztbz" v-else style="color:#C6A488;">{{item.sortztbz}}</view>
						</view>
						<view class="subtitle">{{item.sjsjbh}}-{{item.sjmc}}</view>
						<view class="bhcon">
							<view>
								<text class="ts">实采价格</text>
								<view class="cu">{{item.sjcgjg}}</view>
							</view>
							<view>
								<text class="ts">实采数量</text>
								<view class="cu">{{item.sjcgsl}}</view>
							</view>
							<view>
								<text class="ts">实采皮重</text>
								<view class="cu">{{item.sjpzsl}}</view>
							</view>
							<view>
								<text class="ts">采货状态</text>
								<view class="cu" v-if="item.sjcgsl<item.sumbhsl" style="color:green;">少采</view>
								<view class="cu" v-else-if="item.sjcgsl>item.sumbhsl" style="color:red;">多采</view>
								<view class="cu" v-else-if="item.sjcgsl=item.sumbhsl">-</view>
							</view>
							<view>
								<text class="ts">验收数量</text>
								<view class="cu lightGreen">{{item.yscgsl}}</view>
							</view>
							<view>
								<text class="ts">验收皮重</text>
								<view class="cu">{{item.yspzsl}}</view>
							</view>
							<view>
								<text class="ts">总要货数</text>
								<view class="cu sumbhsl">{{item.sumbhsl}}</view>
							</view>
							<view>
								<text class="ts">已要货数</text>
								<view class="cu lightGreen">{{item.sumsortzkcsl}}</view>
							</view>
							<view>
								<text class="ts">可要货数</text>
								<view class="cu">{{item.sumksortsl}}</view>
							</view>
						</view>
					</view>
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
				uFormModel: {
					goods: "",
					bhlx: "",
				},
				bhlxData: [],
				goodsData: []
			}
		},
		onLoad: function(option) {

		},
		onShow() {
			let _this=this
			uni.addInterceptor("navigateBack", {
				complete(res) {
					_this.getGoods()
					uni.removeInterceptor("navigateBack")
				}
			})
		},
		methods: {
			searchBhlx() {
				let userid = uni.getStorageSync("userid")
				var datas = JSON.stringify('GetCGDForeverType${"userid":"' + userid + '"}')
				
				commonMain(datas).then((res) => {
					let resl = res.list
					console.log("bhlx resl", resl)
					this.bhlxData = resl
					this.$refs.drawer.open();
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(e) {
				this.uFormModel.bhlx = e
				this.$refs.drawer.close();
				setTimeout(() => {
					this.getGoods()
				}, 300)
			},
			getGoods(keys) {
				let getKeys = ""
				if (keys) {
					getKeys = keys
				}
				let foreverid = this.uFormModel.bhlx.split("-")[0]
				let datas = JSON.stringify('GetYYSSPList${"keys":"' + getKeys + '","foreverid":"' + foreverid + '"}')
				
				commonMain(datas).then((res) => {
					let resl = res.list
					this.goodsData = []
					let dhao = []
					for (var i in resl) {
						dhao.push(resl[i].cgdbh)
						var Setdhao = new Set(dhao)
						var repeatdhao = [...Setdhao]
					}
					for (var k = 0; k < repeatdhao.length; k++) {
						this.goodsData.push({
							"cgdbh": repeatdhao[k],
							"child": []
						})
						for (var j in resl) {
							if (this.goodsData[k].cgdbh == resl[j].cgdbh) {
								this.goodsData[k].child.push({
									"sjsjbh": resl[j].sjsjbh,
									"spmc": resl[j].spmc,
									"spbm": resl[j].spbm,
									"spsmm": resl[j].spsmm,
									"gg": resl[j].gg,
									"sortztbz": resl[j].sortztbz,
									"sjmc": resl[j].sjmc,
									"sjcgjg": Number(resl[j].sjcgjg).toFixed(2),
									"sjcgsl": Number(resl[j].sjcgsl).toFixed(2),
									"sjpzsl": Number(resl[j].sjpzsl).toFixed(2),
									"yscgsl": Number(resl[j].yscgsl).toFixed(2),
									"yspzsl": Number(resl[j].yspzsl).toFixed(2),
									"sumbhsl": Number(resl[j].sumbhsl).toFixed(2),
									"sumsortzkcsl": Number(resl[j].sumsortzkcsl).toFixed(2),
									"sumksortsl": Number(resl[j].sumksortsl).toFixed(2),
									"ztbz": resl[j].ztbz
								})
							}
						}
					}
					console.log("this.goodsData", this.goodsData)
				}).catch((err) => {
					console.log(err)
				})
			},
			searchGoods() {
				this.getGoods(this.uFormModel.goods)
			},
			goGoodsInfo(cgdbh, spbm, spsmm, spmc, gg, maysortkcl) {
				uni.navigateTo({
					url: `/pages/function/component/lct/spfjph/detail?cgdbh=${cgdbh}&spbm=${spbm}&spsmm=${spsmm}&spmc=${spmc}&gg=${gg}&maysortkcl=${maysortkcl}`
				})
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

	/deep/.u-form {
		padding: 0 10px;
		background-color: #fff;
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
		margin-bottom: 10px;
		background-color: #fff;
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

	.bhorder {
		padding: 8px;
		box-sizing: border-box;
		border-bottom: 1px dashed #ccc;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 5px;
		}

		.subtitle {
			font-size: 12px;
			font-weight: 400;
			color: #74C4EB;
			margin-bottom: 10px;
		}

		.sortztbz {
			font-size: 16px;
			font-weight: 600;
		}

		.ts {
			font-size: 12px;
			font-weight: 400;
			color: #818181;
		}

		.cu {
			font-size: 16px;
			font-weight: 600;
			color: #353535;
		}

		.sumbhsl {
			color: #F7AD5D;
		}

		.lightGreen {
			color: #83C486;
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
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
