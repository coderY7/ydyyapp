<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">标价签清单</view>
			<view class="right">
				<uni-icons type="plusempty" size="30" color="#fff" @tap="newOrder"></uni-icons>
			</view>
		</view>
		<view class="box-content">
			<uni-segmented-control :current="clickIndex" :values="tabsitems" @clickItem="onClickItem" styleType="button"
				activeColor="#3386c4"></uni-segmented-control>
				
			<view v-if="clickIndex==0">
				<view class="searchBox">
					<u-input prefixIcon="search" placeholder="搜索单号" v-model="searchText" @change="inputChange">
					</u-input>
				</view>
				
				<u-checkbox-group size="14" v-model="checkboxValue" placement="column" @change="checkboxChange">
					<view class="foldGroup" v-for="(v,i) in notUpData">
						<u-checkbox shape="circle" :key="i" label="" :name="v.pricelalist_id"></u-checkbox>
						<uni-collapse class="fold" ref="collapseView">
							<uni-collapse-item :open="false" :show-arrow="false" title-border="none">
								<template v-slot:title>
									<view class="fold-title">
										<view class="fold-title-t fold-title-flex">
											<text>{{v.pricelalist_id}}</text>
											<text class="dhliang" @tap="toedit(v,'edit')">明细:{{v.child.length}}</text>
										</view>
										<view class="fold-title-flex fold-title-con">
											<text>{{v.labelgoods_date}}</text>
										</view>
										<view class="fold-title-flex fold-title-con">
											<text>{{v.label_name}}</text>
											<text class="cu1 cu-price">{{v.total_num}}个</text>
										</view>
										<view class="fold-title-flex fold-title-con">
											<text>{{v.labelshop_name}}</text>
										</view>
									</view>
								</template>
								<view class="fold-content" v-for="(item,index) in v.child">
									<view class="multiple-border">
										<view class="card-flex-wrap">
											<view class="card-row">{{item.labelgoods_name}}</view>
											<view>
												<uni-icons type="compose" size="20" color="#3183C1" v-show="editId!=v.pricelalist_id||editIndex!=index" @tap="toeditDetail(v,i,item,index)"></uni-icons>
												<uni-icons type="trash" size="20" color="#F13B44" style="margin-left:10px;" @tap="notUpDel(v,i,item,index)"></uni-icons>
											</view>
										</view>
										<view class="multiples">
											<view class="multiple-con">
												<text class="left-con">编码:</text>
												<text class="right-con">{{item.labelgoods_bm}}</text>
											</view>
											<view class="multiple-con">
												<text class="left-con">条码:</text>
												<text class="right-con">{{item.labelgoods_sm}}</text>
											</view>
										</view>
										<view class="multiples">
											<view class="multiple-con">
												<text class="left-con">数量:</text>
												<u-input type="number" v-model="item.labelgoods_num" v-if="editId==v.pricelalist_id&&editIndex==index" :formatter="editNumFormat"></u-input>
												<text class="right-con" v-else>{{item.labelgoods_num}}</text>
											</view>
										</view>
									</view>
									<view class="btns" v-if="editId==v.pricelalist_id&&editIndex==index">
										<u-button type="primary" class="my-primary-button" :plain="true" text="取消" throttleTime="1000" @tap="editId='',editIndex=-1"></u-button>
										<u-button type="primary" class="my-primary-button" text="保存" throttleTime="1000" @tap="editDetailSave(v,i,item)"></u-button>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</u-checkbox-group>
			</view>
			<view v-else-if="clickIndex==1" style="padding-top: 10px;">
				<u-checkbox-group size="14" v-model="checkboxValue1" placement="column" @change="checkboxChange1">
					<view class="foldGroup" v-for="(v,i) in upData">
						<u-checkbox shape="circle" :key="i" label="" :name="v.pricelalist_id"></u-checkbox>
						<uni-collapse class="fold">
							<uni-collapse-item :open="false" :show-arrow="false" title-border="none">
								<template v-slot:title>
									<view class="fold-title">
										<view class="fold-title-t fold-title-flex">
											<text>{{v.pricelalist_id}}</text>
											<text class="dhliang" @tap="toedit(v,'edit')">明细:{{v.child.length}}</text>
										</view>
										<view class="fold-title-flex fold-title-con">
											<text>{{v.labelgoods_date}}</text>
										</view>
										<view class="fold-title-flex fold-title-con">
											<text>{{v.label_name}}</text>
											<text class="cu1 cu-price">{{v.total_num}}个</text>
										</view>
										<view class="fold-title-flex fold-title-con">
											<text>{{v.labelshop_name}}</text>
										</view>
									</view>
								</template>
								<view class="fold-content" v-for="(item,index) in v.child">
									<view class="multiple-border">
										<view class="card-row">{{item.labelgoods_name}}</view>
										<view class="multiples">
											<view class="multiple-con">
												<text class="left-con">编码:</text>
												<text class="right-con">{{item.labelgoods_bm}}</text>
											</view>
											<view class="multiple-con">
												<text class="left-con">条码:</text>
												<text class="right-con">{{item.labelgoods_sm}}</text>
											</view>
										</view>
										<view class="multiples">
											<view class="multiple-con">
												<text class="left-con">数量:</text>
												<u-input type="number" v-model="item.labelgoods_num" v-if="editId==v.pricelalist_id&&editIndex==index" :formatter="editNumFormat"></u-input>
												<text class="right-con" v-else>{{item.labelgoods_num}}</text>
											</view>
										</view>
									</view>
									<view class="btns" v-if="editId==v.pricelalist_id&&editIndex==index">
										<u-button type="primary" :plain="true" text="取消" throttleTime="1000" @tap="editId='',editIndex=-1"></u-button>
										<u-button type="primary" text="保存" throttleTime="1000" @tap="editDetailSave(v,i,item)"></u-button>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</u-checkbox-group>
			</view>
			
			
			<view class="fix-btn" v-if="fixbtnShow">
				<u-button type="primary" :plain="true" :text="fixbtnzi" throttleTime="1000" style="width:25%;" @tap="chooseAll"></u-button>
				<u-button type="primary" text="审核上传" throttleTime="1000" style="width:46%;" @tap="shsc"></u-button>
			</view>
			<!-- 弹窗。。。。。。。。。。 -->
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		uploadLabelList
	} from "@/network/api.js";
	export default {
		data() {
			return {
				tabsitems: ['未上传单', '历史记录'],
				clickIndex: 0,
				fixbtnzi: "全选",
				
				checkboxValue:[],
				searchText: "",
				notUpData: [],
				editPrice:0,
				editNum:0,
				editId: "",
				editIndex: -1,
				fixbtnShow:false,
				
				checkboxValue1:[],
				upData: [],
			}
		},
		onLoad() {
			var today = dayjs().format('YYYY-MM-DD')
			uni.getStorage({
				key: "listupid",
				fail: function(err) {
					uni.setStorageSync("listupid", 10000)
					uni.setStorageSync('bhdatemk', today)
				},
			});
			
			if (today != uni.getStorageSync("bhdatemk")) {
				uni.setStorageSync('listupid', 10000)
				uni.setStorageSync('bhdatemk', today)
			}
			
			this.delHistory()
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.notUpLoadAll("")
		},
		methods: {
			//监听 未上传单选择
			checkboxChange(event){
				if(event.length>0){
					this.fixbtnShow=true
				}else{
					this.fixbtnShow=false
				}
			},
			//监听 历史记录选择
			checkboxChange1(event){
				if(event.length>0){
					this.fixbtnShow=true
				}else{
					this.fixbtnShow=false
				}
			},
			// 点击未上传或历史记录
			onClickItem(item) {
				this.clickIndex = item.currentIndex
				if (item.currentIndex == 0) {
					this.notUpLoadAll("")
				} else if (item.currentIndex == 1) {
					this.upLoadAll()
				}
			},
			
			inputChange(val){
				let temparr=this.notUpData
				setTimeout(()=>{
					if(val==this.searchText){
						if(val.length>0){
							this.notUpLoadAll(val)
						}else{
							this.notUpLoadAll("")
						}
						uni.hideKeyboard()
					}
				},2000)
			},
			// 未上传单号 查询
			notUpLoadAll(text) {
				let tempArr=[]
				let sqls=""
				if(text==""){
					sqls="select * from pricelabelNotUp"
				}else{
					sqls="select * from pricelabelNotUp where pricelalist_id like '%"+text+"%'"
				}
				plus.sqlite.selectSql({
					name: 'only',
					sql: sqls,
					success: function(res) {
						var dhao=[]
						for(var i in res){
							dhao.push(res[i].pricelalist_id)
						}
						var Setdhao = new Set(dhao)
						var repeatdhao = [...Setdhao]
						for(var k =0;k<repeatdhao.length;k++){
							tempArr.push({
								"pricelalist_id":repeatdhao[k],
								"labelshop_name":"",
								"label_name":"",
								"labelgoods_date":"",
								"total_num": 0,
								"child":[]
							})
							for(var j in res){
								if(repeatdhao[k]==res[j].pricelalist_id){
									tempArr[k].labelshop_name=res[j].labelshop_name
									tempArr[k].label_name=res[j].label_name
									tempArr[k].labelgoods_date=res[j].labelgoods_date
									tempArr[k].total_num=(tempArr[k].total_num*10000+Number(res[j].labelgoods_num)*10000)/10000
									tempArr[k].child.push({
										"labelgoods_bm":res[j].labelgoods_bm,
										"labelgoods_sm":res[j].labelgoods_sm,
										"labelgoods_name":res[j].labelgoods_name,
										"labelgoods_num":res[j].labelgoods_num
									})
								}
							}
						}
						this.notUpData=tempArr
						console.log("this.notUpData",this.notUpData)
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			},
			// 未上传单号 删除
			notUpDel(bigobj, bigIndex, item, index) {
				plus.sqlite.executeSql({
					name: 'only',
					sql: "delete from pricelabelNotUp where pricelalist_id='" + bigobj.pricelalist_id +
						"' and labelgoods_sm='" + item.labelgoods_sm + "' and labelgoods_bm='" + item.labelgoods_bm + "'",
					success: function(res) {
						this.notUpLoadAll("")
						this.$nextTick(()=>{
							for (var u in this.$refs.collapseView){
								if(u==bigIndex){
									this.$refs.collapseView[u].resize();
									return
								}
							}
						})
						this.$refs.uToast.show({
							type: "success",
							message: "删除成功"
						})
					}.bind(this),
					fail: function(e) {
						console.log('删除SQL语句失败: ');
					}
				});
			},
			//编辑上传
			toedit(val) {
				uni.navigateTo({
					url: `/pages/function/component/goodspricelable/bjqxd?name=edit&pricelalist_id=${val.pricelalist_id}&labelshop_name=${val.labelshop_name}&label_name=${val.label_name}`
				})
			},
			// 编辑 未保存单据 的数量和价格
			toeditDetail(bigobj,bigIndex,item,index){
				this.editIndex=index
				this.editId=bigobj.pricelalist_id
				this.$nextTick(()=>{
					for (var u in this.$refs.collapseView){
						if(u==bigIndex){
							this.$refs.collapseView[u].resize();
							return
						}
					}
				})
				this.editNum=item.labelgoods_num
			},
			editFormat(value){
				return value.replace(/^(-)[1-9]*$/,'');
			},
			// 编辑保存
			editDetailSave(bigobj,bigIndex,child){
				let danhao = bigobj.pricelalist_id
				let spsm = child.labelgoods_sm
				let spbm = child.labelgoods_bm
				let updateNum = child.labelgoods_num
				plus.sqlite.executeSql({
					name: 'only',
					sql: "update pricelabelNotUp set labelgoods_num ='"+updateNum+"' where pricelalist_id='"+danhao+"' and labelgoods_sm='"+spsm+"' and labelgoods_bm='"+spbm+"'",
					success: function(ress) {
						// console.log("更新 editDetailSave 数据成功")
						this.editId=""
						this.editInde=-1
						let tNum=((Number(this.notUpData[bigIndex].total_num)*10000+Number(updateNum)*10000-Number(this.editNum)*10000)/10000).toFixed(4)
						this.$set(this.notUpData[bigIndex], "total_num", tNum)
						this.$refs.uToast.show({
							type:"success",
							message: "保存数据成功"
						})
					}.bind(this),
					fail: function(err) {
						this.$refs.uToast.show({
							type:"error",
							message: "保存数据失败"
						})
					}.bind(this)
				});
			},
			// 历史记录查询
			upLoadAll(){
				this.upData = []
				plus.sqlite.selectSql({
					name: 'only',
					sql: "select * from pricelabel",
					success: function(res) {
						var dhao=[]
						for(var i in res){
							dhao.push(res[i].pricelalist_id)
						}
						var Setdhao = new Set(dhao)
						var repeatdhao = [...Setdhao]
						for(var k =0;k<repeatdhao.length;k++){
							this.upData.push({
								"pricelalist_id":repeatdhao[k],
								"labelshop_name":"",
								"label_name":"",
								"labelgoods_date": "",
								"total_num": 0,
								"child":[]
							})
							for(var j in res){
								if(this.upData[k].pricelalist_id==res[j].pricelalist_id){
									this.upData[k].labelshop_name=res[j].labelshop_name
									this.upData[k].label_name=res[j].label_name
									this.upData[k].labelgoods_date=res[j].labelgoods_date
									this.upData[k].total_num=(this.upData[k].total_num*10000+Number(res[j].labelgoods_num)*10000)/10000
									this.upData[k].child.push({
										"labelgoods_bm":res[j].labelgoods_bm,
										"labelgoods_sm":res[j].labelgoods_sm,
										"labelgoods_name":res[j].labelgoods_name,
										"labelgoods_num":res[j].labelgoods_num
									})
								}
							}
						}
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			},
			delHistory(){
				plus.sqlite.selectSql({
					name: 'only',
					sql: "select * from pricelabel",
					success: function(res) {
						for (var i in res) {
							var start=`20${res[i].pricelalist_id.slice(2, 4)}-${res[i].pricelalist_id.slice(4, 6)}-${res[i].pricelalist_id.slice(6, 8)}`
							var startVal = dayjs(start).unix() * 1000
							var nowVal = dayjs(dayjs().format('YYYY-MM-DD')).unix() * 1000
							if (nowVal - startVal > 7*24*60*60*1000) {
								plus.sqlite.executeSql({
									name: 'only',
									sql: "delete from pricelabel where pricelalist_id='" + res[
											i].pricelalist_id + "' and labelgoods_sm='" +
										res[i].labelgoods_sm + "' and labelgoods_bm='" + res[i].labelgoods_bm + "'",
									success: function(res) {
										console.log('删除历史数据成功')
									}.bind(this),
									fail: function(e) {
										console.log('删除SQL语句失败: ');
									}
								});
							}
						}
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			},
			//全选
			chooseAll(){
				if(this.clickIndex==0){//全选未上传单
					if(this.checkboxValue.length==this.notUpData.length){
						this.checkboxValue=[]
						this.fixbtnShow=false
					}else{
						this.checkboxValue=[]
						this.fixbtnShow=true
						for(var i in this.notUpData){
							this.checkboxValue.push(this.notUpData[i].pricelalist_id)
						}
						console.log("全选 未上传单",this.checkboxValue)
					}
				}else if(this.clickIndex==1){//全选历史记录
					if(this.checkboxValue1.length==this.upData.length){
						this.checkboxValue1=[]
						this.fixbtnShow=false
					}else{
						this.checkboxValue1=[]
						this.fixbtnShow=true
						for(var i in this.upData){
							this.checkboxValue1.push(this.upData[i].pricelalist_id)
						}
						console.log("全选 历史记录",this.checkboxValue1)
					}
				}
			},
			shsc(){//审核上传
				let username=uni.getStorageSync("userid")
				let sn=uni.getStorageSync("sn")
				let uploadarr=[]
				let chooseArr=[]
				let sqls=""
				if(this.clickIndex==0){//审核上传 未上传单
					chooseArr=this.checkboxValue
				}else if(this.clickIndex==1){//审核上传 历史记录
					chooseArr=this.checkboxValue1
				}
				chooseArr.forEach((v,index,arrv)=>{
					let arr=[]
					let danhao=v
					if(this.clickIndex==0){
						sqls="select * from pricelabelNotUp where pricelalist_id='"+danhao+"'"
					}else if(this.clickIndex==1){
						sqls="select * from pricelabel where pricelalist_id='"+danhao+"'"
					}
					plus.sqlite.selectSql({
						name: 'only',
						sql: sqls,
						success: function(resel) {
							let fendian=resel[0].labelshop_name.split("-")[0]
							let labelLx=resel[0].label_name.split("-")[0]
							for(var i in resel){
								arr.push({
									"spbm":resel[i].labelgoods_bm,
									"spsmm":resel[i].labelgoods_sm,
									"Bhsl":resel[i].labelgoods_num
								})
							}
							uploadarr.push({
								"danhao":danhao,
								"fendian":fendian,
								"remark":labelLx,
								"isadd":"T",
								"userid":username,
								"sn":sn,
								"JsonSpxx":arr,
							})
							if(index==arrv.length-1){
								this.shscFunc(uploadarr)
							}
						}.bind(this),
						fail: function(err) {
							console.log('查询SQL语句失败: ');
						}
					});
				})
			},
			shscFunc(uploadarr){
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"upload": uploadarr
				}
				console.log("goshoping uploadarr dataes", dataes)
				
			},
			newOrder() {
				var now = dayjs().format('YYYY-MM-DD')
				var numx = parseInt(Math.random() * 100);
				if (numx < 10) {
					numx = "0" + numx;
				}
				var upid = Number(uni.getStorageSync('listupid')) + 1
				var str= "BJ" + now.split("-")[0].slice(2,4) + now.split("-")[1] + now.split("-")[2] + numx + uni.getStorageSync('userid') + upid;
				uni.setStorageSync('listupid', upid)
				uni.navigateTo({
					url: "/pages/function/component/goodspricelable/bjqxd?name=" + str
				});
			},
		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
		watch: {
			checkboxValue: function(newv, oldv) {
				if (newv.length == 0) {
					this.fixbtnShow=false
					this.fixbtnzi="全选"
				}else{
					this.fixbtnShow=true
					if (newv.length == this.notUpData.length){//全部选中
						this.fixbtnzi="取消全选"
					}else{
						this.fixbtnzi="全选"
					}
				}
			},
			checkboxValue1: function(newv, oldv) {
				if (newv.length == 0) {
					this.fixbtnShow=false
					this.fixbtnzi="全选"
				}else{
					this.fixbtnShow=true
					if (newv.length == this.upData.length){//全部选中
						this.fixbtnzi="取消全选"
					}else{
						this.fixbtnzi="全选"
					}
				}
			}
		},
		
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
		.box-content {
			padding-top: 90px;
			padding-bottom: 40px;
			
			.foldGroup{
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				border-radius: 10px;
				box-sizing: border-box;
				padding: 0 10px;
				margin-bottom: 10px;
				box-shadow: 0px 1px 5px 3px #e8e8e8;
				
				/deep/.u-checkbox{
					align-items: flex-start !important;
					.u-checkbox__icon-wrap{
						margin-top: 12px;
					}
				}
				
				.fold{
					width: calc(100% - 20px);
					
					/deep/.u-cell__body{
						padding: 0;
					}
					
					/deep/.u-collapse-item__content__text{
						padding: 0;
					}
					
					.fold-title{
						padding-bottom: 8px;
						.fold-title-t{
							font-size: 15px;
							color: #1c1c28;
							font-weight: 600;
							
							.dhliang{
								display: block;
								height: 12px;
								line-height: 12px;
								padding:2px 9px;
								// border: 1px solid #f13b44;
								background-color: #f13b44;
								border-radius: 15px;
								font-size: 12px;
								color: #fff;
								font-weight: 500;
							}
						}
						.fold-title-con{
							font-size: 12px;
							color: #999;
							font-weight: 400;
						}
						
						.fold-title-flex{
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
						
						.cu1{
							font-size: 14px;
							color: #3a3a3a;
						}
						.cu-price{
							color: #358CC9;
						}
					}
					.fold-title>*{
						margin-top: 8px;
					}
					
					.fold-content {
						padding-bottom: 10px;
						.multiple-border{
							border-top: 1px dotted #ccc;
						}
						.multiple-border>*{
							margin-top: 10px;
						}
						
						.card-flex-wrap{
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
							
							.card-row{
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
							
							.left-con{
								font-size: 12px;
								color: #999;
								font-weight: 400;
								margin-right: 4px;
							}
							.right-con{
								color: #1c1c28;
							}
						}
						
						.btns{
							display: flex;
							justify-content: space-around;
							margin-top: 8px;
							
							/deep/.u-button{
								width: 33%;
								margin: 0;
							}
						}
					}
				}
				
			}
			
			.fix-btn{
				width: 100%;
				display: flex;
				justify-content: space-around;
				position: fixed;
				left: 0;
				bottom: 8px;
				/deep/.u-button{
					border-radius: 30px;
					height: 32px;
					line-height: 32px;
				}
			}
			
			.active{
				background-color:#A0CFFF;
			}
			.xactive{
				background-color:#A0CFFF;
			}
			
			.searchBox {
				padding: 10px;
				.u-input {
					border-radius: 30px;
					background-color: #ededee;
				}
			}
			
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
