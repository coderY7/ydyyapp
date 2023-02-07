<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar" v-show="onepage">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">配送拣货</view>
			<view class="right"></view>
		</view>
		<view class="nav-bar" v-show="!onepage">
			<view class="left">
				<view class="navleftview" @tap="onepage=true">
					<uni-icons type="back" color="#fff"></uni-icons>
					<view>返回</view>
				</view>
			</view>
			<view class="center">配送拣货</view>
			<view class="right">
				<uni-icons custom-prefix="iconfont" type="icon-bi" color="#fff" size="20" @tap="editorder"></uni-icons>
				<text style="margin-left:10px;" @tap="reprint">打印</text>
			</view>
		</view>
		<view class="box-content">
			<view v-show="onepage" class="onepage">
				<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
					<u-form-item label="拣货工号:" :labelWidth="80" prop="userid" borderBottom>
						<u-input v-model="uFormModel.userid" disabled disabledColor="#fff" placeholder="请输入拣货工号"
							border="none"></u-input>
						<!-- <uni-icons type="right" size="16"></uni-icons> -->
					</u-form-item>
					<u-form-item label="拣货仓位:" :labelWidth="80" prop="store" borderBottom @tap="searchStore">
						<u-input placeholder="请选择仓位" v-model="uFormModel.store" disabled disabledColor="#fff" border="none">
						</u-input>
					</u-form-item>
				</u-form>
				
				<lyy-table class="lyy-table" :headers="thData" height="300px" :contents="tableData" :headerFixed="true"></lyy-table>
				<u-button type="primary" class="my-primary-button" text="开始拣货" throttleTime="1000" @tap="startPick">
					<uni-icons type="plusempty" size="20" color="#fff"></uni-icons>开始拣货
				</u-button>
			</view>
			<!-- 第二个拣货界面........... -->
			<view v-show="!onepage" class="twopage">
				<uni-collapse v-if="pickData.length!=0">
					<uni-collapse-item title-border="show"> 
						<template v-slot:title>
							<view class="uni-collapse-item__title-box">
								<text>
									*拣货单概况 (
									<font style="font-weight:600;font-size:17px;">箱号:</font>
									<font style="color:red;font-size:17px;">{{pickData[0].当前分箱号}}</font>)
								</text>
							</view>
						</template>
						<view class="content" style="padding:0 10px 10px;box-sizing:border-box;background-color:#fff;">
							<view class="row-describe">
								<text>拣货单号:</text>
								<text>{{pickData[0].拣货单号}}</text>
							</view>
							<view class="row-describe">
								<text>拣货分店:</text>
								<text>{{pickData[0].拣货分店}}</text>
							</view>
							<view class="row-describe">
								<text>应拣品项:</text>
								<text>{{pickData[0].应拣品项}}</text>
							</view>
							<view class="row-describe">
								<text>应拣总量:</text>
								<text>{{pickData[0].应拣总量}}</text>
							</view>
							<view class="row-describe">
								<text>已拣品项:</text>
								<text>{{pickData[0].已拣品项}}</text>
							</view>
							<view class="row-describe">
								<text>已拣数量:</text>
								<text>{{pickData[0].已拣数量}}</text>
							</view>
							
						</view>
					</uni-collapse-item>
				</uni-collapse>
				
				<view class="jh-detail" v-if="pickData2.length!=0">
					<view class="jh-detail-title">
						<text>
							*当前拣货序号:
							<font style="font-size:16px;font-weight:600;color:#FF994B"> {{pickData2[0].序号}}</font>
						</text>
						<u-button type="primary" text="上一个" size="mini" throttleTime="1000" @tap="prepick"></u-button>
						<u-button type="primary" text="下一个" size="mini" throttleTime="1000" @tap="nextpick"></u-button>
					</view>
					<view class="row-describe" style="font-size:16px;font-weight:600;color:red;">
						<text>拣货仓位:</text>
						<text>{{pickData2[0].拣货仓位}}</text>
					</view>
					<view class="row-describe">
						<text>商品条码:</text>
						<text>{{pickData2[0].商品条码}}</text>
					</view>
					<view class="row-describe">
						<text>商品名称:</text>
						<text>{{pickData2[0].商品名称}}</text>
					</view>
					<view class="row-describe">
						<text>规格包装:</text>
						<text>{{pickData2[0].规格}}/{{pickData2[0].单位}}    {{pickData2[0].件包装数}}/{{pickData2[0].物流单位}}</text>
					</view>
					<view class="row-describe">
						<text>库存数量:</text>
						<text>{{pickData2[0].库存数量}}</text>
					</view>
					<view class="row-describe">
						<text>配调数量:</text>
						<text>{{pickData2[0].配调数量}}</text>
					</view>
					<view class="row-describe">
						<text>包装数:</text>
						<text>{{pickData2[0].拣货包装数}}</text>
					</view>
					<view class="row-describe">
						<text>拣货数量:</text>
						<u-number-box min="0" inputWidth="90" v-model="pickData2[0].应拣数量" @change="valChange"></u-number-box>
					</view>
					<view class="btns">
						<u-button type="primary" :plain="true" text="换箱" throttleTime="1000" @tap="changeBox"></u-button>
						<u-button type="primary" text="保存" throttleTime="1000" @tap="picksave"></u-button>
					</view>
					<view class="btns">
						<u-button type="primary" :plain="true" text="取消" throttleTime="1000"></u-button>
						<u-button type="primary" text="更新" throttleTime="1000"></u-button>
					</view>
				</view>
				
			</view>
			
			<!-- 弹窗 -->
			<u-popup :show="popupShow" mode="center" class="u-popup-center" :closeable="true" @close="popupShow=false">
				<view>
					<u-checkbox-group v-model="checkboxValue" placement="column" iconPlacement="left">
						<u-checkbox v-for="(v,i) in storeData" :key="v.CWType" :label="v.CWType" :name="v.CWType">
						</u-checkbox>
					</u-checkbox-group>
					<view class="btns">
						<u-button type="primary" :plain="true" text="取消" throttleTime="1000" @tap="popupShow=false"></u-button>
						<u-button type="primary" text="确定" throttleTime="1000" @tap="checkboxChange"></u-button>
					</view>
				</view>
			</u-popup>
			<u-popup :show="editorderShow" mode="center" class="u-popup-center" :closeable="true" @close="editorderShow=false">
				<text class="popup-title">拣货清单（<text style="color:red;">红色未拣</text>）</text>
				<scroll-view style="max-height: 50vh;" scroll-y="true">
					<view class="list" v-for="(v, i) in editorderData">
						<view>
							<text v-if="v.状态=='待拣'" style="color:red;">{{v.商品名称}}</text>
							<text v-else style="color:green;">{{v.商品名称}}</text>
							-<text>{{v.商品条码}}</text>
						</view>
						<view>
							<text>应拣数: {{v.应拣数量}},调配数: {{v.配调数量}}</text>
						</view>
					</view>
				</scroll-view>
			</u-popup>
			<u-popup :show="printShow" mode="center" class="u-popup-center" :closeable="true" @close="printShow=false">
				<view>
					
				</view>
			</u-popup>
			
			<!-- <print ref="print"></print> -->
			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		getPickArea
	} from "@/network/api.js";
	// import print from '@/components/print/print';
	export default {
		components: {
			// print
		},
		data() {
			return {
				onepage:true,
				uFormModel: {
					userid: uni.getStorageSync("userid"),
					store: ""
				},
				uFormRules: {
					"userid": {
						type: "string",
						required: true,
						message: "请选择拣货工号",
						trigger: ["blur", "change"]
					},
					"store": {
						type: "string",
						required: true,
						message: "请选择仓位",
						trigger: ["blur", "change"]
					},
				},
				
				thData:[],
				tableData:[],
				// 第二个拣货界面。。。。。。。。。。。。
				  // 拣货单概况
				pickData:[],
				  // 当前拣货序号
				pickData2:[],
				
				
				// 弹窗
				popupShow: false,
				storeData: [],
				checkboxValue: [],
				editorderShow: false,
				editorderData:[],
				printShow:false,
			}
		},
		onLoad() {

		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			// this.$refs.print.printText()
		},
		onShow() {

		},
		methods: {
			searchStore() {
				this.popupShow = true
				this.pickdeal("", "", "", "", "", "", "", "10")
			},
			startPick() {
				this.$refs.uForm.validate().then(res => {
					this.onepage=false
					this.pickdeal(this.uFormModel.store, "", "", "", "", "", "", "11");
				})
			},
			checkboxChange() {
				let str=""
				this.checkboxValue.forEach((v,i,arr)=>{
					str+=v
					if(i!=arr.length-1){
						str+=";"
					}
				})
				// console.log("checkboxChange str",str)
				this.uFormModel.store=str
				this.pickdeal(str, "", "", "", "", "", "", "15")
				this.popupShow = false
			},
			// twopage......................................................................................
			editorder(){
				let v_jhdh=this.pickData[0].拣货单号
				this.pickdeal("", v_jhdh, "Query", "", "", "", "", "14")
			},
			reprint(){
				let v_jhdh=this.pickData[0].拣货单号
				this.pickdeal("",v_jhdh,"PageBox","","","","","14")
			},
			// 上一个
			prepick(){
				let v_jhdh=this.pickData[0].拣货单号
				let v_spxh="-"+this.pickData2[0].序号
				this.pickdeal(this.uFormModel.store,v_jhdh,"","",v_spxh,"","","11")
			},
			// 下一个
			nextpick(){
				let v_jhdh=this.pickData[0].拣货单号
				let v_spxh=this.pickData2[0].序号
				this.pickdeal(this.uFormModel.store,v_jhdh,"","",v_spxh,"","","11")
			},
			valChange(event){
				// console.log("sssssssssssssssssss",event)
				this.$set(this.pickData2[0],"应拣数量",event.value)
			},
			changeBox(){//换箱
				let v_jhdh=this.pickData[0].拣货单号
				let v_guid=this.pickData2[0].guid
				let v_spxh=this.pickData2[0].序号
				let v_pnum=this.pickData2[0].应拣数量
				this.pickdeal("",v_jhdh,"00",v_guid,v_spxh,v_pnum,"T","13");
			},
			picksave(){//保存
				let v_jhdh=this.pickData[0].拣货单号
				let v_guid=this.pickData2[0].guid
				let v_spxh=this.pickData2[0].序号
				let v_pnum=this.pickData2[0].应拣数量
				this.pickdeal("",v_jhdh,"00",v_guid,v_spxh,v_pnum,"","13")
			},
			pickdeal(parea, jhdbh, ctype, guid, orderid, gnum, newboxmark, dowhat) {
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"dowhat": dowhat, //10-获取仓位组,11-初始拣货工作,13-交互确认保存拣货数量,14-结束拣货作业，并提示打印封箱清单,15-打印封箱清单 或 查询清单
					"userid": this.uFormModel.userid,
					"pickarea": parea,
					"orderid": orderid,
					"gnum": gnum,
					"newboxmark": newboxmark,
					"jhdbh": jhdbh,
					"vtype": ctype,
					"guid": guid
				}
				console.log(dowhat+" getPickArea data", data)
				getPickArea(data).then((res) => {
					console.log(dowhat+" getPickArea res", res)
					if (dowhat == "10") {//搜索拣货仓位
						if (res.error_code == 0) {
							this.storeData = res.data
						} else {

						}
					} else if (dowhat == "11") {//初始拣货工作
					
						if (res.data[0].Result==0) {
							
							if (res.data2.length > 0) {
								this.pickData=res.data
								this.pickData2=res.data2
							}else{
								this.$refs.uToast.show({
									type:"error",
									message: "没有更多的拣货信息"
								})
							}
							
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "获取拣货单失败"
							})
						}
						
					} else if (dowhat == "13") {// 12-,13-交互确认保存拣货数量
						
						if (res.data[0].Result==0) {
							if (res.data2.length > 0) {
								this.pickData=res.data
								this.pickData2=res.data2
								
								if(newboxmark == "T"){//换箱打印 封箱清单
									let v_boxnum = parseInt(this.pickData[0].当前分箱号) - 1
									this.pickdeal("",jhdbh,"Print","",v_boxnum,"","","14")//拣货完成
								}
							}else if (res.data2.length = 0) {
								//打印封箱清单
								this.pickdeal("",jhdbh,"Print","",this.pickData[0].当前分箱号,"","","14")//拣货完成
								
							}
							
						}else if (res.data[0].Result==100) {
							this.pickData2=[]
							this.pickData2.push({
								"序号":0
							})
							this.pickdeal("",jhdbh,"OK","","","","","13")
							this.$refs.uToast.show({
								type:"error",
								message: res.data[0].Descrption
							})
							
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "保存失败"
							})
						}
						
					} else if (dowhat == "14") {//结束拣货作业，并提示打印封箱清单
						this.editorderData=res.data
						if(ctype=="Print"){
							
							//打印操作
							if(res.data[0].pstr != ""&&uni.getStorageSync("print")==true){
								
								if(uni.getStorageSync("device")=="HI98"){
									
								}else{
									this.$refs.print.printText()
								}
							}
							
						}else if(ctype=="Query"){
							if(res.data.length>1){
								this.editorderShow=true
							}else{
								this.$refs.uToast.show({
									type:"error",
									message: "查询拣货信息失败，稍后重试！"
								})
							}
						}else if(ctype=="PageBox"){
							console.log("PageBox 14 res",res)
							if(res.data.length==1){
								
								this.pickdeal("",jhdbh,"Print","",res.data[0].封箱号,"","","14")//拣货完成
							}else{
								
							}
							
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: res.data[0].Description
							})
						}
						
					} else if (dowhat == "15") {//15-打印封箱清单 或 查询清单
						if (res.error_code == 0) {
							this.thData=[]
							for(var i in res.data[0]){
								this.thData.push({
									"label": i,
									"key": i,
									"width": "200px"
								})
							}
							this.tableData=res.data
							
						} else if (res.error_code == 500) {
							this.$refs.uToast.show({
								type: "error",
								message: "选择的仓位组暂时没有拣货作业"
							})
						}
					}

				}).catch((err) => {
					console.log(err)
				})
			},
			
		},
		computed:{
			skin(){
				return this.$store.state.skin;
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
			padding-top: calc(var(--status-bar-height) + 44px);
			/deep/.u-form {
				background-color: #fff;
			
				.u-form-item__body {
					padding: 8px 0px;
				}
			}
			
			.onepage{
				/deep/.u-button {
					margin-top: 10px;
					width: 93%;
				}
			}
			.lyy-table{
				background-color: #fff;
			}
			
			.btns{
				display: flex;
				justify-content: space-around;
				margin: 10px 0;
				
				/deep/.u-button{
					width: 75px;
					margin: 0;
				}
			}
			
			//。。。。。。。。。。。。。。。。。。。。。。。
			/deep/.uni-collapse-item__title-box {
				height: 44px;
				line-height: 44px;
				padding: 0 10px;
			}
			/deep/.uni-collapse-item .uni-icons{
				color: #323232 !important;
			}
			/deep/.uni-collapse-item__wrap {
				width: 100%;
			
				.uni-collapse-item__wrap-content {
					width: 100%;
			
					.uni-card {
						box-sizing: border-box;
					}
				}
			}
			
			/deep/.uni-collapse-item__wrap-content>* {
				width: 100%;
			}
			
			//。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			.row-describe>uni-text:first-child{
				display: inline-block;
				width: 90px;
				text-align-last: justify;
				margin-right: 10px;
			}
			.row-describe>uni-text:last-child{
				word-break: break-all;
			}
			.row-describe{
				padding: 5px 0;
			}
			
			.jh-detail>.row-describe{
				display: flex;
				align-items: center;
			}
			.jh-detail{
				padding: 10px;
				margin-top: 10px;
				background-color: #fff;
				.jh-detail-title{
					display: flex;
					justify-content: space-between;
					padding: 8px 0;
					/deep/.u-button {
						width: 20%;
					}
				}
			}
			
			/deep/.u-popup {
				.u-checkbox {
					padding:7px 0;
				}
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
				}
				.btns{
					display: flex;
					justify-content: space-around;
					.u-button{
						width: 28%;
						margin: 0;
						height: 34px;
					}
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