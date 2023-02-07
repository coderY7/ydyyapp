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
			<view style="margin:auto;">永采单明细维护</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<view v-if="state!='add'">
				<u-form labelPosition="left" :model="uFormModel" ref="uForm">
					<!-- <u-form-item label="商品条码:" :labelWidth="90" prop="goods" borderBottom>
						<u-input v-model="uFormModel.goods" placeholder="请输入商品条码或名称" border="none" confirm-type="search"
							@confirm="searchGoods">
							<template slot="suffix">
								<uni-icons type="search" size="24" @tap="searchGoods"></uni-icons>
							</template>
						</u-input>
					</u-form-item> -->

					<u-button type="primary" text="新增明细" throttleTime="1000" @tap="add"></u-button>
					<u-button type="error" text="清空明细" throttleTime="1000" @tap="empty"></u-button>
				</u-form>
				<view class="orderZ">
					<view class="bhorder" v-for="(v,i) in detailData">
						<view class="title">{{v.jysjbh}}-{{v.sjmc}}</view>
						<view class="orders">
							<text>商品编码:</text>
							<text>{{v.spbm}}</text>
						</view>
						<view class="orders">
							<text>商品条码:</text>
							<text>{{v.spsmm}}</text>
						</view>
						<view class="orders">
							<text>商品名称:</text>
							<text>{{v.spmc}}</text>
						</view>
						<view class="orders">
							<text>采购数量:</text>
							<text>{{v.jycgsl}}</text>
						</view>
						<view class="orders">
							<text>备注说明:</text>
							<text>{{v.spremark}}</text>
						</view>
						<view class="btns">
							<u-button type="warning" text="修改数量" throttleTime="1000" @tap="updateSl(v.cgdhh,v.jycgsl)">
							</u-button>
							<u-button type="error" text="删除明细" throttleTime="1000" @tap="del(v.cgdhh)"></u-button>
						</view>
					</view>
				</view>
			</view>
			<view v-if="state=='add'">
				<u-form labelPosition="left" :model="addForm" ref="uForm">
					<u-form-item label="明细行号:" :labelWidth="90" prop="detlLineNum" borderBottom>
						<u-input v-model="addForm.detlLineNum" disabled disabledColor="#fff" border="none"
							confirm-type="search" @confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="商品编码:" :labelWidth="90" prop="commodityCd" borderBottom>
						<u-input v-model="addForm.commodityCd" placeholder="请输入商品编码" border="none" confirm-type="search"
							@confirm="searchGoods">
						</u-input>
						<uni-icons type="right" size="16"></uni-icons>
					</u-form-item>
					<u-form-item label="商品条码:" :labelWidth="90" prop="barcode" borderBottom>
						<u-input v-model="addForm.barcode" placeholder="请输入商品条码" border="none" confirm-type="search"
							@confirm="searchGoods">
						</u-input>
						<uni-icons type="right" size="16"></uni-icons>
					</u-form-item>
					<u-form-item label="商品名称:" :labelWidth="90" prop="productNm" borderBottom>
						<u-input v-model="addForm.productNm" disabled disabledColor="#fff" border="none"
							confirm-type="search" @confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="采购价格:" :labelWidth="90" prop="purPrc" borderBottom>
						<u-input v-model="addForm.purPrc" disabled disabledColor="#fff" border="none"
							confirm-type="search" @confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="商品税率:" :labelWidth="90" prop="commodityTaxRt" borderBottom>
						<u-input v-model="addForm.commodityTaxRt" disabled disabledColor="#fff" border="none"
							confirm-type="search" @confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="采购数量:" :labelWidth="90" prop="purQuantity" borderBottom>
						<u-input v-model="addForm.purQuantity" placeholder="请输入采购数量" border="none" confirm-type="search"
							@confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="商家编号:" :labelWidth="90" prop="merchId" borderBottom>
						<u-input v-model="addForm.merchId" disabled disabledColor="#fff" border="none"
							confirm-type="search" @confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="备注说明:" :labelWidth="90" prop="remark" borderBottom>
						<u-input v-model="addForm.remark" placeholder="请输入备注说明" border="none" confirm-type="search"
							@confirm="searchGoods">
						</u-input>
					</u-form-item>
					<u-form-item label="操作用户:" :labelWidth="90" prop="operationUsr" borderBottom>
						<u-input v-model="addForm.operationUsr" disabled disabledColor="#fff" border="none"
							confirm-type="search" @confirm="searchGoods">
						</u-input>
					</u-form-item>


					<view class="btns">
						<u-button type="primary" text="保存" throttleTime="1000" @tap="addSave"></u-button>
						<u-button type="info" text="取消" throttleTime="1000" @tap="addCancel"></u-button>
					</view>
				</u-form>
			</view>

			<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupclose">
				<view class="popupCon">
					<view>请输入要修改的数量</view>
					<u-input v-model="xiuSl" type="number" placeholder="请输入要修改的数量"></u-input>
					<view class="btns">
						<u-button type="primary" size="mini" text="确定" throttleTime="1000" @tap="popupOk"></u-button>
						<u-button type="info" size="mini" text="取消" throttleTime="1000" @tap="popupCancel"></u-button>
					</view>
				</view>
			</u-popup>
			<u-popup :show="popupShowAdd" mode="center" class="u-popup-center" :closeable="true" @close="popupAddclose">
				<view class="popupCon">
					<view>查询数据</view>
					<u-input prefixIcon="search" placeholder="请输入至少2位商品条码或名称" confirm-type="search"></u-input>
					<scroll-view style="height:50vh;" scroll-y="true">

					</scroll-view>
					<view class="btns">
						<u-button type="primary" size="mini" text="确定" throttleTime="1000" @tap="popupAddOk"></u-button>
						<u-button type="info" size="mini" text="取消" throttleTime="1000" @tap="popupAddCancel">
						</u-button>
					</view>
				</view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		bsmxdata
	} from "@/network/api.js";
	export default {
		data() {
			return {
				state: "",
				fcgdno: "",
				uFormModel: {
					goods: ""
				},
				popupShow: false,
				xiuSl: "",
				xiuData: "",
				detailData: [],
				// 新增
				addForm: {
					detlLineNum: "", //明细行号
					commodityCd: "", //商品编码
					barcode: "", //商品条码
					productNm: "", //商品名称
					purPrc: "", //采购价格
					commodityTaxRt: "", //商品税率
					purQuantity: "", //采购数量
					merchId: "", //商家编号
					remark: "", //备注说明
					operationUsr: uni.getStorageSync("userid"), //操作用户
				},
				popupShowAdd: false,
			}
		},
		onLoad: function(option) {
			this.fcgdno = option.fcgdno
			this.goodsDetail(option.fcgdno)
		},
		onReady() {

		},
		methods: {
			searchGoods() {

			},
			goodsDetail(fcgdno) {
				let datas = {
					vtype: "sel",
					fcgdno: fcgdno,
				}
				bsmxdata(datas).then((res) => {
					console.log("goodsDetail res", res)
					if (res.error_code == 0) {
						this.detailData = res.data
					} else {

					}
				}).catch((err) => {
					console.log(err)
				})
			},
			updateSl(cgdhh, jycgsl) {
				this.xiuSl = jycgsl
				for (var i in this.detailData) {
					if (this.detailData[i].cgdhh == cgdhh) {
						this.xiuData = this.detailData[i]
					}
				}
				this.popupShow = true
			},
			popupOk() {
				let list = []
				list.push({
					"cgdhh": this.xiuData.cgdhh,
					"spbm": this.xiuData.spbm,
					"spsmm": this.xiuData.spsmm,
					"jycgjg": this.xiuData.jycgjg,
					"jyjgsl": this.xiuData.jyjgsl,
					"jycgsl": this.xiuSl,
					"jysjbh": this.xiuData.jysjbh,
					"spremark": this.xiuData.spremark
				})
				let datas = {
					vtype: "save",
					fcgdno: this.fcgdno,
					userid: uni.getStorageSync("userid"),
					goodslist: JSON.stringify(list),
				}
				console.log("datas", datas)
				bsmxdata(datas).then((res) => {
					console.log("修改数量 res", res)
					this.popupShow = false
					if (res.error_code == 0) {
						this.$refs.uToast.show({
							type: "success",
							message: "修改成功"
						})
						this.goodsDetail(this.fcgdno)
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: "修改失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			popupCancel() {
				this.popupShow = false
			},
			del(cgdhh) {
				let list = []
				for (var i in this.detailData) {
					if (this.detailData[i].cgdhh == cgdhh) {
						this.xiuData = this.detailData[i]
					}
				}
				list.push(this.xiuData)
				let datas = {
					vtype: "save",
					fcgdno: this.fcgdno,
					userid: uni.getStorageSync("userid"),
					goodslist: JSON.stringify(list),
				}
				bsmxdata(datas).then((res) => {
					console.log("删除 res", res)
					if (res.error_code == 0) {
						this.$refs.uToast.show({
							type: "success",
							message: "删除成功"
						})
						this.goodsDetail(this.fcgdno)
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: "删除失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			add() {
				this.state = "add"
				if (this.detailData.length == 0) {
					this.addForm.detlLineNum = 1
				} else {
					this.addForm.detlLineNum = this.detailData[this.detailData.length - 1].cgdhh + 1
				}


			},
			addSave() {

			},
			addCancel() {
				this.state = ""
			},
			popupAddOk() {

			},
			popupAddCancel() {

			},
			// 清空明细
			empty() {
				if (this.detailData.length == 0) {
					this.$refs.uToast.show({
						type: "error",
						message: "没有可以删除的单据明细"
					})
				} else {
					uni.showModal({
						content: "确定要执行删除操作吗?",
						confirmText: "删除",
						success: function(resd) {
							if (resd.confirm) {
								let datas = {
									vtype: "del",
									fcgdno: this.fcgdno,
								}
								bsmxdata(datas).then((res) => {
									console.log("清空明细 res", res)
									if (res.error_code == 0) {
										this.goodsDetail(this.fcgdno)
									} else {

									}
								}).catch((err) => {
									console.log(err)
								})
							} else if (resd.cancel) {

							}
						}
					});
				}
			},
			popupclose() {
				this.popupShow = false
			},
			popupAddclose() {
				this.popupShowAdd = false
			},
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
		padding: 0 10px 10px;
		background-color: #fff;

		.u-button {
			margin-top: 10px;
		}
	}

	.orderZ {
		padding: 0 10px;
	}

	.bhorder {
		padding: 10px;
		background-color: #fff;
		margin-top: 10px;
		border: 1px solid #dddddd;

		.title {
			margin-bottom: 14px;
			font-size: 16px;
		}

		.orders>uni-text:first-child {
			display: inline-block;
			width: 90px;
			text-align-last: justify;
			margin-right: 20px;
		}

		.btns {
			display: flex;
			justify-content: space-between;

			/deep/.u-button {
				width: 28%;
				margin: 0;
			}
		}
	}

	.bhorder>uni-view {
		margin-top: 10px;
	}

	.popupCon {
		.btns {
			display: flex;
			justify-content: flex-end;

			/deep/.u-button {
				width: 20%;
				margin: 0;
				margin-right: 10px;
			}
		}
	}

	.popupCon>* {
		margin-top: 20px;
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
