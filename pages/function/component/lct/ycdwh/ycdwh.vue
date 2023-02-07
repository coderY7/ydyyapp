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
			<view style="margin:auto;">永采单维护</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<view v-show="state!='edit'">
				<u-form labelPosition="left" :model="uFormModel" ref="uForm">
					<u-form-item label="标识编号:" :labelWidth="90" prop="bsbh" borderBottom>
						<u-input v-model="uFormModel.bsbh" placeholder="请输入标识名称" border="none" confirm-type="search"
							@confirm="searchGoods">
							<template slot="suffix">
								<uni-icons type="search" size="24" @tap="searchGoods"></uni-icons>
							</template>
						</u-input>
					</u-form-item>

					<u-button type="primary" text="新增永采单" throttleTime="1000"></u-button>
				</u-form>
				<view class="orderZ">
					<view class="bhorder" v-for="(v,i) in goodsData">
						<view class="orders">
							<text>标识名称:</text>
							<text>{{v.fcgdno}}-{{v.fcgname}}</text>
						</view>
						<view class="orders">
							<text>所属分店:</text>
							<text>{{v.fdbh}}</text>
						</view>
						<view class="orders">
							<text>备注说明:</text>
							<text>{{v.remark}}</text>
						</view>
						<view class="btns">
							<u-button type="primary" text="查看明细" throttleTime="1000" @tap="detail(v.fcgdno)"></u-button>
							<u-button type="warning " text="单据修改" throttleTime="1000"
								@tap="editMx(v.fcgdno,v.fdbh,v.departbh,v.fcgname,v.cgybh,v.shfsid,v.remark)">
							</u-button>
							<u-button type="error" text="删除单据" throttleTime="1000" @tap="delMx(v.fcgdno)"></u-button>
						</view>
					</view>
				</view>
			</view>
			<view v-show="state=='edit'">
				<u-form labelPosition="left" :model="editForm" :rules="editFormRules" ref="editForm">
					<view style="margin-bottom:14px;font-weight:600;font-size:16px;">永采单据信息</view>
					<u-form-item label="分店编号:" :labelWidth="90" prop="fdbh" borderBottom @tap="editCheck('fendian')">
						<u-input v-model="editForm.fdbh" disabled disabledColor="#fff" border="none">
						</u-input>
						<uni-icons type="right" size="16"></uni-icons>
					</u-form-item>
					<u-form-item label="部门编号:" :labelWidth="90" prop="departbh" borderBottom @tap="editCheck('depart')">
						<u-input v-model="editForm.departbh" disabled disabledColor="#fff" border="none">
						</u-input>
						<uni-icons type="right" size="16"></uni-icons>
					</u-form-item>
					<u-form-item label="标识名称:" :labelWidth="90" prop="fcgname" borderBottom>
						<u-input v-model="editForm.fcgname" placeholder="请输入标识名称" border="none">
						</u-input>
					</u-form-item>
					<u-form-item label="采购人员:" :labelWidth="90" prop="cgybh" borderBottom>
						<u-input v-model="editForm.cgybh" disabled disabledColor="#fff" border="none">
						</u-input>
						<uni-icons type="right" size="16"></uni-icons>
					</u-form-item>
					<u-form-item label="送货方式:" :labelWidth="90" prop="shfsid" borderBottom @tap="editCheck('shfsid')">
						<u-input v-model="editForm.shfsid" disabled disabledColor="#fff" border="none">
						</u-input>
						<uni-icons type="right" size="16"></uni-icons>
					</u-form-item>
					<u-form-item label="备注说明:" :labelWidth="90" prop="remark" borderBottom>
						<u-input v-model="editForm.remark" placeholder="请输入备注说明" border="none">
						</u-input>
					</u-form-item>

					<view class="btns">
						<u-button type="primary" text="保存" throttleTime="1000" @tap="editSave"></u-button>
						<u-button type="info" text="取消" throttleTime="1000" @tap="editCancel"></u-button>
					</view>
				</u-form>
			</view>

			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" v-if="list.length!=0">
					<view v-if="ifDrawer=='fendian'">
						<view class="list" v-for="(v, i) in list" @tap="radioChange(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='depart'">
						<view class="list" v-for="(v, i) in list" @tap="radioChange(v.depart_id+'-'+v.depart_name)">
							<text v-html="v.depart_id">{{v.depart_id}}</text>-
							<text v-html="v.depart_name">{{v.depart_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='shfsid'">
						<view class="list" v-for="(v, i) in list" @tap="radioChange(v.shfsid+'-'+v.shfsmc)">
							<text v-html="v.shfsid">{{v.shfsid}}</text>-
							<text v-html="v.shfsmc">{{v.shfsmc}}</text>
						</view>
					</view>
					
				</scroll-view>
				<view style="text-align: center;" v-else>没有数据</view>
			</uni-drawer>
			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		bsinfo
	} from "@/network/api.js";
	export default {
		data() {
			return {
				goodsData: [],
				uFormModel: {
					bsbh: ""
				},
				state: "",
				editForm: {
					fcgdno: "",
					fdbh: "",
					departbh: "",
					fcgname: "",
					cgybh: "",
					shfsid: "",
					remark: "",
				},
				editFormRules: {
					"fcgname": {
						type: "string",
						required: true,
						message: "请填写标识名称",
						trigger: ["blur", "change"]
					}
				},
				ifDrawer: "",
				list: [],
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd
			}
		},
		onLoad: function(option) {

		},
		onReady() {
			this.getGoods("")
		},
		methods: {
			searchGoods() {
				this.getGoods(this.uFormModel.bsbh)
			},
			getGoods(goods) {
				let goodss = ""
				if (goods == "") {
					goodss = "all"
				} else {
					goodss = goods
				}
				let datas = {
					vtype: "sel",
					fcgdno: goodss,
				}
				bsinfo(datas).then((res) => {
					console.log("getGoods res", res)
					if (res.error_code == 0) {
						this.goodsData = res.data
					} else {

					}
				}).catch((err) => {
					console.log(err)
				})
			},
			// 查看明细
			detail(fcgdno) {
				uni.navigateTo({
					url: `/pages/function/component/lct/ycdwh/detail?fcgdno=${fcgdno}`
				})
			},
			editMx(fcgdno, fdbh, departbh, fcgname, cgybh, shfsid, remark) {
				this.state = "edit"
				this.editForm.fcgdno = fcgdno
				this.editForm.fdbh = fdbh
				this.editForm.departbh = departbh
				this.editForm.fcgname = fcgname
				this.editForm.cgybh = cgybh
				this.editForm.shfsid = shfsid
				this.editForm.remark = remark
			},
			editCheck(type) {
				if (type == "fendian") {
					this.ifDrawer = "fendian"
					plus.sqlite.selectSql({
						name: 'downloadDb',
						sql: 'select * from shop',
						success: function(res) {
							this.list = []
							for (var i in res) {
								if (res[i].shop_num.indexOf(this.editForm.fdbh) > -1) {
									res[i].shop_num=res[i].shop_num.replace(this.editForm.fdbh,this.fontStart + this.editForm.fdbh + this.fontEnd)
								}else if (res[i].shop_name.indexOf(this.editForm.fdmc) > -1) {
									res[i].shop_name=res[i].shop_name.replace(this.editForm.fdmc,this.fontStart + this.editForm.fdmc + this.fontEnd)
								}
								this.list.push(res[i])
							}
							this.$refs.drawer.open();
						}.bind(this),
						fail: function(e) {
							this.toDownload()
							console.log('查询 fendian SQL语句失败: ');
						}.bind(this)
					});
				} else if (type == "depart") {
					this.ifDrawer = "depart"
					plus.sqlite.selectSql({
						name: 'downloadDb',
						sql: 'select * from depart',
						success: function(res) {
							this.list = []
							for (var i in res) {
								if (res[i].depart_id.indexOf(this.editForm.departbh) > -1) {
									res[i].depart_id=res[i].depart_id.replace(this.editForm.departbh,this.fontStart + this.editForm.departbh + this.fontEnd)
								}else if (res[i].depart_name.indexOf(this.editForm.departbh) > -1) {
									res[i].depart_name=res[i].depart_name.replace(this.editForm.departmc,this.fontStart + this.editForm.departmc + this.fontEnd)
								}
								this.list.push(res[i])
							}
							this.$refs.drawer.open();
						}.bind(this),
						fail: function(e) {
							this.toDownload()
							console.log('查询 depart SQL语句失败: ');
						}.bind(this)
					});
				} else if (type == "shfsid") {
					this.ifDrawer = "shfsid"
					let lists = [{
						shfsid: '01',
						shfsmc: '送配送库房',
					}, {
						shfsid: '02',
						shfsmc: '送分店直配',
					}, {
						shfsid: '03',
						shfsmc: '自行提货',
					}]
					this.list=[]
					
					for (var i in lists) {
						if (lists[i].shfsid.indexOf(this.editForm.shfsid) > -1) {
							lists[i].shfsid=lists[i].shfsid.replace(this.editForm.shfsid,this.fontStart + this.editForm.shfsid + this.fontEnd)
						}
						this.list.push(lists[i])
					}
					this.$refs.drawer.open();
				}
			},
			removeFont(item){
				let value;
				value=item.replace(this.fontStart,"")
				value=value.replace(this.fontEnd,"")
				return value
			},
			radioChange(e) {
				let str=this.removeFont(e)
				if (this.ifDrawer == "fendian") {
					this.editForm.fdbh = str.split("-")[0]
				} else if (this.ifDrawer == "depart") {
					this.editForm.departbh = str.split("-")[0]
				} else if (this.ifDrawer == "shfsid") {
					this.editForm.shfsid = str.split("-")[0]
				}
				this.$refs.drawer.close();
			},
			toDownload(){
				uni.showModal({
					content: "下载离线数据才能继续操作，现在下载吗？",
					confirmText: "下载",
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: `/pages/function/component/download/download`
							})
						} else if (res.cancel) {
			
						}
					}
				});
			},
			editSave() {
				this.$refs.editForm.validate().then(resedit => {
					let datas = {
						vtype: 'update',
						fcgdno: this.editForm.fcgdno,
						fcgname: this.editForm.fcgname,
						fdbh: this.editForm.fdbh,
						departbh: this.editForm.departbh,
						cgybh: this.editForm.cgybh,
						shfsid: this.editForm.shfsid,
						userid: uni.getStorageSync("userid"),
						remark: this.editForm.remark
					}
					bsinfo(datas).then((res) => {
						console.log("editSave res", res)
						this.state = ""
						if (res.error_code == 0) {
							this.$refs.uToast.show({
								type: "success",
								message: "修改成功"
							})
							this.getGoods("")
						} else {

						}
					}).catch((err) => {
						console.log(err)
					})
				})
			},
			editCancel() {
				this.state = ""
			},
			delMx(fcgdno) {
				uni.showModal({
					content: "确定要执行删除操作吗?",
					confirmText: "删除",
					success: function(resd) {
						if (resd.confirm) {
							let datas = {
								vtype: "del",
								fcgdno: fcgdno,
							}
							bsinfo(datas).then((res) => {
								console.log("删除明细 res", res)
								if (res.error_code == 0) {
									this.$refs.uToast.show({
										type: "success",
										message: "删除单据成功"
									})
									this.getGoods("")
								} else {

								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (resd.cancel) {

						}
					}.bind(this)
				});
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
		padding: 10px;
		background-color: #fff;

		.btns {
			/deep/.u-button {
				width: 40%;
				margin-top: 10px;
			}
		}
	}

	.orderZ {
		padding: 0 10px;
	}

	.btns {
		display: flex;
		justify-content: space-between;

		/deep/.u-button {
			width: 28%;
			margin: 0;
		}
	}

	.bhorder {
		padding: 10px;
		background-color: #fff;
		margin-bottom: 10px;
		border: 1px solid #dddddd;

		.orders>uni-text:first-child {
			display: inline-block;
			width: 90px;
			text-align-last: justify;
			margin-right: 20px;
		}
	}

	.bhorder>uni-view {
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
					margin-left: 10px;
					padding: 0;
				}
			}
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
