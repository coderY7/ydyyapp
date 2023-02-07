<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<view @tap="toSet">
					<image src="@/static/images/21.jpg"></image>
					<text>{{userid}}</text>
				</view>
			</view>
			<view class="center">{{fdbh}}-{{fdmc}}</view>
			<view class="right">
				<uni-icons type="search" size="20" @tap="search" color="#fff" style="margin-right:5px;"></uni-icons>
				<view class="right_notice" @tap="topcxz">
					<uni-icons type="notification" size="20" color="#fff"></uni-icons>
					<u-badge type="error" max="99" :value="badgeVal"
						style="position:absolute;top:-5px;right:-6px;transform: scale(0.7);"></u-badge>
				</view>
			</view>
		</view>
		<view class="box-content">
			<scroll-view scroll-y="true" :show-scrollbar="true" :style="contentSty">
				<uni-card class="processCard">
					<view class="process">
						<view class="process-list">
							<view class="list-image-view">
								<image class="" src="@/static/images/dsh.png" mode="widthFix"></image>
								<u-badge type="error" max="99" value="1"></u-badge>
							</view>
							<text>待审核</text>
						</view>
						<view class="process-list">
							<view class="list-image-view">
								<image class="" src="@/static/images/dbh.png" mode="widthFix"></image>
								<u-badge type="error" max="99" value="1"></u-badge>
							</view>
							<text>待补货</text>
						</view>
						<view class="process-list">
							<view class="list-image-view">
								<image class="" src="@/static/images/drk.png" mode="widthFix"></image>
								<u-badge type="error" max="99" value="1"></u-badge>
							</view>
							<text>待入库</text>
						</view>
						<view class="process-list">
							<view class="list-image-view">
								<image class="" src="@/static/images/kcyj.png" mode="widthFix"></image>
								<u-badge type="error" max="99" value="1"></u-badge>
							</view>
							<text>库存预警</text>
						</view>
					</view>
				</uni-card>

				<Functions></Functions>

				<uni-swipe-action class="uni-swipe-action">
					<view :style="noticeStyle">
						<view class="sectionTitle">
							<view class="sectionPic"></view>
							<text>最新公告</text>
						</view>
						<uni-swipe-action-item v-for="(v,i) in noticeList" :key="v.id">
							<template v-slot:left>
								<u-button type="primary" size="small" text="已读"></u-button>
								<u-button type="warning" size="small" text="删除"></u-button>
							</template>
							<view class="noticeList" @tap="reply(v)">
								<image src="@/static/images/nvip.png" mode="widthFix" v-if="v.typename=='重要公告'"></image>
								<image src="@/static/images/ncool.png" mode="widthFix" v-else-if="v.typename=='特殊公告'">
								</image>
								<image src="@/static/images/nsup.png" mode="widthFix" v-else-if="v.typename=='商家公告'">
								</image>
								<image src="@/static/images/nual.png" mode="widthFix" v-else></image>
								<view class="right">
									<view class="right-title">
										<view>
											<text class="cu">{{v.typename}}</text>
											<text class="xiao">阅读({{v.readNum}})</text>
										</view>
										<text class="ts">{{v.publishTime}}</text>
									</view>
									<view class="right-con">
										<text class="con">{{v.noticeTitle}}</text>
									</view>
								</view>
								<!-- <view class="uni-swipe_text--center-right" v-if="isNoticeTop">
									<view class="angleTag"></view>
									<view class="angleZi">已置顶</view>
								</view> -->

							</view>
							<template v-slot:right>
								<u-button type="primary" size="small" :text="isNoticeTop?'取消置顶':'置顶'"
									@tap="topFunc('公告')">
								</u-button>
							</template>
						</uni-swipe-action-item>
						<u-cell title="查看全部公告" icon="list" isLink v-if="noticeList.length>0" @tap="lookAll('notice')">
						</u-cell>
						<uni-swipe-action-item v-else>
							<template v-slot:left></template>
							<view class="noticeList">
								<image src="@/static/images/notice.png" mode="widthFix"></image>
								<view class="right">
									<view class="right-title">
										<view>
											<text class="cu">应用提示</text>
											<text class="xiao">阅读(0)</text>
										</view>
										<text class="ts">{{now}}</text>
									</view>
									<view class="right-con">
										<text class="con">通知列表中没有消息可以阅读！</text>
									</view>
								</view>
							</view>
							<template v-slot:right></template>
						</uni-swipe-action-item>
					</view>

					<view :style="workStyle">
						<view class="sectionTitle">
							<view class="sectionPic"></view>
							<text>最新工作</text>
						</view>
						<uni-swipe-action-item v-for="(v,i) in workList">
							<template v-slot:left>
								<u-button type="primary" size="small" text="同意"></u-button>
								<u-button type="warning" size="small" text="驳回"></u-button>
							</template>
							<view class="workList" @tap="handle(v)">
								<image src="@/static/images/w4.png" mode="widthFix"
									v-if="v.LinkState == 'W'||v.LinkState == 'H'||v.LinkState == 'T'"></image>
								<image src="@/static/images/w7.png" mode="widthFix"
									v-else-if="v.LinkState == 'P'||v.LinkState == 'PrnLable'||v.LinkState == 'R'">
								</image>
								<image src="@/static/images/w3.png" mode="widthFix" v-else></image>
								<view class="right">
									<view class="right-title">
										<view>
											<text class="cu">{{v.InfoTypeName}}</text>
										</view>
										<text class="ts">{{v.InfoDate}}</text>
									</view>
									<view class="right-con">
										<text class="con">{{v.InfoContent}}</text>
									</view>
								</view>
							</view>
							<template v-slot:right>
								<u-button type="primary" size="small" :text="isWorkTop?'取消置顶':'置顶'"
									@tap="topFunc('工作')">
								</u-button>
							</template>
						</uni-swipe-action-item>
						<u-cell title="查看全部工作" icon="list" isLink v-if="workList.length>0" @tap="lookAll('work')">
						</u-cell>
						<uni-swipe-action-item v-else>
							<template v-slot:left></template>
							<view class="noticeList">
								<image src="@/static/images/notice.png" mode="widthFix"></image>
								<view class="right">
									<view class="right-title">
										<view>
											<text class="cu">应用提示</text>
											<text class="xiao"></text>
										</view>
										<text class="ts">{{now}}</text>
									</view>
									<view class="right-con">
										<text class="con">今天还没有需要处理的工作哦！</text>
									</view>
								</view>
							</view>
							<template v-slot:right></template>
						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>
				<!-- <u-button type="primary" class="my-primary-button" text="签字" @tap="toSign">
				</u-button> -->

			</scroll-view>
		</view>
		<tabbar :tabVal="0"></tabbar>
		<toupdate ref="toupdate"></toupdate>
		<u-toast ref="uToast"></u-toast>


	</view>
