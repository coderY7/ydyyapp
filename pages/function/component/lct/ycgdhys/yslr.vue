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
			<view style="display:flex;margin-top: 18px;">
				<view class="sectionPic"></view>
				<text class="ts">预采商家</text>
			</view>
			<view class="ts">{{sjsjbh}}-{{sjmc}}</view>
			<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="验收数量:" :labelWidth="90" prop="yssl" borderBottom>
					<u-input v-model="uFormModel.yssl" placeholder="请输入验收数量" border="none"></u-input>
					<text slot="right">kg</text>
				</u-form-item>
				<u-form-item label="验收箱件:" :labelWidth="90" prop="ysslxj" borderBottom>
					<u-input v-model="uFormModel.ysslxj" placeholder="请输入验收箱件" border="none"></u-input>
					<text slot="right">箱/件</text>
				</u-form-item>
				<u-form-item label="单价:" :labelWidth="90" prop="danjia" borderBottom class="disable">
					<u-input v-model="uFormModel.danjia" disabled disabledColor="#e1e1e1" placeholder="请输入单价"
						border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="总金额:" :labelWidth="90" prop="total" borderBottom class="disable">
					<u-input v-model="uFormModel.total" disabled disabledColor="#e1e1e1" placeholder="请输入总金额"
						border="none"></u-input>
				</u-form-item>
				<u-form-item label="验收价格:" :labelWidth="90" prop="ysjg" borderBottom class="disable">
					<u-input v-model="uFormModel.ysjg" disabled disabledColor="#e1e1e1" placeholder="请输入总金额"
						border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="验收皮重:" :labelWidth="90" prop="yspz" borderBottom>
					<u-input v-model="uFormModel.yspz" placeholder="请输入验收皮重" border="none"></u-input>
				</u-form-item>
				<u-form-item label="采购验收备注:" :labelWidth="130" prop="remark" borderBottom>
					<u-input v-model="uFormModel.remark" placeholder="请输入采购验收备注" border="none"></u-input>
				</u-form-item>
				<u-form-item label="是否强制完成采购:" :labelWidth="150" prop="qiangzhi" borderBottom>
					<u-radio-group v-model="uFormModel.qiangzhi" @change="radioChange">
						<u-radio name="T" label="是"></u-radio>
						<u-radio name="F" label="否"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="是否退回包装箱:" :labelWidth="150" prop="tuihui" borderBottom>
					<u-radio-group v-model="uFormModel.tuihui" @change="radioChange1">
						<u-radio name="T" label="退回"></u-radio>
						<u-radio name="F" label="不退回"></u-radio>
					</u-radio-group>
				</u-form-item>
				<view v-if="xiangShow" class="xiangbox">
					<view style="display:flex;">
						<view class="sectionPic"></view>
						<text class="ts">类型选择</text>
					</view>
					<view class="xiang" v-for="(v,i) in boxinfo">
						<text>{{v.boxname}}</text>
						<text>￥{{v.boxprice}}</text>
						<u-number-box v-model="v.num" :min="0"></u-number-box>
					</view>
				</view>

				<u-button type="primary" text="验收录入" throttleTime="1000" style="margin-top:10px;" @tap="up"></u-button>
			</u-form>
			
			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import {

	} from "@/network/api.js";
	export default {
		data() {
			return {
				spmc: "",
				sjmc: "",
				sjsjbh: "",
				uFormModel: {
					"yssl": "",
					"ysslxj": "",
					"danjia": "",
					"total": "",
					"ysjg": "",
					"yspz": "",
					"remark": "",
					"qiangzhi": "F",
					"tuihui": "F",
					"cgdbh": "",
					"spbm": "",
					"spsmm": "",
					"recordid": ""
				},
				uFormRules: {
					"yssl": {
						type: "string",
						required: true,
						message: "请输入验收数量",
						trigger: ["blur", "change"]
					},
					// "ysslxj": {
					// 	type: "string",
					// 	required: true,
					// 	message: "请输入验收箱件",
					// 	trigger: ["blur", "change"]
					// },
					"yspz": {
						type: "string",
						required: true,
						message: "请输入验收皮重",
						trigger: ["blur", "change"]
					},
				},
				xiangShow: false,
				xiao: 0,
				zhong: 0,
				da: 0,
				boxinfo: []
			}
		},
		onLoad: function(option) {
			this.uFormModel.cgdbh = option.cgdbh
			this.uFormModel.spbm = option.spbm
			this.uFormModel.spsmm = option.spsmm
			this.uFormModel.recordid = option.recordid
			this.spmc = option.spmc
			this.sjmc = option.sjmc
			this.sjsjbh = option.sjsjbh
			this.uFormModel.danjia = option.sjcgjg
			this.uFormModel.ysjg = option.sjcgjg
			this.uFormModel.yssl = option.sjcgsl
			this.uFormModel.total = Number(option.sjcgjg) * Number(option.sjcgsl)
			this.uFormModel.yspz = option.sjpzsl


		},
		onReady() {

		},
		methods: {
			up() {
				let boxlist = []
				if(this.uFormModel.tuihui=="T"){
					for (var i in this.boxinfo) {
						boxlist.push({
							"boxid": this.boxinfo[i].boxid,
							"boxprice": this.boxinfo[i].boxprice,
							"boxnum": this.boxinfo[i].num
						})
					}
				}
				this.$refs.uForm.validate().then(ress => {
					let userid = uni.getStorageSync("userid")
					var datas = JSON.stringify('YSYCSPMX${"djh":"' + this.uFormModel.cgdbh +
						'","spbm":"' + this.uFormModel.spbm + '","spsmm":"' +
						this.uFormModel.spsmm +
						'","yspzsl":"' + this.uFormModel.yspz +
						'","yscgsl":"' + this.uFormModel.yssl + '","yscgjg":"' + this.uFormModel.ysjg +
						'","yssjbh":"' + this.sjsjbh +
						'","userid":"' + userid + '","ysremark":"' + this.uFormModel.remark +
						'","recordid":"' + this.uFormModel.recordid + '","yscheck":"' +
						this.uFormModel.qiangzhi + '",boxlist:' + JSON.stringify(boxlist) + '}')

					console.log("datas", datas)
					commonMain(datas).then((res) => {
						let resl = res.retflag
						console.log("录入 res",res)
						if(resl==0){
							this.$refs.uToast.show({
								type:"success",
								message: "录入成功"
							})
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "录入失败"
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				})
			},
			getbox() {
				var datas = JSON.stringify('GetForeverBoxInfo${}')
				commonMain(datas).then((res) => {
					this.boxinfo = res.list
					this.xiangShow = true
					for (var i in this.boxinfo) {
						this.boxinfo[i].boxprice = Number(this.boxinfo[i].boxprice).toFixed(2)
						this.boxinfo[i].num = 0
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(e) {
				this.uFormModel.qiangzhi = e
			},
			radioChange1(e) {
				this.uFormModel.tuihui = e
				if (e == "退回") {
					this.getbox()
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.ts {
		font-size: 14px;
		color: #818181;
	}

	/deep/.u-form {
		.disable {
			.u-form-item__body__left {
				background-color: #e1e1e1;
			}

			.u-input {
				border-radius: 0;
			}
		}

	}

	.xiangbox {
		margin-top: 10px;

		.xiang {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 5px;
			padding: 5px;
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
