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
			<view style="margin:auto;">{{option.spmc}} {{option.gg}}</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-checkbox-group placement="column" v-model="fdCheckValue" @change="checkboxChange">
				<view class="order" v-for="(v,i) in orderData">
					<view class="title">
						<u-checkbox  :name="v.fdbh+'-'+v.fdmc" :label="v.fdbh+'-'+v.fdmc" v-if="v.ztbz!='Y'&&v.ztbz!='C'&&v.ztbz!='S'"></u-checkbox>
						<view v-else>{{v.fdbh}}-{{v.fdmc}}</view>
						
						<text v-if="v.ztbz=='O'" style="color:#7BC87A;">已分拣</text>
						<text v-else-if="v.ztbz=='Y'||v.ztbz=='C'" style="color:#C6A488;">已验收</text>
						<text v-else-if="v.ztbz=='S'" style="color:#F69F45;">已分拣装车</text>
						<text v-else-if="v.ztbz=='T'" style="color:#C6A488;">待分拣</text>
					</view>
					<view class="con">
						<view>
							<view class="ts">补货数量</view>
							<text class="cu bhsl">{{v.bhsl}}</text>
						</view>
						<view>
							<view class="ts">分拣数量</view>
							<text class="cu lightGreen" v-if="v.ztbz=='Y'||v.ztbz=='C'||v.ztbz=='S'">
								<text v-if="v.ztbz=='S'">{{v.sortsl}}</text>
							</text>
							<u-input placeholder="搜索分店" type="number" color="#7AC67A" v-else v-model="v.bhsl"></u-input>
						</view>
						<view>
							<view class="ts">存货数量</view>
							<text class="cu">{{v.sortkcsl}}</text>
						</view>
						<view>
							<view class="ts">皮重单价</view>
							<text class="cu">{{v.pzprice}}</text>
						</view>
						<view>
							<view class="ts">分拣皮重</view>
							<text class="cu lightGreen" v-if="v.ztbz=='Y'||v.ztbz=='C'||v.ztbz=='S'">
								<text v-if="v.ztbz=='S'">{{v.sortpz}}</text>
							</text>
							<u-input placeholder="搜索分店" type="number" color="#7AC67A" v-else v-model="v.sortsl?v.sortsl*v.pzprice:v.bhsl*v.pzprice"></u-input>
						</view>
					</view>
					<view class="remark">
						<view class="ts">要货备注</view>
						<text class="cu">{{v.spremark}}</text>
					</view>
					<view class="btns">
						<u-button type="primary" text="恢复配货" throttleTime="1000" v-if="v.ztbz=='S'" @tap="hfph(v.fdbh)"></u-button>
					</view>
				</view>
			</u-checkbox-group>

			<view class="fix">
				<u-checkbox-group placement="column" :value="ALLfdvalue" @change="allChange">
					<u-checkbox name="全选" label="全选"></u-checkbox>
				</u-checkbox-group>
				<u-button type="primary" text="确认装车" throttleTime="1000" @tap="createOrder"></u-button>
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
				option: "",
				orderData: [],
				fdCheckValue: [],
				ALLfdvalue: [],
			}
		},
		onLoad: function(option) {
			this.option = option
			console.log("option", option)
			this.getOrderInfo(option)
		},
		onReady() {

		},
		methods: {
			checkboxChange(e) {
				this.fdCheckValue=e
				if(this.fdCheckValue.length==this.orderData.length){
					this.ALLfdvalue=["全选"]
				}else{
					this.ALLfdvalue=[]
				}
			},
			allChange(e) {
				this.fdCheckValue = []
				if (e.length > 0) {
					for (var i in this.orderData) {
						this.fdCheckValue.push(`${this.orderData[i].fdbh}-${this.orderData[i].fdmc}`)
					}
				}
			},
			getOrderInfo(option) {
				var datas = JSON.stringify('GetFDBHSPList${"djh":"' + option.cgdbh +
					'","spbm":"' + option.spbm + '","spsmm":"' + option.spsmm + '"}')
				
				commonMain(datas).then((res) => {
					let resl = res.list
					this.orderData = resl
					console.log("this.orderData", this.orderData)
					for(var i in this.orderData){
						this.orderData[i].bhsl=Number(this.orderData[i].bhsl).toFixed(2)
						this.orderData[i].sortsl=Number(this.orderData[i].sortsl).toFixed(2)
						this.orderData[i].sortkcsl=Number(this.orderData[i].sortkcsl).toFixed(2)
						this.orderData[i].pzprice=Number(this.orderData[i].pzprice).toFixed(2)
						this.orderData[i].sortpz=Number(this.orderData[i].sortpz).toFixed(2)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 恢复配货
			hfph(fdbh){
				var datas = JSON.stringify('CallBackCarCheckout${"djh":"' + this.cgdbh + '","spbm":"' + this.spbm + '","spsmm":"' + this.spsmm +
					'","fdbh":"' + fdbh + '","ztbz":"T"}')
				
				commonMain(datas).then((res) => {
					let resl = res.list
					console.log("恢复配货 resl", resl)
					this.getOrderInfo(this.option)
				}).catch((err) => {
					console.log(err)
				})
			},
			// 确认装车
			createOrder(){
				let list=[]
				let sortpzsl=""
				let userid=uni.getStorageSync("userid")
				let sortsl=""
				for(var i in this.orderData){
					for(var j=0;j<this.fdCheckValue.length;j++){
						if(this.orderData[i].fdbh==this.fdCheckValue[j].split("-")[0]){
							if(this.orderData[i].ztbz=='S'){
								sortpzsl=this.orderData[i].sortpz
								sortsl=this.orderData[i].sortsl
							}else{
								sortsl=this.orderData[i].bhsl
								if(this.orderData[i].sortpz){
									sortpzsl=this.orderData[i].sortsl*this.orderData[i].pzprice
								}else{
									sortpzsl=this.orderData[i].bhsl*this.orderData[i].pzprice
								}
							}
							list.push({
								"sortkcsl": this.orderData[i].sortkcsl,
								"sortsl": sortsl,
								"fdbh": this.orderData[i].fdbh,
								"sortpzsl": sortpzsl,
							})
						}
					}
				}
				var datas = JSON.stringify('FDSPUNIONPLJHFP${"djh":"' + this.option.cgdbh + '","spbm":"' + this.option.spbm + '","spsmm":"' + this.option.spsmm +
					'","userid":"' + userid + '","list":"'+ JSON.stringify(list) +'"}')
				commonMain(datas).then((res) => {
					console.log("确认装车 res", res)
					if(res.retflag==0){
						this.$refs.uToast.show({
							type:"success",
							message: "装车成功"
						})
						this.getOrderInfo(this.option)
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: "装车失败"
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
		padding-bottom: 70px;
	}

	.order {
		background-color: #fff;
		padding: 10px;
		margin-bottom: 10px;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;

			uni-text {
				font-size: 16px;
				font-weight: 600;
			}
		}

		.con {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			/deep/.u-input{
				font-size: 16px;
				font-weight: 600;
			}
		}

		.con>uni-view {
			width: 30%;
			margin-bottom: 10px;
		}

		.bhsl {
			color: #C6A488 !important;
		}

		.lightGreen {
			color: #7AC67A !important;
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

		.remark {
			.cu {
				font-size: 14px;
				font-weight: 400;
			}

			margin-bottom: 8px;
		}

		.btns {
			display: flex;
			justify-content: flex-end;

			/deep/.u-button {
				width: 30%;
				margin: 0;
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
			margin: 0;
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
