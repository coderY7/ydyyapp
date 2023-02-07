<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">永续补货新单</view>
			<view class="right">
				<u-button class="icon-button" text="" throttleTime="2000" :disabled="state=='add'" @tap="newOrder">
					<uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
				</u-button>
			</view>
		</view>
		<view class="box-content">
			<!-- 新增单据 表头 -->
			<view class="my-collapse">
				<view class="my-collapse-title" @tap="myCollShow=!myCollShow">
					<view class="fold-title">
						<view class="fold-title-t fold-title-flex">
							<text>单号:{{danhao}}</text>
							<text class="dhliang">明细:{{dhNum}}</text>
						</view>
						<view style="display:flex;justify-content:center;align-items:center;padding:8px;">
							<text v-if="myCollShow">收起</text>
							<text v-else>展开</text>
							<uni-icons type="top" size="19" color="#fff" v-if="myCollShow"></uni-icons>
							<uni-icons type="bottom" size="19" color="#fff" v-else></uni-icons>
						</view>
					</view>
				</view>
				<view class="my-collapse-con" v-show="myCollShow">
					<u-form class="form-card" labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
						<u-form-item label="部门:" :labelWidth="50" prop="depart" borderBottom @tap="searchDepart">
							<u-input v-model="uFormModel.depart" disabled disabledColor="#fff" placeholder="请选择部门" border="none"></u-input>
							<uni-icons type="right" size="16"></uni-icons>
						</u-form-item>
						<u-form-item label="分店:" :labelWidth="50" prop="fendian" borderBottom @tap="disabledFd">
							<u-input placeholder="搜索分店" :disabled="state=='edit'" disabledColor="#fff" v-model="uFormModel.fendian" border="none" confirm-type="search"
								@confirm="searchFd">
							</u-input>
							<uni-icons type="right" size="16" @tap="searchFd"></uni-icons>
						</u-form-item>
						<u-form-item label="补货标识:" :labelWidth="78" prop="mark" borderBottom @tap="searchMark">
							<u-input v-model="uFormModel.mark" disabled disabledColor="#fff" placeholder="请选择补货标识" border="none"></u-input>
							<uni-icons type="right" size="16"></uni-icons>
						</u-form-item>
						
						<u-button type="primary" class="my-primary-button" text="添加商品" @tap="startAdd">
							<uni-icons type="plusempty" size="20" color="#fff"></uni-icons>添加商品
						</u-button>
					</u-form>
				</view>
			</view>
			
			<view class="bhdata" v-show="contentShow">
				<uni-card :title="v.行号+'.'+v.商品名称+'-'+v.规格" v-for="(v,i) in bhdata">
					<view>条码:{{v.商品条码}} / 编码:{{v.商品编码}}</view>
					<view>上次补货: {{v.上次补货}}</view>
					<view class="now-num">
						<text>本次要货: </text>
						<u-number-box v-model="bhdata[i].本次要货"></u-number-box>
					</view>
				</uni-card>
				<u-button type="primary" text="保存商品" throttleTime="1000" @tap="save" v-if="saveOrUp=='save'">
					<uni-icons type="checkmarkempty" size="20" color="#fff"></uni-icons>保存商品
				</u-button>
				<u-button type="primary" text="审核上传" throttleTime="1000" @tap="upload" v-else-if="saveOrUp=='up'">
					<uni-icons type="arrow-up" size="20" color="#fff"></uni-icons>审核上传
				</u-button>
			</view>


			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true" :show-scrollbar="true" @scrolltolower="scrollToLower" v-if="list.length!=0">
					<view v-if="ifDrawer=='depart'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange(v.depart_id+'-'+v.depart_name)">
							<text v-html="v.depart_id">{{v.depart_id}}</text>-
							<text v-html="v.depart_name">{{v.depart_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='fendian'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange1(v.shop_num+'-'+v.shop_name)">
							<text v-html="v.shop_num">{{v.shop_num}}</text>-
							<text v-html="v.shop_name">{{v.shop_name}}</text>
						</view>
					</view>
					<view v-else-if="ifDrawer=='mark'">
						<view class="list" v-for="(v, i) in listLazy" @tap="radioChange2(v.FCGDNo+'-'+v.FCGName)">
							<text v-html="v.FCGDNo">{{v.FCGDNo}}</text>-
							<text v-html="v.FCGName">{{v.FCGName}}</text>
						</view>
					</view>
					<uni-load-more :status="loadState"></uni-load-more>
				</scroll-view>
				<view style="text-align: center;" v-else>没有数据</view>
			</uni-drawer>
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		searchGoods,
		getYXBHData,
		upload
	} from "@/network/api.js";
	export default {
		data() {
			return {
				state: "",
				danhao: "",
				uFormModel: {
					depart: "",
					fendian: "",
					mark: "2-日配商品补货"
				},
				uFormRules: {
					"depart": {
						type: "string",
						required: true,
						message: "请填写部门",
						trigger: ["blur", "change"]
					},
					"fendian": {
						type: "string",
						required: true,
						message: "请填写分店",
						trigger: ["blur", "change"]
					},
					"mark": {
						type: "string",
						required: true,
						message: "请选择补货标识",
						trigger: ["blur", "change"]
					},
				},
				myCollShow: true,
				contentShow: false,
				bhdata:[],
				
				list: [],
				ifDrawer:"",
				editSpbm:"",
				saveOrUp:"save",
				dhNum:"0条",
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
				//.......................
				loadState: "more",
				pageSize: 10,
				pageTotal: 20,
				listLazy:[]
			}
		},
		onLoad: function(option) {
			if (option.name == "edit"||option.name == "reupload") {
				this.state=option.name
				this.danhao=option.shopinglist_id
				this.uFormModel.depart=option.adddepart_name
				this.uFormModel.fendian=option.addshop_name
				this.uFormModel.mark=option.mark
				let sqls=""
				if(this.state=="edit"){
					sqls="select * from addgoodsNotUp where shopinglist_id='"+option.shopinglist_id+"' and addgoods_mark='YX'"
				}else if(this.state=="reupload"){
					sqls="select * from addgoods where shopinglist_id='"+option.shopinglist_id+"' and addgoods_mark='YX'"
				}
				plus.sqlite.selectSql({
					name: 'only',
					sql: sqls,
					success: function(res) {
						this.dhNum=`${res.length}条`
						this.bhdata=[]
						for(var j in res){
							this.bhdata.push({
								"行号":res[j].addgoods_num.split("+")[2],
								"商品编码":res[j].addgoods_id,
								"商品名称":res[j].addgoods_name,
								"商品条码":res[j].addgoods_sm,
								"规格":res[j].addgoods_getprice,
								"上次补货":res[j].addgoods_num.split("+")[3],
								"本次要货":res[j].addgoods_num.split("+")[0]
							})
						}
						this.contentShow = true
						console.log("this",this.bhdata)
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			} else {
				this.state="add"
				this.danhao = option.name
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			scrollToLower(event){
				if (this.loadState == "noMore") {
					
				} else {
					setTimeout(() => {
						this.loadState = "loading"
					}, 200)
					setTimeout(() => {
						this.loadFunc()
					}, 1000)
				}
			},
			loadFunc() {
				if (this.pageTotal < this.list.length) {
					this.pageTotal += this.pageSize
					this.listLazy = this.list.slice(0, this.pageTotal)
					if(this.listLazy.length < this.list.length){
						this.loadState = "more"
					}else{
						this.loadState = "noMore"
					}
				} else {
					this.listLazy = this.list
					this.loadState = "noMore"
				}
			},
			newOrder() {
				if (this.state == "add") {
					return
				}
				this.state="add"
				var now=dayjs().format('YYYY-MM-DD')
				var numx = parseInt(Math.random() * 100);
				if (numx < 10) {
					numx = "0" + numx;
				}
				var upid=Number(uni.getStorageSync('listupid'))+1
				var str= "BH" + now.split("-")[0].slice(2,4) + now.split("-")[1] + now.split("-")[2] + numx + uni.getStorageSync('userid') + upid;
				uni.setStorageSync('listupid',upid)
				this.danhao = str
				this.uFormModel.depart = ""
				this.uFormModel.fendian = ""
				this.uFormModel.mark = ""
				this.bhdata=[]
			},
			searchDepart() {
				if(this.state == "add"){
					this.ifDrawer = "depart"
					this.pageTotal = this.pageSize
					plus.sqlite.selectSql({
						name: 'downloadDb',
						sql: 'select * from depart',
						success: function(e) {
							this.list = e
							this.loadFunc()
							this.$refs.drawer.open();
							
						}.bind(this),
						fail: function(e) {
							this.toDownload()
							console.log('查询SQL语句失败: ');
						}.bind(this)
					});
				}else if(this.state == "edit"){
					this.$refs.uToast.show({
						type:"error",
						message: "编辑的部门，不能重新选择"
					})
				}
			},
			removeFont(item){
				let value;
				value=item.replace(this.fontStart,"")
				value=value.replace(this.fontEnd,"")
				return value
			},
			radioChange(e) {
				this.uFormModel.depart = e
				this.$refs.drawer.close();
			},
			radioChange1(e) {
				let str=this.removeFont(e)
				this.uFormModel.fendian = str
				this.$refs.drawer.close();
			},
			radioChange2(e) {
				this.uFormModel.mark = e
				this.$refs.drawer.close();
			},
			searchFd() {
				if(this.state == "add"){
					this.ifDrawer = "fendian"
					this.pageTotal = this.pageSize
					plus.sqlite.selectSql({
						name: 'downloadDb',
						sql: 'select * from shop',
						success: function(res) {
							this.list = []
							for (var i in res) {
								if (res[i].shop_num.indexOf(this.uFormModel.fendian) > -1) {
									res[i].shop_num=res[i].shop_num.replace(this.uFormModel.fendian,this.fontStart + this.uFormModel.fendian + this.fontEnd)
									this.list.push(res[i])
								}else if (res[i].shop_name.indexOf(this.uFormModel.fendian) > -1) {
									res[i].shop_name=res[i].shop_name.replace(this.uFormModel.fendian,this.fontStart + this.uFormModel.fendian + this.fontEnd)
									this.list.push(res[i])
								}
							}
							this.loadFunc()
							this.$refs.drawer.open();
							
						}.bind(this),
						fail: function(e) {
							this.toDownload()
							console.log('查询SQL语句失败: ');
						}.bind(this)
					});
				}
			},
			disabledFd(){
				if(this.state == "edit"){
					this.$refs.uToast.show({
						type:"error",
						message: "编辑的分店，不能重新选择"
					})
				}
			},
			searchMark() {
				if(this.state == "add"){
					this.ifDrawer = "mark"
					this.pageTotal = this.pageSize
					getYXBHData({
						"access_token": uni.getStorageSync("access_token"),
						"sn": uni.getStorageSync("sn"),
						"markid": "",
						"dowhat": "10",
						"bhfdbh": this.uFormModel.fendian.split("-")[0]
					}).then((res) => {
						console.log("getYXBHData res",res)
						if (res.error_code == 0) {
							this.list=res.data
							this.loadFunc()
							this.$refs.drawer.open();
						}else{
							
						}
					}).catch((err) => {
						console.log(err)
					})
				}else if(this.state == "edit"){
					this.$refs.uToast.show({
						type:"error",
						message: "编辑的补货标识，不能重新选择"
					})
				}
			},
			startAdd() {
				this.$refs.uForm.validate().then(res => {
					getYXBHData({
						"access_token": uni.getStorageSync("access_token"),
						"sn": uni.getStorageSync("sn"),
						"markid": this.uFormModel.mark.split("-")[0],
						"dowhat": "11",
						"bhfdbh": this.uFormModel.fendian.split("-")[0]
					}).then((res) => {
						console.log("getYXBHData startAdd res",res)
						if (res.error_code == 0) {
							this.contentShow = true
							this.bhdata=res.data
							this.dhNum=`${this.bhdata.length}条`
						}else{
							
						}
					}).catch((err) => {
						console.log(err)
					})
				})
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
			save() {
				let danhao = this.danhao
				if(this.state=="add"){
					this.notUpFunc()
				}else if(this.state=="edit"){
					plus.sqlite.executeSql({
						name: 'only',
						sql: "delete from addgoodsNotUp where shopinglist_id='"+danhao+"' and addgoods_mark='YX'",
						success: function(res) {
							this.notUpFunc()
						}.bind(this),
						fail: function(err) {
							console.log('删除SQL语句失败: ');
						}
					});
				}
			},
			notUpFunc() {
				let danhao = this.danhao
				let fendian = this.uFormModel.fendian
				let depart = this.uFormModel.depart
				let mark = ""
				// console.log("this",this.bhdata)
				plus.sqlite.executeSql({
					name: 'only',
					//1.单号 2.分店 3.部门 4.商家 5.商品id 6.商品名称 7.商品编号 8.商品价格 9.商品类型 10.商品数量 11.商品备注
					sql: "create table if not exists addgoodsNotUp('shopinglist_id' CHAR(20),'addshop_name' CHAR(20),'adddepart_name' CHAR(20),'addgoods_id' CHAR(20),'addgoods_name' CHAR(20),'addgoods_sm' CHAR(20),'addgoods_getprice' CHAR(20),'addgoods_num' CHAR(20),'addgoods_mark' CHAR(20))",
					success: function(e) {
						for(var i in this.bhdata){
							mark = this.bhdata[i].本次要货+"+"+this.uFormModel.mark+"+"+this.bhdata[i].行号+"+"+this.bhdata[i].上次补货
							plus.sqlite.executeSql({
								name: 'only',
								sql: "insert into addgoodsNotUp values('" + danhao + "','" + fendian +
									"','" + depart + "','" + this.bhdata[i].商品条码 + "','" + this.bhdata[i].商品名称 + "','" +
									this.bhdata[i].商品编码 + "','" + this.bhdata[i].规格 + "','" + mark + "','YX')",
								success: function(e) {
									console.log('插入addgoodsNotUp 成功');
									this.$refs.uToast.show({
										type:"success",
										message: "保存成功"
									})
									this.saveOrUp="up"
								}.bind(this),
								fail: function(e) {
									console.log('插入addgoodsNotUp 失败');
								}
							});
						}
					}.bind(this),
					fail: function(e) {
						console.log('创建addgoodsNotUp 失败');
					}
				});
			},
			upload() {
				let goodslist=[]
				for(var i in this.bhdata){
					goodslist.push({
						"spbm":this.bhdata[i].商品编码,
						"spsmm":this.bhdata[i].商品条码,
						"bhsl":this.bhdata[i].本次要货,
						"spmark":this.uFormModel.mark.split("-")[0]+":"+this.uFormModel.mark.split("-")[1]
					})
				}
				let uploadstr = "";
				let fendian=this.uFormModel.fendian.split("-")[0]
				let depart=this.uFormModel.depart.split("-")[0]
				let username=uni.getStorageSync("userid")
				let sn=uni.getStorageSync("sn")
				let danhao = this.danhao
				let mark=""
				
				uploadstr={
					"access_token": uni.getStorageSync("access_token"),
					"vtype":"YXBHD",
					"danhao":danhao,
					"fendian":fendian,
					"departid":depart,
					"username":username,
					"sn":sn,
					"ck":"F",
					"goodslist":goodslist
				}
				upload(JSON.stringify(uploadstr)).then((res) => {
					if (res[0].result == "success") {
						this.$refs.uToast.show({
							type:"success",
							message: "上传成功"
						})
						//删除未上传的
						plus.sqlite.executeSql({
							name: 'only',
							sql: "delete from addgoodsNotUp where shopinglist_id='"+danhao+"' and addgoods_mark='YX'",
							success: function(res) {
								console.log('删除成功')
							}.bind(this),
							fail: function(e) {
								console.log('删除SQL语句失败: ');
							}
						});
						//已上传记录 写入历史记录
						plus.sqlite.executeSql({
							name: 'only',
							//1.单号 2.分店 3.部门 4.商品id 5.商品名称 6.商品编号 7.商品价格 8.商品数量 9.商品备注
							sql: "create table if not exists addgoods('shopinglist_id' CHAR(20),'addshop_name' CHAR(20),'adddepart_name' CHAR(20),'addgoods_id' CHAR(20),'addgoods_name' CHAR(20),'addgoods_sm' CHAR(20),'addgoods_getprice' CHAR(20),'addgoods_num' CHAR(20),'addgoods_mark' CHAR(20))",
							success: function(rescc) {
								for(var i in this.bhdata){
									mark = this.bhdata[i].本次要货+"+"+this.uFormModel.mark+"+"+this.bhdata[i].行号+"+"+this.bhdata[i].上次补货
									plus.sqlite.executeSql({
										name: 'only',
										sql: "insert into addgoods values('" + danhao + "','" + fendian +
											"','" + depart + "','" + this.bhdata[i].商品条码 + "','" + this.bhdata[i].商品名称 + "','" +
											this.bhdata[i].商品编码 + "','" + this.bhdata[i].规格 + "','" + mark + "','YX')",
										success: function(e) {
											console.log('插入addgoods 成功');
										},
										fail: function(e) {
											console.log('插入addgoods 失败');
										}
									});
								}
							}.bind(this),
							fail: function(err) {
								console.log('创建addgoods失败: ', JSON.stringify(err));
							}
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						this.$refs.uToast.show({
							type:"error",
							message: res.message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},

		},
		computed: {
			skin() {
				return this.$store.state.skin;
			}
		},
		watch: {
			state: function(newv, oldv) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.box-content{
			padding-top: calc(var(--status-bar-height) + 52px);
			padding-bottom: 10px;
			
			.my-collapse {
				.my-collapse-title {
					padding:10px 10px 0;
					color: #fff;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					background-color: #358CC9;
			
					.fold-title {
						.fold-title-t {
							font-size: 15px;
							font-weight: 600;
			
							.dhliang {
								display: block;
								height: 17px;
								line-height: 16px;
								padding: 0px 12px;
								// background-color: #F13B44;
								border-radius: 15px;
								font-size: 12px;
								font-weight: 500;
							}
						}
			
						.fold-title-con {
							font-size: 12px;
							font-weight: 400;
						}
			
						.fold-title-flex {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
			
				.my-collapse-con {
					background-color: #fff;
					padding-bottom: 10px;
					margin-bottom: 10px;
			
					.form-card {
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
				}
			}
			
			/deep/.uni-card,.bhdata{
				margin:10px 0 0 0 !important;
				box-sizing: border-box;
			}
			/deep/.bhdata .uni-card__content>uni-view{
				height: 30px;
				display: flex;
				align-items: center;
			}
			/deep/.bhdata .uni-card__content{
				.now-num{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					// .u-input{
					// 	border: 0;
					// 	border-bottom: 1px solid gray;
					// 	border-radius: 0;
					// 	padding:0 9px;
					// }
				}
				.now-num>uni-text{
					margin-right: 10px;
				}
			}
			.foldcon {
				padding: 0 10px 10px 10px;
			}
			
			.foldcon>uni-view {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10px;
			}
			/deep/.u-form{
				.u-form-item__body{
					padding-top: 8px;
					padding-bottom: 8px;
				}
				.u-button{
					margin-top: 10px;
				}
			}
			.warp {
				padding: 10px;
			}
			.u-input {
				border-radius: 30px;
			}
		}
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
				
				uni-button {
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
		background-color: #fff;
	}
</style>