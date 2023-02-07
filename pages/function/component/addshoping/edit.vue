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
				<u-form-item label="补货数量" :labelWidth="74" prop="bhsl">
					<u-input placeholder="请输入补货数量" type="number" v-model="editForm.bhsl">
					</u-input>
				</u-form-item>
			</u-form>
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
				<view class="fold-title-flex-start fold-title-con show-dots">
					<text class="left-con">补货分店:</text>
					<text class="right-con">{{title.bhfd}}</text>
				</view>
				<view class="multiples">
					<view class="multiple-con">
						<text class="left-con">实配总量:</text>
						<text class="right-con">{{title.spzl}}</text>
					</view>
					<view class="multiple-con">
						<text class="left-con">补货总量:</text>
						<text class="right-con">{{title.bhzl}}</text>
					</view>
				</view>
				<view class="multiples">
					<view class="multiple-con">
						<text class="left-con">补货金额:</text>
						<text class="right-con">{{title.bhje}}</text>
					</view>
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
						<text class="left-con">数量:</text>
						<text class="right-con">{{item.bhsl}}</text>
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
		Search,
		BhdDelLine,
		BhdSpckl
	} from "@/network/api.js";
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
		data() {
			return {
				editForm:{
					spbm: "",
					spsmm: "",
					spmc: "",
					dw: "",
					gg: "",
					yjxl: "",
					ybhl: "",
					cxzt: "",
					zbkcl: "",
					psckl: "",
					bhsl: ""
				},
				editRules:{
					"bhsl": [{
							type: "number",
							required: true,
							message: "请填写补货数量",
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
					]
				},
				stateDetail: false,
				tableIndex: -1,
				
			}
		},
		mounted() {
			console.log("edit this.title",this.title)
		},
		methods: {
			// 编辑商品
			toeditDetail(row, index) {
				this.editForm.spbm = row.spbm
				this.editForm.spsmm = row.spsmm
				this.editForm.spmc = row.spmc
				this.editForm.dw = row.dw
				this.editForm.gg = row.gg
				this.editForm.bhsl = row.bhsl
				this.searchSpckl(row.spbm)
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
				this.editForm.bhsl= ""
				this.stateDetail = false
				this.tableIndex = -1
			},
			
			// 保存商品
			editDetailSave() {
				this.$refs.uForm.validate().then(resf => {
					this.uploadarr = []
					this.uploadarr.push({
						"ybhl": this.editForm.yjxl,
						"bhsl": this.editForm.bhsl,
						"yjxl": this.editForm.yjxl,
						"spbm": this.editForm.spbm,
						"spsmm": this.editForm.spsmm,
						"spkcl": this.editForm.psckl,
						"zbkcl": this.editForm.zbkcl,
						"spmc": this.editForm.spmc
					})
					console.log("保存商品 editDetailSave this.uploadarr",this.uploadarr)
					this.$emit("editSave",this.uploadarr)
				}).catch(errors => {
					
				})
			},
			
			// 删除商品
			delGoods(row, index) {
				console.log("删除商品 row",row)
				uni.showModal({
					content: "是否确认删除商品",
					success: (resm)=> {
						if (resm.confirm) {
							let dataes={
								"access_token": uni.getStorageSync("access_token"),
								"djbh": row.bhdbh,
								"fdbh": uni.getStorageSync("fdbh"),
								"userid": uni.getStorageSync("userid"),
								"username": uni.getStorageSync("dlmc"),
								"list": [{
									"spbm": row.spbm,
									"spmc": row.spmc,
									"spsmm": row.spsmm
								}]
							}
							console.log("删除商品 dataes",dataes)
							BhdDelLine(dataes).then((res) => {
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
			searchSpckl(spbm) {
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"spbm": spbm
				}
				BhdSpckl(dataes).then((res) => {
					// console.log("查找商品库存信息 res", res)
					if (res.error_code == 0) {
						this.editForm.yjxl=res.data[0].yjxl
						this.editForm.ybhl=res.data[0].ybhl
						this.editForm.cxzt=res.data[0].cxzt
						this.editForm.zbkcl=res.data[0].zbkcl
						this.editForm.psckl=res.data[0].psckl
					} else {
						
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			
		},
		
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
