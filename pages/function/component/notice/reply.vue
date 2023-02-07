<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">
				<text>公告回复</text>
			</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<view class="notice" v-for="(v,i) in data" :key="v.id">
				<view class="notice-title">{{v.noticetitle}}</view>
				<view class="sub-title">
					<text>{{v.publishmanid}}</text>
					<text>{{v.publishtime}}</text>
				</view>
				<view class="notice-con" v-html="v.noticecontent">
					{{v.noticecontent}}
				</view>
				<view class="comment" v-for="(item,index) in commentData">
					<view class="comment-title">
						<uni-icons custom-prefix="iconfont" type="icon-xiaolian" size="16"></uni-icons>
						<text class="xiao">{{item.userName}}</text>
						<text class="jixiao">({{item.replyTime}})</text>
					</view>
					<view class="comment-con">{{item.replyContent}}</view>
				</view>
				<view>
					<u-textarea v-model="textareaVal" placeholder="添加回复" maxlength="-1" border="none"></u-textarea>
				</view>
			</view>
			<u-button type="primary" text="回复" throttleTime="1000" @tap="reply" v-show="replyShow"></u-button>
			
			<u-toast ref="uToast"></u-toast>
			
		</view>
	</view>
</template>

<script>
	import {
		getnotice,
		oaNoticeRey,
		oaNoticeb
	} from "@/network/api.js";
	export default {
		data() {
			return {
				replyShow: false,
				data:[],
				textareaVal:"",
				commentData:[]
			}
		},
		onLoad: function(option) {
			this.option=option
			this.previewFunc(option.id)
			
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			reply(){
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"id": 1122,
					"userid": uni.getStorageSync("userid"),
					"nid": this.option.id,
					"content": this.textareaVal,
					"vtype": "edit",
					"remark": "app2",
				}
				console.log("回复公告 data",JSON.stringify(data))
				oaNoticeRey(data).then((res) => {
					console.log("回复公告 res",res)
					if(res.data[0].result=="0"){
						this.$refs.uToast.show({
							type: "success",
							message: "回复成功"
						})
						this.getComment(this.option.id)
					}else{
						
					}
				}).catch((err) => {
					console.log(err) 
				})
			},
			previewFunc(id) {
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"id": id, //记录ID
					"publishmanId": "00000", //发布人ID
					"typeID": "0", //公告类型ID
					"title": "", //公告主题
					"content": "", //公告内容
					"keywords": "", //关键词
					"departmentIds": "", //发布对象ID
					"departmentName": "", //发布对象用户名
					"starttime": "2000-01-01", //起始时间
					"endtime": "2099-01-01", //结束时间
					"isReply": "", //是否允许回复
					"vtype": "detail", //操作类型
					"remark": "app2",
				}
				console.log("公告详情previewFunc data", data)
				getnotice(data).then((res) => {
					console.log("公告详情previewFunc res", res)
					if(res.err_code=="0"){
						if(res.data[0].isReply=="T"){
							this.replyShow=true
						}else{
							this.replyShow=false
						}
						this.data=res.data
						this.data[0].noticecontent=res.data[0].noticecontent.replace(/&lt;/g,"<")
						this.data[0].noticecontent=res.data[0].noticecontent.replace(/&gt;/g,">")
						this.getComment(id)
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
				uni.hideLoading();
			},
			getComment(nid){
				let data={
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"nid": nid,
					"publishmanId": "00000",
					"noticeTypeId": "0",
					"title": "",
					"content": "",
					"keywords": "",
					"departmentIds": "",
					"departmentName": "",
					"startTime": "2000-01-01",
					"endTime": "2099-01-01",
					"isReply": "",
					"vtype": "detail",
					"remark": "app2"
				}
				// console.log("公告回复数据 data",data)
				oaNoticeb(data).then((res) => {
					// console.log("公告回复数据 res",res)
					if(res.err_code==0){
						this.commentData=[]
						for(var i in res.data2){
							if(res.data2[i].replyContent){
								let a=res.data2[i].replyTime.split(".")[0]
								let b=a.split("T")
								res.data2[i].replyTime=b[0]+" "+b[1]
								this.commentData.push(res.data2[i])
							}
						}
						// console.log("this.commentData",this.commentData)
					}else{
						
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
				padding:8px;
				min-height: 80px;
			}
			/deep/.u-textarea{
				border-top: 1px solid $uni-border-color;
				border-radius: 0;
			}
			.comment{
				padding:8px;
				.comment-title{
					display: flex;
					align-items: center;
					.xiao{
						margin: 0 7px;
						font-size: 14px;
					}
					.jixiao{
						font-size: 12px;
					}
				}
				.comment-con{
					text-indent: 1.5em;
					word-break: break-all;
				}
			}
			
		}
		/deep/.u-button{
			margin-top: 10px;
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>