</template>

<script>
	// dayjs 官网：https://dayjs.fenxianglu.cn/
	import dayjs from 'dayjs';
	import Functions from "@/pages/function/function.vue";
	import tabbar from "@/components/tabbar/tabbar.vue";
	import toupdate from "./component/toupdate/toupdate.vue";
	import {
		InAppUpload,
		oaNoticec,
		oaWorkFlow
	} from "@/network/api.js";
	export default {
		components: {
			Functions,
			tabbar,
			toupdate,
		},
		data() {
			return {
				userid: uni.getStorageSync("userid"),
				fdbh: uni.getStorageSync("fdbh"),
				fdmc: uni.getStorageSync("fdmc"),
				badgeVal: 0,
				contentSty: "",
				isNoticeTop: false,
				noticeStyle: {},
				isWorkTop: false,
				workStyle: {},
				noticeList: [],
				now: dayjs().format('YYYY-MM-DD'),
				workList: [],
			};
		},
		onLoad(option) {
			uni.getSystemInfo({
				success: (res) => {
					this.contentSty = {
						"height": res.screenHeight - res.statusBarHeight - 94 + "px"
					}
				}
			});
		},
		onReady() {
			this.oaNoticecFunc()
			this.getwork("G0001", -99)

			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			let newDate = dayjs().format('YYYY-MM-DD')
			if (newDate != uni.getStorageSync('checkVersionDate')) {
				this.deleteDb()
				this.$refs.toupdate.checkVersion(newDate)
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
			this.inappupload()
			
			// uni.getSavedFileList({ //获取所有本地缓存文件
			// 	success: (resFil)=> {
			// 		console.log("cccc获取所有本地缓存文件 resFil", resFil);
			// 		uni.getStorageInfo({ //清除语音播报缓存键值
			// 			success: (resto)=> {
			// 				for(var i in resFil.fileList){
			// 					resto.keys.forEach((v, j, arr) => {
			// 						if (v.indexOf("$voice-") > -1) {
			// 							let pathXLen=resFil.fileList[i].filePath.split("/").length
			// 							if(uni.getStorageSync(v).indexOf(resFil.fileList[i].filePath.split("/")[pathXLen-1])>-1){
			// 								uni.removeSavedFile({
			// 									filePath: resFil.fileList[i].filePath,
			// 									success: function(resdel) {
			// 										console.log("删除语音播报缓存 成功！！！！");
			// 									}
			// 								});
			// 							}
			// 							uni.removeStorageSync(v)
			// 							console.log("rrrrr语音播报缓存键值", v+"   ："+uni.getStorageSync(v))
			// 						}
			// 					})
			// 				}
			// 			}
			// 		});
			// 	}
			// });
		},
		methods: {
			// toSign() {
			// 	uni.navigateTo({
			// 		url: "/components/vsign/vsign"
			// 	});
			// },


			topcxz() {
				uni.navigateTo({
					url: "/pages/home/component/collaboration/collaboration"
				});
			},
			search() {
				uni.navigateTo({
					url: "/pages/home/component/search/search"
				});
			},
			inappupload() { //pc协作
				let dataes = {
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "get", //get:查询协作列表;ok:协作上传完成后更新状态
					"djbh": "",
					"djtype": "",
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"companyid": uni.getStorageSync("companyid"),
					"ztbz": "A", //A:等待协作;O:完成协作
				}
				// InAppUpload(dataes).then((res) => {
				// 	if (res.error_code == 0) {
				// 		this.badgeVal=0
				// 		for(var i in res.data){
				// 			if(res.data[i].ztbz=="A"){
				// 				this.badgeVal+=1
				// 			}
				// 		}
				// 		// #ifdef APP-PLUS
				// 		plus.runtime.setBadgeNumber(this.badgeVal);
				// 		// #endif
				// 	}else{

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
						if (res.data.error_code == 0) {
							this.badgeVal = 0
							for (var i in res.data.data) {
								if (res.data.data[i].ztbz == "A") {
									this.badgeVal += 1
								}
							}
							// #ifdef APP-PLUS
							plus.runtime.setBadgeNumber(this.badgeVal);
							// #endif
						} else {

						}
					}
				})
			},
			toSet() {
				uni.navigateTo({
					url: "/pages/my/component/set/set"
				});
			},
			oaNoticecFunc() {
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"sn": uni.getStorageSync("sn"),
					"id": "0", //记录ID
					"userid": uni.getStorageSync("userid"),
					"nid": "0",
					"startTime": "2000-01-01",
					"endTime": "2099-01-01",
					"typeID": "0", //公告类型ID
					"vtype": "sel",
					"content": "", //公告内容
					"keywords": "", //关键词
					"remark": "app2",
				}
				oaNoticec(data).then((res) => {
					console.log("首页 oaNoticec res", res)
					if (res.error_code == 0) {
						this.noticeList = res.data.slice(0, 5)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			reply(val) {
				uni.navigateTo({
					url: `/pages/function/component/notice/reply?id=${val.id}`
				})
			},
			handle(item) {
				if (item.ztbz == 'NO' || item.ztbz == 'O') {
					this.$refs.uToast.show({
						type: "error",
						message: "该项工作需要您在PC客户端处理！"
					})
					return
				} else if (item.ztbz == 'T' && (item.LinkState == 'P' || item.LinkState == 'R')) {
					this.$refs.uToast.show({
						type: "error",
						message: "该项工作需要您在PC客户端处理！"
					})
					return
				} else if (item.ztbz == 'T' && item.LinkState == 'PrnLable') {
					this.$refs.uToast.show({
						type: "error",
						message: "该项工作需要您在PC客户端处理！"
					})
					return
				} else {
					uni.navigateTo({
						url: `/pages/function/component/work/detail?RecordID=${item.RecordID}&LinkState=${item.LinkState}&ztbz=${item.ztbz}
                  &CheckBillNo=${item.CheckBillNo}&Wbilltype=${item.Wbilltype}&InfoContent=${item.InfoContent}`
					})
				}

			},
			getwork(groupId, recordID) {
				let data = {
					"access_token": uni.getStorageSync("access_token"),
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"groupId": groupId,
					"recordID": recordID, //-99 拉取未完成工作，-1 拉取已完成工作
					"sn": uni.getStorageSync("sn"),
					"dtmark": "app2"
				}
				// console.log("oaWorkFlow data", data)
				oaWorkFlow(data).then((res) => {
					console.log("首页 oaWorkFlow res", res)
					if (res.error_code == 0) {
						this.workList = res.data.slice(0, 5)
					}
				}).catch((err) => {
					console.log(err)
				})
			},

			topFunc(text) {
				if (text == "公告") {
					this.isNoticeTop = !this.isNoticeTop
					if (this.isNoticeTop) {
						this.noticeStyle = {
							"order": -1
						}
					} else {
						this.noticeStyle = {}
					}
				} else if (text == "工作") {
					this.isWorkTop = !this.isWorkTop
					if (this.isWorkTop) {
						this.workStyle = {
							"order": -1
						}
					} else {
						this.workStyle = {}
					}
				}

			},
			lookAll(item) {
				uni.navigateTo({
					url: `/pages/function/component/${item}/${item}`
				});
			},
			deleteDb() {
				uni.getStorage({
					key: 'downloadTime',
					success: (res) => {
						let today = new Date().valueOf()
						let downloadTime = res.data
						if (today - downloadTime >= 7 * 24 * 60 * 60 * 1000) {
							uni.getSavedFileList({
								success: (resget) => {
									// console.log("获取已保存文件列表 resget",resget)
									if (resget.fileList.length > 0) {
										uni.setStorageSync('downloadTime', 0)
										for (var i in resget.fileList) {
											if (resget.fileList[i].filePath.indexOf(".db") > -1) {
												uni.removeSavedFile({
													filePath: resget.fileList[i].filePath,
													success: (resdel) => {
														console.log(
															"删除本地下载 db 文件成功 ！！！！！！"
														)
													}
												});
											}
										}
									}
								}
							});
						}
					},
					fail: (err) => {

					},
				});
			},

		},
		computed: {
			skin() {
				return this.$store.state.skin;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		background-image: linear-gradient(to bottom, var(--linear-bg) 0%, #fff 50%, #fff 100%);

		.status-bar {
			background-color: transparent;
		}

		.nav-bar {
			width: 100%;
			height: 44px;
			padding: 0 10px;
			font-size: 12px;
			// background-color: #83BFE8;
			background-image: none;
			position: fixed;
			top: var(--status-bar-height);
			z-index: 998;
			display: flex;

			.left {
				width: 80px;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				uni-view {
					width: 100%;
					display: flex;
					flex-wrap: nowrap;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
				}
			}

			uni-image {
				width: 26px;
				height: 26px;

				img {
					width: 26px;
					height: 26px;
				}
			}

			.center {
				width: calc(100% - 160px);
			}

			.right {
				width: 60px;
				display: flex;
				flex-wrap: nowrap;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
			}

			.right_notice {
				position: relative;
			}
		}

		.box-content {
			padding-top: calc(var(--status-bar-height) + 44px);

			.noticeList {
				padding: 5px 10px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				box-sizing: border-box;
				border: 1px solid #e9e9e9;
				// border-right: 1px solid #e9e9e9;
				// border-bottom: 1px solid #e9e9e9;

				uni-image {
					width: 36px;
					height: 36px;
					margin-right: 10px;

					img {
						width: 36px;
						height: 36px;
					}
				}

				.right {
					width: 100%;

					.right-title {
						display: flex;
						justify-content: space-between;
					}
				}

				.cu {
					font-size: 15px;
				}

				.xiao {
					margin-left: 3px;
					font-size: 12px;
					font-weight: 400;
					color: #8d8d8d;
				}

				.ts {
					font-size: 12px;
					font-weight: 400;
					color: #8d8d8d;
				}

				.con {
					font-size: 14px;
					font-weight: 500;
					color: #8d8d8d;
				}
			}

			.workList {
				padding: 5px 10px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				box-sizing: border-box;
				border-left: 1px solid #e9e9e9;
				border-right: 1px solid #e9e9e9;
				border-bottom: 1px solid #e9e9e9;

				uni-image {
					width: 36px;
					height: 36px;
					margin-right: 10px;

					img {
						width: 36px;
						height: 36px;
					}
				}

				.right {
					width: 100%;

					.right-title {
						display: flex;
						justify-content: space-between;
					}
				}

				.cu {
					font-size: 15px;
				}

				.ts {
					font-size: 12px;
					font-weight: 400;
					color: #8d8d8d;
				}

				.con {
					font-size: 14px;
					font-weight: 500;
					color: #8d8d8d;
					word-break: break-all;
				}
			}

			// .uni-swipe_text--center-left {
			// 	float: left;
			// }

			// .uni-swipe_text--center-right {
			// 	// float: right;
			// 	position: relative;
			// }

			// .angleTag {
			// 	width: 0;
			// 	height: 0;
			// 	border-style: solid;
			// 	border-width: 44px 0px 0 44px;
			// 	border-color: #00adb5 transparent transparent transparent;
			// 	position: relative;
			// }

			// .uni-swipe_text--center-right>.angleZi {
			// 	width: auto;
			// 	position: absolute;
			// 	top: 6px;
			// 	right: -4px;
			// 	font-size: 12px;
			// 	line-height: 16px;
			// 	writing-mode: horizontal-tb;
			// 	transform: rotateZ(45deg) scale(0.8);
			// }

			.uni-swipe-action {
				display: flex;
				flex-direction: column;
			}

			// .uni-swipe-action>* {
			// 	margin-top: 10px;
			// }

			/deep/.uni-swipe {
				// height: 44px;
				// line-height: 44px;
				// border-top: 1px solid #DADBDE;
				// border-bottom: 1px solid #DADBDE;
				background-color: #fff;

				.uni-swipe_text--center uni-text {
					padding-left: 10px;
				}

				.u-button {
					border-radius: 0;
					height: 100%;
				}
			}

			/deep/.processCard {
				margin: 0 0 10px !important;
				padding: 15px 0 !important;
				border-radius: 10px;
				text-align: center;

				.process {
					display: flex;
					justify-content: space-around;
					align-items: center;

					.process-list {
						.list-image-view {
							position: relative;
							width: 36px;
							margin: auto;

							uni-image {
								width: 24px;
								height: 24px;
								border-radius: 0;

								img {
									width: 24px;
									height: 24px;
								}
							}

							.u-badge {
								position: absolute;
								top: -7px;
								right: -7px;
							}
						}

						uni-text {
							font-size: 14px;
						}
					}
				}

				.uni-card__content {
					padding: 0 !important;
				}
			}

			/deep/.u-notice-bar {
				border-radius: 10px;
				margin-top: 10px;
			}
		}

	}
</style>
<style lang="scss">
	page {}
</style>
