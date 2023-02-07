<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack" v-if="!ifFile&&!ifImg">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
				<view class="navleftview" v-else @tap="ifFile=false,ifImg=false">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="center" v-if="!ifFile&&!ifImg">协作功能</view>
			<view class="center" v-else>上传文件</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view v-if="!ifFile&&!ifImg">
				<view class="form-card">
					<view class="view-flex">
						<text class="form-left-text">单号:</text>
						<u-input placeholder="请输入单号" v-model="uFormModel.djbh">
						</u-input>
					</view>
					<view class="view-flex" @tap="searchDjlx">
						<text class="form-left-text">单据类型:</text>
						<u-input placeholder="请选择单据类型" disabled disabledColor="#fff" v-model="uFormModel.djtype">
							<template slot="suffix">
								<view v-if="uFormModel.djtype!=''" @tap.stop="clearAlone('djtype')">
									<uni-icons type="clear" size="19" color="#e1e1e1"></uni-icons>
								</view>
							</template>
						</u-input>
					</view>
					<view class="view-flex">
						<text class="form-left-text">状态:</text>
						<u-radio-group v-model="uFormModel.ztbz" placement="row">
							<u-radio key="A" label="等待" name="A"></u-radio>
							<u-radio key="O" label="完成" name="O"></u-radio>
						</u-radio-group>
					</view>
					<u-button type="primary" class="my-primary-button" text="查询" throttleTime="2000" @tap="search">
					</u-button>
				</view>
				
				<view class="dj-card" v-for="(v,i) in djData" @tap="todoxz(v,i)">
					<view class="dj-card-title">{{v.djbh}}</view>
					<view class="dj-card-con">
						<view class="multiples">
							<view class="multiple-con">
								<text class="left-con">协作类型:</text>
								<text class="right-con" v-if="v.djtype.indexOf('OCR')>-1">上传图片</text>
								<text class="right-con" v-else>选择附件</text>
							</view>
							<view class="multiple-con">
								<text class="left-con">单据类型:</text>
								<text class="right-con">{{v.djtype}}</text>
							</view>
						</view>
						<view class="multiples">
							<view class="multiple-con">
								<text class="left-con">分店:</text>
								<text class="right-con">{{v.fdbh}}</text>
							</view>
							<view class="multiple-con">
								<text class="left-con">分店名:</text>
								<text class="right-con">{{v.fdmc}}</text>
							</view>
						</view>
						<view class="multiples">
							<view class="multiple-con">
								<text class="left-con">申请人:</text>
								<text class="right-con">{{v.userid}}</text>
							</view>
							<view class="multiple-con">
								<text class="left-con">状态:</text>
								<text class="small-circle" style="background-color:#F9AE3D;" v-if="v.ztbz=='A'"></text>
								<text class="small-circle" style="background-color:#5AC725;" v-else></text>
								<text class="right-con" style="color:#F9AE3D;" v-if="v.ztbz=='A'">等待</text>
								<text class="right-con" style="color:#5AC725;" v-else>完成</text>
							</view>
						</view>
						<view class="">
							<text class="left-con">协作时间:</text>
							<text class="right-con">{{v.uploaddate}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<fileUpload @scFileData="scFileData" v-if="ifFile"></fileUpload>
			
			<view v-if="ifImg">
				<mk-upload :sourceType="['camera','album']" :imgList="imgList" @onDelete="onDelete"
					@onChoose="onChoose" :maxChooseCount="9" :maxCount="20" />
				<u-button type="primary" class="my-primary-button" text="上传" throttleTime="2000" @tap="upImage">
				</u-button>
			</view>
		</view>
		
		
		<u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
			<scroll-view style="max-height: 60vh;" scroll-y="true">
				<view>
					<view class="list" v-for="(v, i) in selectData" @tap="titleChange(v.id,v.name)">
						<text>{{v.id}}</text>-
						<text>{{v.name}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="closebtn" @tap="popupShow=false">取消</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
		
 
	</view>
</template>

<script>
	import dayjs from "dayjs";
	import fileUpload from "@/components/fileUpload/fileUpload.vue";
	import mkupload from "@/components/mk-upload/mk-upload.vue";
	import {
		Extfiles,
		InAppUpload
	} from "@/network/api.js"
	export default {
		components: {
			fileUpload,
			mkupload
		},
		data() {
			return {
				uFormModel:{
					djbh: "",
					djtype: "",
					ztbz: "A",
				},
				djData:[],
				rowData:"",
				ifFile:false,
				ifImg:false,
				imgList:[],
				selectData:[],
				popupShow:false
			};
		},
		onLoad(option) {
			
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			// #endif
		},
		methods: {
			//单头选择
			searchDjlx(){
				this.selectData=[
					{
						id:"CGD",
						name:"采购单"
					},
					{
						id:"SPBHD",
						name:"补货单"
					},
					{
						id:"SPRKD",
						name:"入库单"
					},
					{
						id:"SPPDB",
						name:"盘点单"
					}
				]
				this.popupShow=true
			},
			clearAlone(id){
				this.uFormModel[id]=""
			},
			titleChange(id,name){
				this.uFormModel.djtype=`${id}-${name}`
				this.popupShow=false
			},
			search(){
				this.inappupload({
					"vtype": "get",
					"djbh": this.uFormModel.djbh,
					"djtype": this.uFormModel.djtype==""?this.uFormModel.djtype:this.uFormModel.djtype.split("-")[0],
					"ztbz": this.uFormModel.ztbz,
				})
			},
			
			//
			inappupload(obj){//pc协作
				let dataes={ 
					"access_token": uni.getStorageSync("access_token"),
					"vtype": obj.vtype,//get:查询协作列表;ok:协作上传完成后更新状态
					"djbh": obj.djbh,
					"djtype": obj.djtype,
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"companyid": uni.getStorageSync("companyid"),
					"ztbz": obj.ztbz,//A:等待协作;O:完成协作
				}
				// console.log("PC发起手机协作上传文件 dataes", dataes)
				// InAppUpload(dataes).then((res) => {
				// 	console.log(obj.vtype+"————PC发起手机协作上传文件 res", res)
				// 	if (res.error_code == 0) {
				// 		if(obj.vtype=="get"){
				// 			for(var i in res.data){
				// 				res.data[i].uploaddate=res.data[i].uploaddate.split("T")[0]+" "+res.data[i].uploaddate.split("T")[1].split(".")[0]
				// 			}
				// 			this.djData=res.data
				// 		}else if(obj.vtype=="ok"){
				// 			this.$set(this.djData[this.rowIndex], "ztbz", "O")
				// 			this.$forceUpdate();
				// 		}
				// 	}else{
				// 		this.$refs.uToast.show({
				// 			type: "error",
				// 			message: "查询失败"
				// 		})
				// 	}
				// }).catch((err) => {
				// 	console.log(err)
				// })
				
				uni.request({
					url: "http://erpai.mzsale.com/mzsale/web/basic/in/app/upload",
					data: dataes,
					method: "POST",
					header: {
						"Content-Type": "application/json"
					},
					success: (res) => {
						console.log(obj.vtype+"————PC发起手机协作上传文件 res", res)
						if (res.data.error_code == 0) {
							if(obj.vtype=="get"){
								for(var i in res.data.data){
									res.data.data[i].uploaddate=res.data.data[i].uploaddate.split("T")[0]+" "+res.data.data[i].uploaddate.split("T")[1].split(".")[0]
								}
								this.djData=res.data.data.reverse()
							}else if(obj.vtype=="ok"){
								this.$set(this.djData[this.rowIndex], "ztbz", "O")
								this.$forceUpdate();
							}
						}else{
							this.$refs.uToast.show({
								type: "error",
								message: "查询失败"
							})
						}
					}
				})
			},
			todoxz(item,index){
				if(item.ztbz=="A"){
					this.rowData=item
					this.rowIndex=index
					if(item.djtype.indexOf("OCR")>-1){//ocr
						this.ifImg=true
					}else{
						this.ifFile=true
					}
				}else{
					this.$refs.uToast.show({
						type: "success",
						message: "已协作完成"
					})
				}
			},
			// 上传图片
			onDelete(index) {
				this.imgList.splice(index, 1);
			},
			onChoose(e) {
				e.tempFilePaths.forEach((v, i, arr) => {
					this.imgList.push(v);
				})
			},
			upImage(){
				let temparr=[]
				this.imgList.forEach((v,i,arr)=>{
					uni.uploadFile({
						url: "http://erpai.mzsale.com/mzsale/web/basic/upload",
						filePath: v,
						name: "file",
						success: (res) => {
							let jsonRes=JSON.parse(res.data)
							if(jsonRes.error_code==0){
								temparr.push({
									"data":res.data
								})
								if(i==arr.length-1){
									console.log("上传图片 temparr",temparr);
									this.scFileData(temparr)
								}
							}else{
								this.$refs.uToast.show({
									type: "error",
									message: "上传失败"
								})
							}
						},
						fail: (err) => {
							console.log("上传图片 err",err);
						},
					});
				})
			},
			
			// 上传图片、文件返回数据
			scFileData(fileArr){
				this.ifFile=false
				this.ifImg=false
				let arr=[]
				let filetypes=""
				for(var i in fileArr){
					let jsonRes=JSON.parse(fileArr[i].data)
					if(jsonRes.pathlist[0].path.split(".")[1]=="jpg"){
						filetypes="img"
					}else if(jsonRes.pathlist[0].path.split(".")[1]=="jpeg"){
						filetypes="img"
					}else if(jsonRes.pathlist[0].path.split(".")[1]=="png"){
						filetypes="img"
					}else if(jsonRes.pathlist[0].path.split(".")[1]=="zip"){
						filetypes="zip"
					}else{
						filetypes="doc"
					}
					arr.push({
						"usetype": "dj",
						"spbm": "",
						"spsmm": "",
						"filetype": filetypes,
						"filepath": jsonRes.pathlist[0].path,
					})
				}
				this.handleDj(this.rowData,arr,"add")
			},
			handleDj(row,fileArr,vtype){//更新单据信息状态
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": vtype,
					"djbh": row.djbh,
					"djtype": row.djtype,
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"companyid": uni.getStorageSync("companyid"),
					"filelist": fileArr,
				}
				// console.log("协作 更新单据！！@@ dataes", dataes)
				// Extfiles(dataes).then((res) => {
				// 	console.log("协作 更新单据！！@@ res", res)
				// 	if (res.error_code == 0) {
				// 		this.inappupload({
				// 			"vtype": "ok",
				// 			"djbh": row.djbh,
				// 			"djtype": row.djtype,
				// 			"ztbz": ""
				// 		})
				// 	}else{
				// 		this.$refs.uToast.show({
				// 			type: "error",
				// 			message: "更新失败"
				// 		})
				// 	}
				// }).catch((err) => {
				// 	console.log(err)
				// })
				uni.request({
					url: "http://erpai.mzsale.com/mzsale/web/basic/extfiles",
					data: dataes,
					method: "POST",
					header: {
						"Content-Type": "application/json"
					},
					success: (res) => {
						console.log("协作 更新单据！！@@ res", res)
						if (res.data.error_code == 0) {
							this.inappupload({
								"vtype": "ok",
								"djbh": row.djbh,
								"djtype": row.djtype,
								"ztbz": ""
							})
						}else{
							this.$refs.uToast.show({
								type: "error",
								message: "更新失败"
							})
						}
					}
				})
			}
		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
		watch: {
			imgList: function(newv, oldv) {
				if (newv.length > 20) {
					this.imgList = this.imgList.splice(0, 20)
				}
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
		
		.box-content {
			padding-top: calc(var(--status-bar-height) + 52px);
			padding-bottom: 10px;
			
			.form-card{
				padding: 10px;
				background-color: #fff;
				border-radius: 10px;
				box-sizing: border-box;
				box-shadow: 0px 1px 5px 3px #e8e8e8;
				position: relative;
				.view-flex{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.form-left-text{
					display: block;
					width: 76px;
				}
			}
			.form-card>*{
				margin-bottom: 10px;
			}
			.form-card>*:last-child{
				margin-bottom: 0px;
			}
			
			.dj-card{
				margin-top: 10px;
				border-radius: 10px;
				box-sizing: border-box;
				padding: 10px;
				box-shadow: 0px 1px 5px 3px #e8e8e8;
				.dj-card-title{
					font-size: 17px;
					color: #1c1c28;
					font-weight: 600;
					margin-bottom: 4px;
					padding-bottom: 4px;
					border-bottom: 1px solid #ccc;
				}
				.dj-card-con{
					.multiples {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 8px;
						.multiple-con {
							width: 50%;
							display: flex;
							align-items: center;
						}
						.small-circle{
							display: inline-block;
							width:6px;
							height:6px;
							border-radius: 6px;
							margin-right: 5px;
						}
					}
					.left-con{
						color: #999;
						font-weight: 400;
						margin-right: 4px;
					}
					.right-con{
						color: #1c1c28;
					}
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