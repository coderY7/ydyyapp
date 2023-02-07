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
			<view class="ts">{{jysjbh}}.{{uFormModel.scsj}}</view>
			<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="实采数量:" :labelWidth="90" prop="scsl" borderBottom>
					<u-input v-model="uFormModel.scsl" placeholder="请输入实采数量" border="none"></u-input>
					<text slot="right">kg</text>
				</u-form-item>
				<u-form-item label="实采箱件:" :labelWidth="90" borderBottom>
					<u-input v-model="uFormModel.scslxj" placeholder="请输入实采箱件" border="none"></u-input>
					<text slot="right">箱/件</text>
				</u-form-item>
				<u-form-item label="实采价格:" :labelWidth="90" prop="scjg" borderBottom>
					<u-input v-model="uFormModel.scjg" placeholder="请输入实采价格" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="实采皮重:" :labelWidth="90" borderBottom>
					<u-input v-model="uFormModel.scpz" placeholder="请输入实采皮重" border="none"></u-input>
				</u-form-item>
				<u-form-item label="实采商家:" :labelWidth="90" prop="scsj" borderBottom @tap="shops(uFormModel.scsj)">
					<u-input v-model="uFormModel.scsj" disabled disabledColor="#fff" placeholder="请输入实采商家"
						border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="是否强制完成采购:" :labelWidth="150" borderBottom>
					<u-radio-group v-model="uFormModel.qiangzhi" @change="radioChange">
						<u-radio name="T" label="是"></u-radio>
						<u-radio name="F" label="否"></u-radio>
					</u-radio-group>
				</u-form-item>

				<u-button type="primary" text="实采录入" throttleTime="1000" style="margin-top:10px;" @tap="up"></u-button>
			</u-form>

			<!-- 弹出层 -->
			<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupclose">
				<view class="popsearch">
					<u-input prefixIcon="search" placeholder="请输入内容" v-model="searchText" confirm-type="search"
						@confirm="shops('false')">
					</u-input>
					<u-button type="primary" text="搜索" throttleTime="1000" @tap="shops('false')"></u-button>
				</view>
				<view class="popuplist">
					<scroll-view style="height: 100%;" :scroll-y="true" :show-scrollbar="true">
						<view v-for="(v,i) in shopsList" class="popuplists" @tap="shopok(v.sjbh,v.sjmc)">
							{{v.sjbh}}.{{v.sjmc}}
						</view>
					</scroll-view>
				</view>
			</u-popup>
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
				spmc: "",
				jysjbh: "",
				uFormModel: {
					"scsl": "",
					"scslxj": "",
					"scjg": "",
					"scpz": "0",
					"scsj": "",
					"qiangzhi": "F",

					"cgdbh": "",
					"spbm": "",
					"spsmm": ""
				},
				uFormRules: {
					"scsl": {
						type: "string",
						required: true,
						message: "请输入实采数量",
						trigger: ["blur", "change"]
					},
					"scjg": {
						type: "string",
						required: true,
						message: "请输入实采价格",
						trigger: ["blur", "change"]
					},
					// "scpz": {
					// 	type: "string",
					// 	required: true,
					// 	message: "请输入实采皮重",
					// 	trigger: ["blur", "change"]
					// },
					"scsj": {
						type: "string",
						required: true,
						message: "请输入验收商家",
						trigger: ["blur", "change"]
					},
				},
				popupShow: false,
				searchText: "",
				shopsList: []
			}
		},
		onLoad: function(option) {
			this.uFormModel.cgdbh = option.cgdbh
			this.uFormModel.spbm = option.spbm
			this.uFormModel.spsmm = option.spsmm
			this.spmc = option.spmc
			this.jysjbh = option.jysjbh
			this.uFormModel.scjg = option.jycgjg
			this.uFormModel.scsl = option.jycgsl
			this.shops("true")
		},
		onReady() {

		},
		methods: {
			up() {
				this.$refs.uForm.validate().then(ress => {
					let userid = uni.getStorageSync("userid")
					var datas = JSON.stringify('AddCGDmxForever${"djh":"' + this.uFormModel.cgdbh +
						'","spbm":"' + this.uFormModel.spbm + '","spsmm":"' + this.uFormModel.spsmm +
						'","sjpzsl":"' + this.uFormModel.scpz + '","sjcgsl":"' + this.uFormModel.scsl +
						'","sjcgjg":"' + this.uFormModel.scjg +
						'","sjsjbh":"' + this.jysjbh + '","userid":"' + userid + '","cgcheck":"' +
						this.uFormModel.qiangzhi + '"}')

					commonMain(datas).then((res) => {
						console.log("录入 res",res)
						if(res.retflag==0){
							this.$refs.uToast.show({
								type:"success",
								message: "录入成功"
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								});
							},2000)
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
			shops(bol) {
				if (bol != "true" && bol != "false") {
					this.shopsList = []
					this.shopsList.push({
						"sjbh": bol.split(".")[0],
						"sjmc": bol.split(".")[1]
					})
					this.popupShow = true
					this.popupShow = true
				} else {
					var datas = JSON.stringify('SJCERTIFY${"userid":""}')
					commonMain(datas).then((res) => {
						if (bol == "true") {
							for (var i in res.list) {
								if (res.list[i].sjbh.indexOf(this.jysjbh) != -1) {
									this.uFormModel.scsj = res.list[i].sjmc
								}
							}
						} else if (bol == "false") {
							this.shopsList = res.list
							this.popupShow = true
						}
					}).catch((err) => {
						console.log(err)
					})
				}

			},
			shopok(sjbh, sjmc) {
				this.uFormModel.scsj = sjbh + "." + sjmc
				this.popupShow = false
			},
			radioChange(e) {
				this.uFormModel.qiangzhi = e
			},
			popupclose(){
				this.popupShow=false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ts {
		font-size: 14px;
		color: #818181;
	}

	/deep/.u-popup {
		padding: 10px;
	}

	.box .u-popup-center .u-popup__content>uni-view>* {
		margin-top: 0;
	}

	.popsearch {
		display: flex;

		/deep/.u-button {
			width: 70px;
		}
	}

	.popuplist {
		min-height: 10vh;
		max-height: 50vh;
		margin-top: 12px;
	}

	.popuplist .popuplists {
		margin-top: 8px;
		border-bottom: 1px solid #EAEBEC;
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
