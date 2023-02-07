<template>
	<view class="box-compents">
		<!-- 编辑单据 内容 -->
		<view v-show="stateDetail">
			<view class="edit-title">单号:{{title.djbh}}</view>
			<u-form class="form-card" labelPosition="left" :model="editForm" :rules="editRules" ref="uForm">
				<u-form-item label="商品编码" :labelWidth="74" prop="spbm" class="shoping">
					<u-input placeholder="请输入商品编码/名称/简码" disabled v-model="editForm.spbm">
					</u-input>
				</u-form-item>
				<view>
					<view class="shopTishi">
						<view class="shopTishi-view show-dots" v-if="editForm.spmc">
							<text class="left-con">名称-条码:</text>
							<text>{{editForm.spmc}}</text>-
							<text>{{editForm.spsmm}}</text>
						</view>
					</view>
					<view class="shopTishi">
						<view class="shopTishi-view-half" v-if="editForm.dw">
							<text class="left-con">单位:</text>
							<text>{{editForm.dw}}</text>
						</view>
						<view class="shopTishi-view-half" v-if="editForm.gg">
							<text class="left-con">规格:</text>
							<text>{{editForm.gg}}</text>
						</view>
					</view>
				</view>
				<u-form-item label="入库数量" :labelWidth="74" prop="rksl">
					<u-input placeholder="请输入入库数量" type="number" v-model="editForm.rksl">
					</u-input>
				</u-form-item>
				<u-form-item label="入库价格" :labelWidth="74" prop="rkhsjg">
					<u-input placeholder="请输入入库价格" type="number" v-model="editForm.rkhsjg">
					</u-input>
				</u-form-item>
				<u-form-item label="是否赠品" :labelWidth="74" prop="splx">
					<xuanSwitch :switchList="switchList" :defaultSwitch="editForm.splx" @change="switChange"></xuanSwitch>
				</u-form-item>
			</u-form>
			<view class="form-card">
				<view style="display:flex;justify-content:space-between;">
					<text>供价类型</text>
				</view>
				<view>
					<view class="radio-view">
						<view class="radio-text" v-for="(v, i) in lxlist" :class="{lxactive:editForm.cxjbz==v.sjcxlxid}" @tap="formMoreChange(v.sjcxlxid)">{{v.lxmc}}</view>
					</view>
				</view>
			</view>
			<view class="btns" v-if="stateDetail">
				<u-button type="primary" class="my-primary-button" :plain="true" text="取消" throttleTime="2000"
					@tap="cancelDetail"></u-button>
				<u-button type="primary" class="my-primary-button" text="保存" throttleTime="2000" @tap="editDetailSave">
				</u-button>
			</view>
		</view>
		<!--  -->
		<view class="foldGroup" v-show="!stateDetail">
			<view class="fold-title" v-if="title.state!='add'">
				<view class="fold-title-t fold-title-flex-start">
					<text>{{title.djbh}}</text>
				</view>
				<view class="fold-title-flex-start fold-title-con show-dots-2">
					<text class="left-con">商家编号:</text>
					<text class="right-con">{{title.sjbh}}-{{title.sjmc}}</text>
				</view>
				<view class="fold-title-flex-start fold-title-con show-dots-1" v-if="title.ysdh">
					<text class="left-con">原始单号:</text>
					<text class="right-con">{{title.ysdh}}</text>
				</view>
				<view class="multiples">
					<view class="multiple-con">
						<text class="left-con">入库仓库:</text>
						<text class="right-con">{{title.ckbh}}</text>
					</view>
					<view class="multiple-con">
						<text class="left-con">入库分店:</text>
						<text class="right-con">{{title.fdbh}}</text>
					</view>
				</view>
				<view class="multiples">
					<view class="multiple-con">
						<text class="left-con">入库总量:</text>
						<text class="right-con">{{title.rkzl}}</text>
					</view>
					<view class="multiple-con">
						<text class="left-con">入库总额:</text>
						<text class="right-con">￥{{title.rkze}}</text>
					</view>
				</view>
				<view class="multiples">
					<view class="multiple-con">
						<text class="left-con">单据状态:</text>
						<text class="right-con">{{title.djzt}}</text>
					</view>
				</view>
			</view>
			<view class="fold-content" v-for="(item,index) in tableData">
				<view class="card-flex-wrap">
					<view class="card-row">{{item.spmc}}</view>
					<view>
						<uni-icons type="compose" size="20" color="#3183C1" v-if="state=='add'||state=='edit'||state=='pladd'" @tap="toeditDetail(item,index)"></uni-icons>
						<uni-icons type="trash" size="20" color="#F13B44" style="margin-left:10px;" v-if="state=='add'||state=='edit'||state=='pladd'" @tap="delGoods(item,index)"></uni-icons>
					</view>
				</view>
				<view class="multiples">
					<view class="multiple-con">
						<text class="left-con">编码:</text>
						<text class="right-con">{{item.spbm}}</text>
					</view>
					<view class="multiple-con">
						<text class="left-con">条码:</text>
						<text class="right-con">{{item.spsmm}}</text>
					</view>
				</view>
				<view class="multiples">
					<view class="multiple-con view-flex">
						<text class="left-con">特供:</text>
						<text class="right-con">{{item.cxjbz}}</text>
					</view>
					<view class="multiple-con view-flex">
						<text class="left-con">赠品:</text>
						<text class="right-con">{{item.splx}}</text>
					</view>
				</view>
				<view class="multiples">
					<view class="multiple-con view-flex">
						<text class="left-con">数量:</text>
						<text class="right-con">{{item.rksl}}</text>
					</view>
					<view class="multiple-con view-flex">
						<text class="left-con">价格:</text>
						<text class="right-con">￥{{item.rkhsjg}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 弹窗。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
		<u-toast ref="uToast"></u-toast>
		
		
	</view>
</template>

<script>
	import dayjs from "dayjs";
	import {
		Basic,
		Search,
		RkdDelLine
	} from "@/network/api.js";
	import xuanSwitch from "@/components/xuan-switch/xuan-switch.vue";
	export default {
		props: {
			tableData: {
				type: Array,
				default: () => {
					return []
				}
			},
			title: {
				type: Object,
				default: () => {
					return {}
				}
			},
			state:{
				type: String,
				default: () => {
					return ""
				}
			},
			
		},
		components: {
			xuanSwitch
		},
		data() {
			return {
				switchList:["是","否"],
				editForm:{
					spbm: "",
					spsmm: "",
					spmc: "",
					dw: "",
					gg: "",
					rksl: "",
					rkhsjg: "",
					splx: false,//赠送商品
					cxjbz: "",//供价类型
				},
				editRules:{
					"rksl": [{
							type: "number",
							required: true,
							message: "请填写入库数量",
							trigger: ["blur", "change"]
						},
						{
							asyncValidator: (rule, value, callback) => {
								let reg=/^\d+(\.\d+)?$/
								if(reg.test(value)){
									callback();
								}else{
									callback(new Error('请输入非负数'));
								}
							}
						}
					],
					"rkhsjg": [{
							type: "number",
							required: true,
							message: "请填写入库价格",
							trigger: ["blur", "change"]
						},
						{
							asyncValidator: (rule, value, callback) => {
								let reg=/^\d+(\.\d+)?$/
								if(reg.test(value)){
									callback();
								}else{
									callback(new Error('请输入非负数'));
								}
							}
						}
					],
				},
				serchGoodsData:[],
				lxlist:[],
				stateDetail: false,
				tableIndex: -1,
				
			}
		},
		mounted() {
			this.formMore("",true)
			console.log("tableData",this.tableData)
			console.log("edit this.title",this.title)
		},
		methods: {
			// 查询 特供（供价类型）
			formMore(lx,isAll) {
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"dtype": "DMINFO",
					"companyid": uni.getStorageSync("companyid"),
				}
				Basic(dataes).then((res) => {
					if (res.error_code == 0) {
						if(isAll){
							this.lxlist=res.data
						}else{
							for(var i in res.data){
								if(res.data[i].sjcxlxid.indexOf(lx)>-1){
									let xx = res.data[i].sjcxlxid
									this.formMoreChange(xx)
								}
							}
						}
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: "查询失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			formMoreChange(item){
				this.editForm.cxjbz = item
			},
			
			// 编辑商品
			toeditDetail(row, index) {
				this.serchGoods(row.spbm)
				this.editForm.splx = row.splx=="T"?true:false
				this.editForm.rksl = row.rksl
				this.editForm.rkhsjg = row.rkhsjg
				this.formMore(row.cxjbz,false)
				this.stateDetail = true
				this.tableIndex = index
				// console.log("编辑商品 row",row)
			},
			cancelDetail() {
				this.editForm.spbm= ""
				this.editForm.spsmm= ""
				this.editForm.spmc= ""
				this.editForm.dw= ""
				this.editForm.gg= ""
				this.editForm.cxjbz= ""//供价类型
				this.editForm.splx= false//赠送商品
				this.editForm.rksl= ""
				this.editForm.rkhsjg= ""
				this.stateDetail = false
				this.tableIndex = -1
			},
			
			switChange(val){
				this.editForm.splx=val
			},
			// 保存商品
			editDetailSave() {
				this.$refs.uForm.validate().then(resf => {
					this.uploadarr = []
					this.uploadarr.push({
						"bzjzrq": this.tableData[this.tableIndex].bzjzrq.split("T")[0],
						"hsjj": this.editForm.rkhsjg,
						"rksl": this.editForm.rksl,
						"cxtype": this.editForm.cxjbz,
						"guid": this.tableData[this.tableIndex].recordid,
						"scrq": this.tableData[this.tableIndex].scrq.split("T")[0],
						"spbm": this.editForm.spbm,
						"splx": this.editForm.splx?"T":"F",
						"jjsl": this.serchGoodsData.sl,
						"spsmm": this.editForm.spsmm,
						"spmc": this.editForm.spmc,
						"sppc": ""
					})
					// console.log("保存商品 editDetailSave this.uploadarr",this.uploadarr)
					this.$emit("editSave",this.uploadarr)
				}).catch(errors => {
					
				})
			},
			
			// 删除商品
			delGoods(row, index) {
				uni.showModal({
					content: "是否确认删除商品",
					success: (resm)=> {
						if (resm.confirm) {
							let dataes={
								"access_token": uni.getStorageSync("access_token"),
								"userid": uni.getStorageSync("userid"),
								"username": uni.getStorageSync("dlmc"),
								"djbh": this.title.入库单号,
								"fdbh": uni.getStorageSync("fdbh"),
								"list": [{
									"guid": row.recordid,
									"spbm": row.spbm,
									"spmc": row.spmc,
									"spsmm": row.spsmm
								}]
							}
							// console.log("删除商品 dataes",dataes)
							RkdDelLine(dataes).then((res) => {
								console.log("删除商品 res",res)
								if (res.error_code == 0) {
									this.$parent.getList()
									this.$refs.uToast.show({
										type: "success",
										message: "删除成功"
									})
								} else {
									this.$refs.uToast.show({
										type: "error",
										message: res.message
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
			serchGoods(val) {
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"companyid": uni.getStorageSync("companyid"),
					"condition": val,
					"fdbh": uni.getStorageSync("fdbh"),
					"findtype": "01",
					"goodstype": "SP",
					"userid": uni.getStorageSync("userid"),
				}
				Search(dataes).then((res) => {
					if (res.error_code == 0) {
						this.serchGoodsData = res.data[0]
						this.editForm.spbm=res.data[0].spbm
						this.editForm.spsmm=res.data[0].spsmm
						this.editForm.spmc=res.data[0].spmc
						this.editForm.dw=res.data[0].dw
						this.editForm.gg=res.data[0].gg
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			
		},
		watch: {
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.box-compents {
		.edit-title {
			padding:10px;
			color: #fff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			background-color: #358CC9;
		}
		
		.view-flex {
			width: 100%;
			display: flex;
			align-items: center;

			.form-left-text {
				display: inline-block;
				min-width: 64px;
				text-align-last: justify;
				margin-right: 10px;
			}
		}

		.form-card {
			padding: 10px 15px;
			background-color: #fff;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			margin-bottom: 10px;
			box-sizing: border-box;
			.shopTishi{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.shopTishi-view{
					uni-text{
						font-size: 14px;
						color: #999;
						font-weight: 400;
					}
				}
				.shopTishi-view-half{
					width: 50%;
					uni-text{
						font-size: 14px;
						color: #999;
						font-weight: 400;
					}
				}
				.left-con{
					margin-right: 4px;
				}
				.show-dots{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.inp-right-text{
				display: inline-block;
				width: 19px;
			}
			.radio-view{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.radio-text{
					padding: 6px 14px;
					background-color: #F5F5F5;
					border-radius: 7px;
				}
			}
			.uni-date {
				width: 100%;
				.uni-date__x-input {
					height: 38px;
				}
				.uni-date-editor--x .uni-date__icon-clear {
					top: 6px;
					border: 2px solid transparent;
				}
				.uni-date-editor--x__disabled>.uni-date-x {
					background-color: #F5F7FA;
				}
			}
			.u-input__content__subfix-icon {
				flex-direction: row;
			}
		}

		.form-card>* {
			margin-bottom: 14px;
		}

		.u-form.form-card>* {
			margin-bottom: 14px;
		}

		.form-card>*:last-child {
			margin-bottom: 0px;
		}

		/deep/.u-form {
			.u-form-item__body {
				padding: 0;
			}
			.u-form-item__body__right__content__slot{
				display: flex;
				justify-content: space-between;
			}
			.shoping{
				margin-bottom: 0px;
			}
		}
		.btns {
			display: flex;
			justify-content: space-around;
			margin-top: 8px;
		
			/deep/.u-button {
				width: 33%;
				margin: 0;
			}
		}

		.foldGroup {
			.fold-title>*{
				margin-bottom: 8px;
			}
			.fold-title>*:last-child{
				margin-bottom: 0px;
			}
			.fold-title{
				margin-bottom: 10px;
				border-radius: 10px;
				box-sizing: border-box;
				padding: 10px;
				box-shadow: 0px 1px 5px 3px #e8e8e8;
				background-color: #fff;
				.fold-title-t{
					font-size: 17px;
					color: #1c1c28;
					font-weight: 600;
					margin-bottom: 4px;
					padding-bottom: 4px;
					border-bottom: 1px solid #ccc;
				}
				.fold-title-con{
					color: #999;
					font-weight: 400;
				}
				.fold-title-flex-start{
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				.multiples {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.multiple-con {
						width: 50%;
					}
				}
				.show-dots{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.left-con{
					color: #999;
					font-weight: 400;
					margin-right: 4px;
				}
				.right-con{
					color: #1c1c28;
				}
				.cu1{
					color: #3a3a3a;
				}
				.cu-price{
					color: #358CC9;
				}
			}
			
			.fold-content {
				margin-bottom: 10px;
				border-radius: 10px;
				box-sizing: border-box;
				padding: 10px;
				box-shadow: 0px 1px 5px 3px #e8e8e8;
				background-color: #fff;

				.card-flex-wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;

					// flex-wrap: wrap;
					.card-row {
						font-size: 16px;
						color: #1c1c28;
						font-weight: 600;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}

				.multiples {
					width: 100%;
					font-size: 14px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.multiple-con {
						width: 50%;
					}

					.left-con {
						font-size: 12px;
						color: #999;
						font-weight: 400;
						margin-right: 4px;
						word-break: keep-all;
					}

					.right-con {
						color: #1c1c28;
					}
				}
			}

			.fold-content>* {
				margin-bottom: 10px;
			}

			.fold-content>*:last-child {
				margin-bottom: 0px;
			}
		}
		
		.lxactive{
			background-color: #358CC9 !important;
			color: #fff;
		}
		
	
		.flex-btns {
			display: flex;
			justify-content: space-between;
	
			/deep/.u-button--primary.my-primary-button {
				width: 28%;
			}
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
	
			.list {
				padding: 10px;
				border-bottom: 1px solid #E6E6E6;
			}
	
			.list>uni-text:first-child {
				color: #4A4A4A;
			}
	
			.list>uni-text:last-child {
				color: #A9A9A9;
			}
	
			.shop {
				.list {
					display: flex;
					padding: 10px 0;
	
					.shop-l {
						width: 24px;
						color: #060606;
						font-weight: 600;
					}
	
					.shop-r {
						width: calc(100% - 20px);
	
						.shop-r-t {
							display: flex;
							justify-content: space-between;
							font-weight: 600;
							margin-bottom: 8px;
	
							.t-name {
								color: #484858;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
	
							.t-price {
								color: #3b9bda;
							}
						}
	
						.shop-r-b {
							display: flex;
							justify-content: space-between;
							font-size: 12px;
	
							.b-xi {
								color: #b1b1b1;
								font-weight: 400;
							}
	
							.b-cu {
								color: #717171;
								font-weight: 500;
							}
	
						}
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
</style>
