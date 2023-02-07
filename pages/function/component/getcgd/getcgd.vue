<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack" v-show="ifpage">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
				<view class="navleftview" v-show="!ifpage" @tap="ifpage=true">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="center">采购验收</view>
			<view class="right"></view>
		</view>
		<view class="box-content" v-show="ifpage">
			<view class="searchBox">
				<u-input v-model="searchModel.cgdh" placeholder="搜索采购单(单号或商家名)" @change="cgdChange"></u-input>
				</u-input>
				<view style="font-size:12px;color:red;" v-if="searchModel.cgdhErrShow">请输入4位及以上的单号/商家名 查询</view>
			</view>
			<!-- 未验收商品 -->
			<view class="section">
				<view class="sectionTitle">
					<view class="sectionPic"></view>
					<text>未验收商品</text>
				</view>
				<view>
					<view class="card-view" v-for="(v,i) in notYsData" @tap="toYsPage(v)">
						<view class="card-title card-flex">
							<text>{{v.采购单号}}</text>
							<text class="xiangqing" @tap.stop="lookDetail(v.采购单号)">详情</text>
						</view>
						<view class="card-flex card-con">
							<text class="half-card-text">门店:{{v.采购门店}}</text>
							<text class="half-card-text">{{v.应到货日}}</text>
						</view>
						<view class="card-flex card-con">
							<text class="half-card-text">总数:{{v.品种总数量}}</text>
							<text class="half-card-text">总额:{{v.订单总额}}</text>
						</view>
						<view class="card-flex card-con">
							<text class="half-card-text" style="color:#CC3366;">未检数:{{v.未检品数}}</text>
							<text class="half-card-text" style="color:#CC3366;">未检额:{{v.未检金额}}</text>
						</view>
					</view>
				</view>
				<text class="notText" v-if="notYsData.length==0">没有未验收的商品</text>
			</view>

		</view>
		<!-- 验收界面 -->
		<view class="box-content ys-page" v-show="!ifpage">
			<view class="ys-title">
				<text class="ys-title-left">{{uFormModel.cgdh}}</text>
				<text class="ys-title-red">未验:{{uFormModel.notPickNum}}</text>
			</view>
			<u-form class="form-card" labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="条码:" :labelWidth="76" prop="spsmm">
					<u-input placeholder="请输入条码" v-model="uFormModel.spsmm" border="none" @change="spsmmChange">
					</u-input>
					<uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#606060" @tap="scan()">
					</uni-icons>
				</u-form-item>
				<u-form-item label="名称:" :labelWidth="76" prop="spmc">
					<u-input placeholder="请输入商品名称" v-model="uFormModel.spmc" disabled border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="编码:" :labelWidth="76" prop="spbm">
					<u-input placeholder="请输入商品编码" v-model="uFormModel.spbm" disabled border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="订单数:" :labelWidth="76" prop="orderNum">
					<u-input placeholder="请输入订单数量" v-model="uFormModel.orderNum" disabled border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="规格:" :labelWidth="76" prop="specs">
					<u-input placeholder="请输入商品规格" v-model="uFormModel.specs" disabled border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="保质期:" :labelWidth="76" prop="baozhiqi">
					<u-input placeholder="请输入保质期" v-model="uFormModel.baozhiqi" disabled border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="箱件:" :labelWidth="76" prop="boxNum">
					<u-input placeholder="请输入箱件数量" v-model="uFormModel.boxNum" border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="数量:" :labelWidth="76" prop="num">
					<u-number-box v-model="uFormModel.num" :min="0"></u-number-box>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="价格:" :labelWidth="76" prop="price">
					<u-input placeholder="请输入商品价格" type="number" v-model="uFormModel.price" border="none">
					</u-input>
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="生产日期:" :labelWidth="76" prop="startDate">
					<uni-datetime-picker type="date" :clear-icon="false" placeholder="请选择生产日期"
						v-model="uFormModel.startDate" @change="startDateChange" />
					<text class="inp-right-text"></text>
				</u-form-item>
				<u-form-item label="赠品:" :labelWidth="76">
					<u-radio-group v-model="uFormModel.gift">
						<u-radio key="T" label="赠品" name="T"></u-radio>
						<u-radio key="F" label="非赠品" name="F"></u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>
			<view class="form-card">
				<view style="display:flex;justify-content:space-between;">
					<text>供价类型</text>
				</view>
				<view>
					<view class="radio-view">
						<view class="radio-text" v-for="(v, i) in lxlist" :class="{lxactive:uFormModel.lx==v.sjcxlxid}" @tap="supplyTpChange(v.sjcxlxid+'-'+v.lxmc)">{{v.lxmc}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="ys-page sticky-bottom" v-show="!ifpage">
			<u-button type="primary" class="my-primary-button" text="验收保存" throttleTime="1000" @tap="ysSave">
			</u-button>
			<u-button type="primary" :plain="true" class="my-primary-button" text="验收完成" throttleTime="1000"
				@tap="ysckDone">
			</u-button>
		</view>

		<u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
			<scroll-view style="max-height: 60vh;" scroll-y="true">
				<text class="popup-title">验收清单</text>
				<view class="ys-list" v-for="(v,i) in ysDetailData">
					<view class="ys-list-row" style="color:red;" v-if="v.状态=='未检'">{{i+1}}:{{v.商品名称}}</view>
					<view class="ys-list-row" style="color:green;" v-else>{{i+1}}:{{v.商品名称}}</view>
					<view class="ys-list-multiple">
						<text class="left-con">条码:</text>
						<text class="right-con">{{v.商品条码}}</text>
					</view>
					<view class="ys-list-multiple">
						<text class="left-con">订单数量:</text>
						<text class="right-con">{{v.订单数量}}</text>
					</view>
					<view class="ys-list-multiple">
						<text class="left-con">已验数量:</text>
						<text class="right-con">{{v.已验数量}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="closebtn" @tap="popupShow=false">取消</view>
		</u-popup>

	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		getCGDdata,
		getSupplyType
	} from "@/network/api.js";
	export default {
		data() {
			return {
				ifpage: true,
				searchModel: {
					cgdh: "",
					cgdhErrShow:false,
				},
				notYsData: [],
				popupShow: false,
				ysDetailData: [],
				//验收界面data
				lxlist:[],
				uFormModel: {
					cgdh: "",
					notPickNum: "",
					sphh: "",
					spsmm: "",
					spmc: "",
					spbm: "",
					orderNum: "",
					specs: "",
					baozhiqi: "",
					boxNum: "",
					num: "",
					price: "",
					startDate: "",
					lx: "",
					gift: "T"
				},
				uFormRules: {
					"spsmm": {
						asyncValidator: (rule, value, callback) => {
							if(value.replace(/[^\x00-\xff]/g, "xx").length>=4){
								callback();
							}else{
								callback(new Error("请输入4位及以上的商品条码 查询"));
							}
						}
					},
					"startDate": {
						type: "string",
						required: true,
						message: "请选择生产日期",
						trigger: ["blur", "change"]
					},
				},

			}
		},
		onLoad() {
			this.searchSupplyTp("all")
		},
		onReady() {
			// 设置状态栏文字颜色为 白色
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			// 搜索未验收商品
			cgdChange(val) {
				setTimeout(() => {
					if (val.length >= 4) {
						this.searchModel.cgdhErrShow=false
						if (val == this.searchModel.cgdh) {
							this.searchCgd("00", {}, "11")
							uni.hideKeyboard()
						}
					}else{
						this.searchModel.cgdhErrShow=true
					}
				}, 2000)
			},
			searchCgd(vtype, obj, dowhat) {
				uni.showLoading({
					title: "搜索中"
				});
				let cgdbh = ""
				let spsmm = ""
				if (dowhat == "11" && vtype == "00") {
					cgdbh = this.searchModel.cgdh
				} else if (dowhat == "11" && vtype == "03") {
					cgdbh = obj.dh
				} else if (dowhat == "11" && vtype == "01") {
					spsmm = this.uFormModel.spsmm
				}
				let dataes = {
					"access_token": uni.getStorageSync("access_token"),
					"vtype": vtype,
					"dowhat": dowhat,
					"cgdbh": cgdbh,
					"userid": uni.getStorageSync("userid"),
					"jsonvar": "",
					"spsm": spsmm,
				}
				console.log("采购单 dataes", dataes)
				getCGDdata(dataes).then((res) => {
					uni.hideLoading();
					console.log("采购单 res", res)
					if (dowhat == "11") {

						if (vtype == "00") { //主界面 搜索未验收单据
							this.notYsData = res.data
						} else if (vtype == "03") { //主界面 查看未验收单详情
							this.popupShow = true
							this.ysDetailData = res.data
						} else if (vtype == "01") { //验收界面 搜索商品

						} else if (vtype == "02") { //验收界面 验收完成

						}

					} else if (dowhat == "12") { //验收界面 验收保存

					} else if (dowhat == "13") {

					}

				}).catch((err) => {
					uni.hideLoading();
					console.log(err)
				})
			},
			//查看未验收单详情
			lookDetail(dh) {
				this.searchCgd("03", {
					"dh": dh
				}, "11")
			},
			toYsPage(item) {
				this.uFormModel.cgdh = item.采购单号
				this.uFormModel.notPickNum = item.未检品数
				this.ifpage = false
			},
			//验收界面函数。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			spsmmChange(val) {
				setTimeout(() => {
					if (val != "") {
						if (val == this.uFormModel.spsmm) {
							this.$refs.uForm.validateField("spsmm",(error)=>{
								if(error.length==0){
									this.searchCgd("01", {}, "11")
									uni.hideKeyboard()
								}
							})
						}
					}
				}, 2000)
			},
			scan() {
				uni.scanCode({
					success: (res) => {
						console.log('扫码内容', res)
						this.uFormModel.spsmm = res.result
						this.searchCgd("01", {}, "11")
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type: "error",
							message: "识别失败"
						})
					}
				});
			},
			startDateChange(event) {
				this.uFormModel.startDate = event
			},
			// 搜索促销类型
			searchSupplyTp(lxValue) {
				getSupplyType({
					"access_token": uni.getStorageSync("access_token")
				}).then((res) => {
					console.log("在线 促销类型 res", res)
					if (res.error_code == 0) {
						if (lxValue == "all") {
							this.lxlist = res.data
						} else {
							for (var i in res.data) {
								let xx = `${res.data[i].sjcxlxid}-${res.data[i].lxmc}`
								if (res.data[i].sjcxlxid.indexOf(lxValue) > -1) {
									this.supplyTpChange(xx)
								} else if (res.data[i].lxmc.indexOf(lxValue) > -1) {
									this.supplyTpChange(xx)
								}
							}
						}
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: "查询失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			supplyTpChange(item){
				this.uFormModel.lx = item.split("-")[0]
			},
			ysSave() {
				this.$refs.uForm.validate().then(resf => {
					let jsonvar =
						"{danhao:'" +
						this.uFormModel.cgdh +
						"',username:'" +
						uni.getStorageSync("userid") +
						"',JsonSpxx:[{cgdhh:'" +
						this.uFormModel.sphh +
						"',spbm:'" +
						this.uFormModel.spbm +
						"',spsmm:'" +
						this.uFormModel.spsmm +
						"',cgsl:'" +
						this.uFormModel.spnum +
						"',cxlx:'" +
						this.uFormModel.cxlx +
						"',spjg:'" +
						this.uFormModel.price +
						"',scrq:'" +
						this.uFormModel.startDate +
						"',bzjzrq:'" +
						this.uFormModel.baozhiqi +
						"',splx:'" +
						this.uFormModel.gift +
						"'}]}"
				}).catch(errors => {

				})
			},
			ysckDone() { //验收完成
				this.searchCgd("02", "", "11")
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
	.box {
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}

		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}

		.box-content {
			padding-top: calc(var(--status-bar-height) + 52px);

			.searchBox {
				padding: 10px;
				background-color: #fff;

				.u-input {
					border-radius: 30px;
				}
			}

			.section {
				background-color: transparent;
			}

			.card-view {
				background-color: #fff;
				border-radius: 10px;
				box-sizing: border-box;
				padding: 10px;
				margin-bottom: 10px;
				box-shadow: 0px 1px 5px 3px #e8e8e8;

				.card-title {
					font-size: 18px;
					color: #1c1c28;
					font-weight: 600;
				}

				.xiangqing {
					display: block;
					height: 13px;
					line-height: 13px;
					padding: 3px 9px;
					// border: 1px solid #f13b44;
					background-color: #f13b44;
					border-radius: 15px;
					font-size: 12px;
					color: #fff;
					font-weight: 500;
				}

				.card-con {
					font-size: 14px;
					color: #999;
					font-weight: 400;
					margin-top: 8px;

					.half-card-text {
						display: block;
						width: 50%;
					}
				}

				.card-flex {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}

		.ys-page {
			.ys-title {
				display: flex;
				justify-content: space-between;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				padding: 10px;
				background-color: #358CC9;
				font-size: 17px;

				.ys-title-left {
					color: #fff;
				}

				.ys-title-red {
					color: #ff2c2c;
				}
			}

			.form-card {
				padding: 10px;
				background-color: #fff;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
				box-sizing: border-box;

				.inp-right-text {
					display: inline-block;
					width: 19px;
				}

				.radio-view {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.radio-text {
						padding: 6px 14px;
						background-color: #F5F5F5;
						border-radius: 7px;
					}

				}
			}

			.u-form.form-card>* {
				margin-bottom: 18px;
			}

			.form-card>*:last-child {
				margin-bottom: 0px;
			}

			/deep/.u-form {
				.u-form-item__body {
					padding: 0;
				}

				.u-form-item__body__left {
					margin-right: 8px;
				}

				.u-form-item__body__left__content__label {
					display: inline-block;
					text-align-last: justify;
				}

				.u-input__content__subfix-icon {
					flex-direction: row;
				}
			}
			
			.lxactive{
				background-color: #358CC9 !important;
				color: #fff;
			}

			/deep/.u-button {
				margin-top: 10px;
			}
		}

		/deep/.u-popup {
			border-radius: 30px;

			.u-popup__content {
				padding-left: 15px;
				padding-right: 15px;
				padding-bottom: 10px;
				border-radius: 20px;
			}

			.uni-scroll-view-content {
				box-sizing: border-box;
				padding: 10px 0;

				.ys-list {
					margin-top: 10px;

					.ys-list-row {
						font-size: 16px;
						color: #1c1c28;
						font-weight: 600;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.ys-list-multiple {
						width: 100%;
						font-size: 14px;

						// display: flex;
						// justify-content: space-between;
						// align-items: center;
						.left-con {
							font-size: 12px;
							color: #999;
							font-weight: 400;
							margin-right: 4px;
						}

						.right-con {
							color: #1c1c28;
						}
					}
				}
			}

			.closebtn {
				text-align: center;
				height: 34px;
				line-height: 34px;
				color: #358CC9;
				font-size: 17px;
			}
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
