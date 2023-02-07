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
			<view style="margin:auto;">门店到货确认</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" ref="uForm">
				<u-form-item label="商品名称:" :labelWidth="90" prop="goods" borderBottom v-show="orderData.length!=0">
					<u-input v-model="uFormModel.goods" placeholder="请输入采购商品名称" border="none" confirm-type="search"
						@confirm="searchGoods">
						<template slot="suffix">
							<uni-icons type="search" size="24" @tap="searchGoods"></uni-icons>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="门店:" :labelWidth="60" prop="fendian" borderBottom @tap="searchFd(false)">
					<u-input v-model="uFormModel.fendian" disabled disabledColor="#fff" placeholder="请选择门店"
						border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="补货类型:" :labelWidth="90" prop="bhlx" borderBottom @tap="searchBhlx">
					<u-input v-model="uFormModel.bhlx" disabled disabledColor="#fff" placeholder="请选择补货单类型"
						border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
			</u-form>

			<view>
				<view v-if="orderData.length!=0">
					<u-checkbox-group placement="column" v-model="checkValue" @change="checkboxChange">
						<view class="bhorder" v-for="(v,i) in orderData">
							<view class="dhTitle">
								<text>单据号：{{v.cgdbh}}</text>
							</view>
							<u-checkbox :name="i+'-'+v.spmc" :label="v.spmc+' '+uFormModel.fendian"></u-checkbox>
							<view class="bhorder-con">
								<view>
									<text class="ts">补货数量</text>
									<view class="cu">{{v.bhsl}}</view>
								</view>
								<view>
									<text class="ts">分拣数量</text>
									<view class="cu">{{v.sortsl}}</view>
								</view>
								<view>
									<text class="ts">收货数量</text>
									<u-input placeholder="请输入收货数量" type="number" v-model="v.shsl" color="#7ED76B"></u-input>
								</view>
								<view>
									<text class="ts">补货价格</text>
									<view class="cu lightGreen">{{v.pjjj}}</view>
								</view>
								<view>
									<text class="ts">补货金额</text>
									<view class="cu">{{v.bhje}}</view>
								</view>
								<view>
									<text class="ts">零售价格</text>
									<u-input placeholder="请输入零售价格" type="number" v-model="v.nsjg" color="#7ED76B"></u-input>
								</view>
							</view>
							<view class="bhorder-rq">
								<text class="ts">分拣日期</text>：
								<text class="cu">{{v.ztrq}}</text>
							</view>
						</view>
					</u-checkbox-group>
				</view>
				<view v-else class="notText">
					<image src="@/static/images/no.png" mode="widthFix"></image>
					<view>暂无单据信息</view>
				</view>
			</view>
			
			<view class="fix">
				<u-checkbox-group placement="column" :value="ALLvalue" @change="allChange">
					<u-checkbox name="全选" label="全选"></u-checkbox>
				</u-checkbox-group>
				<u-button type="warning" text="收货历史" throttleTime="1000" @tap="getHistory"></u-button>
				<u-button type="primary" text="一键收货" throttleTime="1000" @tap="receipt"></u-button>
			</view>
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view v-if="ifdrawer=='fendian'">
						<view class="list" v-for="(v, i) in fdData" @tap="radioChange(v.fdbh+'-'+v.fdmc)">
							<text v-html="v.fdbh">{{v.fdbh}}</text>-
							<text v-html="v.fdmc">{{v.fdmc}}</text>
						</view>
					</view>
					<view v-else-if="ifdrawer=='bhlx'">
						<view class="list" v-for="(v, i) in bhlxData" @tap="radioChange1(v.fcgdno+'-'+v.fcgname)">
							<text v-html="v.fcgdno">{{v.fcgdno}}</text>-
							<text v-html="v.fcgname">{{v.fcgname}}</text>
						</view>
					</view>
				</scroll-view>
			</uni-drawer>
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
				uFormModel: {
					goods: "",
					fendian: "",
					bhlx: "",
				},
				ifdrawer: "",
				fdData: [],
				bhlxData: [],
				orderData: [],
				//....................
				checkValue: [],
				ALLvalue: [],
			}
		},
		onLoad: function(option) {
			
		},
		onReady() {
			this.searchFd(true)
		},
		methods: {
			checkboxChange(e) {
				this.checkValue=e
				if(this.checkValue.length==this.orderData.length){
					this.ALLvalue=["全选"]
				}else{
					this.ALLvalue=[]
				}
			},
			allChange(e) {
				this.checkValue = []
				if (e.length > 0) {
					for (var i in this.orderData) {
						this.checkValue.push(`${i}-${this.orderData[i].spmc}`)
					}
				}
			},
			getHistory(){
				if(this.uFormModel.fendian){
					uni.navigateTo({
						url: `/pages/function/component/lct/mddhqr/receive?fdbh=${this.uFormModel.fendian}`
					})
				}else{
					this.$refs.uToast.show({
						type:"error",
						message: "请先选择分店"
					})
				}
			},
			receipt(){
				if(this.checkValue.length==0){
					this.$refs.uToast.show({
						type:"error",
						message: "请先选择商品"
					})
				}else{
					let upList = []
					this.checkValue.forEach((v,i,arr)=>{
						let index=v.split("-")[0]
						upList.push({
							"djh": this.orderData[index].cgdbh,
							"spbm": this.orderData[index].spbm,
							"spsmm": this.orderData[index].spsmm,
							"fdshsl": this.orderData[index].shsl,
							"nsjg": this.orderData[index].nsjg || 0,
							"shremark": ""
						})
					})
					
					var datas = JSON.stringify('FDPLSPDHYSCL${"fdbh":"' + this.uFormModel.fendian + '","userid":"' + uni.getStorageSync('userid') + '",list:' + JSON.stringify(upList) + '}')
					console.log("upList datas",datas)
					commonMain(datas).then((res) => {
						console.log("upList res",res)
						if(res.retflag == "0"){
							this.$refs.uToast.show({
								type:"success",
								message: "收货成功"
							})
							this.checkValue=[]
							this.getOrder("", this.uFormModel.fendian.split("-")[0], this.uFormModel.bhlx.split("-")[0])
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "收货失败"
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			searchGoods() {
				this.getOrder(this.uFormModel.goods, this.uFormModel.fendian.split("-")[0], this.uFormModel.bhlx.split("-")[0])
			},
			searchFd(bol) {
				var datas = JSON.stringify('GetALLFDInfo${}')
				commonMain(datas).then((res) => {
					let resl = res.list
					if (bol) {
						this.uFormModel.fendian = resl[1].fdbh + "-" + resl[1].fdmc
					} else {
						this.ifdrawer = "fendian"
						this.fdData = resl
						this.$refs.drawer.open();
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(e) {
				this.uFormModel.fendian = e
				this.$refs.drawer.close();
				if (this.uFormModel.bhlx) {
					setTimeout(() => {
						this.getOrder("", this.uFormModel.fendian.split("-")[0], this.uFormModel.bhlx.split("-")[
							0])
					}, 300)
				}
			},
			searchBhlx() {
				let userid = uni.getStorageSync("userid")
				var datas = JSON.stringify('GetCGDForeverType${"userid":"' + userid + '"}')
				commonMain(datas).then((res) => {
					let resl = res.list
					this.ifdrawer = "bhlx"
					this.bhlxData = resl
					this.$refs.drawer.open();
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange1(e) {
				this.uFormModel.bhlx = e
				this.$refs.drawer.close();
				setTimeout(() => {
					this.getOrder("", this.uFormModel.fendian.split("-")[0], this.uFormModel.bhlx.split("-")[0])
				}, 300)
			},
			getOrder(keys, fdbh, bhlx) {
				let getKeys = ""
				if (keys) {
					getKeys = keys
				}
				var datas = JSON.stringify('GetFDJHWCSPList${"fdbh":"' + fdbh + '","keys":"' + getKeys +
					'","foreverid":"' +
					bhlx + '"}')
				commonMain(datas).then((res) => {
					let resl = res.list
					// console.log("getOrder resl", resl)
					this.orderData = resl
					for (var i in resl) {
						this.getOrders(resl[i].cgdbh, fdbh, getKeys)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			getOrders(cgdbh, fdbh, getKeys) {
				var datas = JSON.stringify('GetFDJHDMx${"djh":"' + cgdbh + '","fdbh":"' + fdbh +
					'","keys":"' + getKeys + '"}')
				commonMain(datas).then((res) => {
					let resel = res.list
					for (var i in this.orderData) {
						if (cgdbh == this.orderData[i].cgdbh) {
							this.$set(this.orderData[i], "spmc", resel[0].spmc)
							this.$set(this.orderData[i], "ztrq", resel[0].ztrq)
							this.$set(this.orderData[i], "fdmc", resel[0].fdmc)
							this.$set(this.orderData[i], "spbm", resel[0].spbm)
							this.$set(this.orderData[i], "spsmm", resel[0].spsmm)
							
							this.$set(this.orderData[i], "bhsl", Number(resel[0].bhsl).toFixed(2))
							this.$set(this.orderData[i], "sortsl", Number(resel[0].sortsl).toFixed(2))
							this.$set(this.orderData[i], "shsl", resel[0].ztbz == 'Y' ? Number(resel[0].fdshsl)
								.toFixed(2) : Number(resel[0].sortsl).toFixed(2))
							this.$set(this.orderData[i], "pjjj", Number(resel[0].pjjj).toFixed(2))
							this.$set(this.orderData[i], "bhje", Number(resel[0].pjjj * resel[0].bhsl).toFixed(2))
							this.$set(this.orderData[i], "nsjg", Number(resel[0].nsjg).toFixed(2))
						}
					}
					console.log("getOrderssssss this.orderData", this.orderData)
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
		padding-bottom: 60px;
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

	.ts {
		font-size: 12px;
		font-weight: 400;
		color: #818181;
	}

	.cu {
		font-size: 15px;
		font-weight: 600;
	}

	.bhorder {
		background-color: #fff;
		margin-top: 10px;
		padding-bottom: 10px;

		.dhTitle {
			background-color: #7ED76B;
			padding: 8px 10px;
		}
		/deep/.u-checkbox{
			margin-top: 10px;
			padding: 0 10px;
		}
		.u-input{
			padding: 0 !important;
		}
		.bhorder-con {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px 10px;
		}

		.bhorder-con>uni-view {
			width: 30%;
			margin-top: 10px;
		}

		.bhorder-rq {
			padding: 0 10px;

			.cu {
				font-size: 14px;
				font-weight: 500;
			}
		}
	}
	.fix {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		box-sizing: border-box;
		padding: 10px 20px;
		position: fixed;
		left: 0;
		bottom: 0;
	
		/deep/.u-button {
			width: 30%;
			height: 30px;
			margin: 0;
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
