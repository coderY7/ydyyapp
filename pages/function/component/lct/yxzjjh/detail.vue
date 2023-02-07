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
			<view style="margin:auto;">{{spmc}}</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="实采价格:" :labelWidth="90" prop="pjjj" borderBottom>
					<u-input v-model="uFormModel.pjjj" type="number" placeholder="请输入实采价格" border="none"></u-input>
				</u-form-item>
				<u-form-item label="库存总量:" :labelWidth="90" prop="spkcl" borderBottom>
					<u-input placeholder="请输入库存总量" type="number" disabled disabledColor="#e1e1e1"
						v-model="uFormModel.spkcl" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="实际皮重:" :labelWidth="90" prop="sjpz" borderBottom>
					<u-input v-model="uFormModel.sjpz" type="number" placeholder="请输入实际皮重" border="none"></u-input>
				</u-form-item>
				<u-form-item label="补货类型:" :labelWidth="90" prop="bhlx" borderBottom @tap="getbhlx">
					<u-input placeholder="请选择补货类型" disabled disabledColor="#fff" v-model="uFormModel.bhlx"
						border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="总分拣量:" :labelWidth="90" prop="zfjl" borderBottom>
					<u-input v-model="uFormModel.zfjl" type="number" placeholder="请输入总分拣量" border="none"></u-input>
				</u-form-item>
			</u-form>
			<view v-if="fdvalue.length!=0">
				<view class="title">
					<text>分拣门店</text>
					<text>剩余分配数量:<text style="color:#ff0000;">{{syfpsl}}</text></text>
				</view>
				<view class="title" v-for="(v,i) in fdvalue">
					<view>{{v.fdname}}</view>
					<u-input placeholder="请选择补货类型" type="number" v-model="v.fdvalue"></u-input>
				</view>
			</view>
			<u-button type="primary" text="确定分拣" throttleTime="1000" @tap="upshops"></u-button>

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
					pjjj: "",
					spkcl: "",
					sjpz: "",
					bhlx: "",
					zfjl: "0"
				},
				uFormRules: {
					"pjjj": {
						type: "string",
						required: true,
						message: "请填写实采价格",
						trigger: ["blur", "change"]
					},
					"bhlx": {
						type: "string",
						required: true,
						message: "请选择补货类型",
						trigger: ["blur", "change"]
					},
					"zfjl": {
						type: "string",
						required: true,
						message: "请填写总分拣量",
						trigger: ["blur", "change"]
					}
				},
				syfpsl: 0,
				spmc: "",
				spbm:"",
				spsmm:"",
				fdvalue: [],
				bhlxData: []
			}
		},
		onLoad: function(option) {
			console.log("option", option)
			this.uFormModel.pjjj = option.pjjj
			this.uFormModel.spkcl = option.spkcl
			this.spmc = option.spmc
			this.spbm=option.spbm
			this.spsmm=option.spsmm
			// this.fdbh=option.fdvalue
			this.fdvalue = []
			for (var i = 0; i < option.fdvalue.split(",").length; i++) {
				this.fdvalue.push({
					"fdname": option.fdvalue.split(",")[i],
					"fdvalue": 0
				})
			}
		},
		onReady() {

		},
		methods: {
			getbhlx() {
				let userid = uni.getStorageSync("userid")
				var datas = JSON.stringify('GetCGDForeverType${"userid":"' + userid + '"}')
				
				commonMain(datas).then((res) => {
					let resl = res.list
					console.log("getbhlx resl", resl)
					this.bhlxData = resl
					this.$refs.drawer.open();
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(e) {
				this.uFormModel.bhlx = e
				setTimeout(() => {
					this.$refs.drawer.close();
				}, 100)
			},
			upshops() {
				this.$refs.uForm.validate().then(resd => {
					let num = 0
					let fdlist=""
					for (var i in this.fdvalue) {
						num += Number(this.fdvalue[i].fdvalue)
						fdlist+=this.fdvalue[i].fdname.split("-")[0]
						if (i == this.fdvalue.length - 1) {
							if (num > this.uFormModel.zfjl) {
								this.$refs.uToast.show({
									type:"error",
									message: "分配数量不能大于总分拣量"
								})
								return
							}
						}else{
							fdlist+=","
						}
					}
					let bhlx=this.uFormModel.bhlx.split("-")[0]
					let userid=uni.getStorageSync("userid")
					
					var datas = JSON.stringify(
						'InputForeverBHToCGD${"spbm":"' + this.spbm +'","spsmm":"' +this.spsmm +'","fdbh":"' + fdlist +'","bhsl":"' +num +
						'","foreverid":"' +this.uFormModel.bhlx +'","sjcgjg":' +this.uFormModel.pjjj +',"sjpzsl":' +this.uFormModel.sjpz +',"sjcgsl":' +this.uFormModel.spkcl +',"userid":"' +userid +'","remark":"","sumfjsl":' +this.uFormModel.zfjl +'}')
					console.log("cccccc",datas)
					
					commonMain(datas).then((res) => {
						if(res.retflag==0){
							this.$refs.uToast.show({
								type:"success",
								message: res.retmsg
							})
						}else if(res.retflag==1){
							this.$refs.uToast.show({
								type:"error",
								message: res.retmsg
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				})
			}
		},
		watch: {
			'uFormModel.zfjl': function(newv, oldv) {
				this.syfpsl = newv
			},
			fdvalue: {
				handler(newv, oldv) {
					let sum = 0
					var total=this.uFormModel.zfjl
					for (var i in newv) {
						sum += Number(newv[i].fdvalue)
						if (i == newv.length - 1) {
							if (sum > this.uFormModel.zfjl) {
								this.$refs.uToast.show({
									type:"error",
									message: "分配数量不能大于总分拣量"
								})
							}
						}
						if (Boolean(newv[i].fdvalue)) {
							total-=newv[i].fdvalue
							this.syfpsl = total
						} else {
							
						}
					}
				},
				deep: true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.title {
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		margin-top: 10px;
	}

	.title>* {
		width: 48%;

	}
	/deep/uni-button {
		margin-top: 10px;
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
					margin: 0;
					margin-left: 10px;
					padding: 0;
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
