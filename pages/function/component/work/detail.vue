<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center"></view>
			<view class="right"></view>
		</view>
		<view class="box-content">

			<view class="detail" v-if="option.LinkState == 'W'||option.LinkState == 'WNotP'">
				<view class="list" v-for="(v,i) in djData">{{v}}</view>
				<u-textarea v-model="textareaValue" placeholder="请添加备注意见"></u-textarea>
				<view class="btns">
					<u-button type="primary" :plain="true" text="不同意" throttleTime="1000" @tap="dealWork('F')"></u-button>
					<u-button type="primary" text="同意" throttleTime="1000" @tap="dealWork('O')"></u-button>
				</view>
				
				<lyy-table class="lyy-table" :headers="thData" :contents="tableData" :headerFixed="true" :height="tableH"></lyy-table>
			</view>
			<view class="detail" v-else-if="option.LinkState == 'N'">
				<view class="notice" v-for="(v,i) in data" :key="v.id">
					<view class="notice-title">{{v.noticeTitle}}</view>
					<view class="sub-title">
						<text>{{v.publishmanId}}</text>
						<text>{{v.publishTime}}</text>
					</view>
					<view class="notice-con" v-html="v.NoticeContent">
						{{v.NoticeContent}}
					</view>
					
				</view>
				<u-textarea v-model="textareaValue" placeholder="请添加备注意见"></u-textarea>
				<view class="btns">
					<u-button type="primary" :plain="true" text="不同意" throttleTime="1000" @tap="dealWork('F')"></u-button>
					<u-button type="primary" text="同意" throttleTime="1000" @tap="dealWork('O')"></u-button>
				</view>
				
			</view>

			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		getDJdata,
		getnotice,
		oaWorkFlowWCk,
		oaNoticeCk
	} from "@/network/api.js";
	export default {
		data() {
			return {
				option: "",
				textareaValue: "",
				djData: "",
				tableH: "",
				thData: [],
				tableData: [],
				data:[]
			}
		},
		onLoad(option) {
			console.log("工作内容 option", option)
			this.option=option
			if (option.LinkState == 'W' || option.LinkState == 'WNotP') {
				this.getdjdata(option.CheckBillNo, option.Wbilltype, "head")
			} else if (option.LinkState == 'N') {
				this.getNotice(option.CheckBillNo)
			} else {
				this.$refs.uToast.show({
					type: "error",
					message: "该项工作需要您在PC客户端处理！"
				})
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			uni.getSystemInfo({
				success: function(res) {
					this.tableH= res.screenHeight-330+"px"
				}.bind(this)
			});
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			getdjdata(CheckBillNo, Wbilltype, datamark) {
				let datas = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"djbh": CheckBillNo,
					"djtype": Wbilltype,
					"datamark": datamark
				}
				console.log(datas.datamark + " getDJdata datas", datas)
				getDJdata(datas).then((res) => {
					console.log(datas.datamark + " getDJdata res", res)
					if (datas.datamark == "head") {
						this.djData = res[0]
						this.getdjdata(CheckBillNo, Wbilltype, "detail")
					} else if (datas.datamark == "detail") {
						this.thData = []
						for (var i in res[0]) {
							this.thData.push({
								"label": i,
								"key": i,
								"width": "120px"
							})
						}
						this.tableData = res
					}

				}).catch((err) => {
					console.log(err)
				})
			},
			getNotice(CheckBillNo) {
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"id": CheckBillNo, //记录ID
					"publishmanId":uni.getStorageSync("userid"), //发布人ID
					"typeID": "0", //公告类型ID
					"title": "", //公告主题
					"content": "", //公告内容
					"keywords": "", //关键词
					"departmentIds": "", //发布对象ID
					"departmentName": "", //发布对象用户名
					"starttime": "2000-01-01", //起始时间
					"endtime": "2050-01-01", //结束时间
					"isReply": "", //是否允许回复
					"vtype": "ck", //操作类型
					"remark": "app2",
				}
				console.log("工作流 公告详情 data", data)
				getnotice(data).then((res) => {
					console.log("工作流 公告详情 res", res)
					if(res.err_code=="0"){
						this.data=res.data
						this.data[0].NoticeContent=res.data[0].NoticeContent.replace(/&lt;/g,"<")
						this.data[0].NoticeContent=res.data[0].NoticeContent.replace(/&gt;/g,">")
						// console.log("this.data  object........",this.data)
					}else{
						this.$refs.uToast.show({
							type: "error",
							message: "错误"
						})
					}
				}).catch((err) => {
					console.log(err) 
				})
			},
			dealWork(state){
				if(this.textareaValue){
					this.dealWorkFunc(state, this.textareaValue)
					
				}else{
					let str=""
					if(state=="O"){
						str="请填写不同意原因"
					}else if(state=="F"){
						str="请填写同意原因"
					}
					this.$refs.uToast.show({
						type:"error",
						message: str
					})
				}
			},
			dealWorkFunc(state,textareaValue){
				let data={}
				if (this.option.LinkState == 'W' || this.option.LinkState == 'WNotP' || this.option.LinkState == 'N') {
					data={
						"access_token": uni.getStorageSync("access_token"),
						"sn": uni.getStorageSync("sn"),
						"checkzt": state,
						"workinfoid": this.option.RecordID,
						"checkuser": uni.getStorageSync("userid"),
						"checksm": textareaValue,
						"linkstate": this.option.LinkState,
						"dtmark": "app2"
					}
				}
				console.log("工作流 处理 data", data)
				oaWorkFlowWCk(data).then((res) => {
					console.log("工作流 处理 res", res)
					if(res[0].Result==0){
						
						if (this.option.LinkState == 'N') {//公告审核提交
							if(res[0].ProZT=="O"){
								let dataes={
									"access_token": uni.getStorageSync("access_token"),
									"sn": uni.getStorageSync("sn"),
									"id": this.option.RecordID,
									"nid": this.option.CheckBillNo,
									"ckid": "1",
									"userid": uni.getStorageSync("userid"),
									"vtype": "edit",
									"remark": "app2",
									"content": textareaValue
								}
								oaNoticeCk(dataes).then((resnotice) => {
									console.log("工作流 公告详情 resnotice", resnotice)
									if(resnotice){
										this.$refs.uToast.show({
											type:"success",
											message: "工作审核成功"
										})
										setTimeout(()=>{
											uni.navigateBack({
												delta: 1
											});
										},1800)
									}
								}).catch((err) => {
									console.log(err) 
								})
								
							}else{
								this.$refs.uToast.show({
									type:"success",
									message: "工作审核成功"
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									});
								},1800)
							}
							
						}else if (this.option.LinkState == 'W' || this.option.LinkState == 'WNotP') {
							this.$refs.uToast.show({
								type:"success",
								message: "工作审核成功"
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								});
							},1800)
						}
						
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: "工作审核失败，请稍后再试"
						})
					}
				}).catch((err) => {
					console.log(err) 
				})
			}
			
			
		},
		computed: {
			skin() {
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
			padding-top: calc(var(--status-bar-height) + 52px);
			.detail>* {
				margin-top: 10px;
			}
		
			.btns {
				display: flex;
				justify-content: space-around;
		
				/deep/.u-button {
					width: 28%;
					margin: 0;
				}
			}
		
			.list {
				margin-top: 8px;
			}
		
			.list:first-child {
				margin-top: 0px;
			}
		}
		.notice{
			border: 1px solid $uni-border-color;
			border-radius: 5px;
			background-color: #fff;
			
			margin-top: 10px;
			.notice-title{
				font-size: 16px;
				font-weight: 600;
				padding: 8px 0;
				text-align: center;
			}
			.sub-title{
				padding: 8px;
				text-align: right;
			}
			.sub-title>uni-text:first-child{
				color: #DB9D3B;
				margin-right: 5px;
			}
			.sub-title>uni-text:last-child{
				color: #359689;
			}
			.notice-con{
				padding:0 8px;
				min-height: 80px;
				border-bottom: 1px solid #c8c7cc;
			}
			
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
