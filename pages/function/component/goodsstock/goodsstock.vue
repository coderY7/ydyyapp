<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
			</view>
			<view class="center">商品库存概况</view>
			<view class="right"></view>
		</view>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="条码:" :labelWidth="50" prop="barCode" borderBottom>
					<u-input placeholder="请输入条码查询" v-model="uFormModel.barCode" border="none">
					</u-input>
					<uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#606060"
						@tap="scan()"></uni-icons>
				</u-form-item>
				<u-form-item label="分店:" :labelWidth="50" prop="fendian" borderBottom @tap="searchFd">
					<u-input placeholder="搜索分店" disabled disabledColor="#fff" v-model="uFormModel.fendian"
						border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>

				<u-button type="primary" class="my-primary-button" text="查询库存" throttleTime="1000" @tap="searchStock">
					<uni-icons type="search" size="20" color="#fff"></uni-icons>查询库存
				</u-button>
				<!-- <u-button type="primary" class="my-primary-button" :plain="true" text="扫码查询" throttleTime="1000" @tap="scan()">
					<uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#fff"></uni-icons>扫码查询
				</u-button> -->
			</u-form>
			
			<uni-card :title="stockObj.table0[stockIndex].spmc" v-if="Object.keys(stockObj).length!=0">
				<uni-row>
					<uni-col :span="12">
						<text class="b-xi">条码:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].spsmm}}</text>
					</uni-col>
					<uni-col :span="12">
						<text class="b-xi">编码:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].spbm}}</text>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<text class="b-xi">规格:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].ggdw}}</text>
					</uni-col>
					<uni-col :span="12">
						<text class="b-xi">价格:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].nsjg}}</text>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<text class="b-xi">会员价:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].hyjg}}</text>
					</uni-col>
					<uni-col :span="12">
						<text class="b-xi">进价:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].pjjj}}</text>
					</uni-col>
				</uni-row>
				<uni-row v-show="!oneData">
					<uni-col :span="12">
						<text class="b-xi">单位:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].wldw}}</text>
					</uni-col>
					<uni-col :span="12">
						<text class="b-xi">包装:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].wlbzs}}</text>
					</uni-col>
				</uni-row>
				<uni-row v-show="oneData">
					<uni-col :span="12">
						<text class="b-xi">促销价:</text>
						<text class="b-cu">{{stockObj.table1[stockIndex].cxjg}}</text>
					</uni-col>
					<uni-col :span="12">
						<text class="b-xi">库存:</text>
						<text class="b-cu">{{stockObj.table1[stockIndex].库存量}}</text>
					</uni-col>
				</uni-row>
				<uni-row v-show="oneData">
					<uni-col :span="12">
						<text class="b-xi">促销开始:</text>
						<text class="b-cu">{{stockObj.table1[stockIndex].cxkssj}}</text>
					</uni-col>
					<uni-col :span="12">
						<text class="b-xi">促销结束:</text>
						<text class="b-cu">{{stockObj.table1[stockIndex].cxjssj}}</text>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="24">
						<text class="b-xi">主供商家:</text>
						<text class="b-cu">{{stockObj.table0[stockIndex].ghsj}}</text>
					</uni-col>
				</uni-row>
			</uni-card>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="list" v-for="(v, i) in fdlist" @tap="radioChange(v.shop_num+'-'+v.shop_name)">
						<text v-html="v.shop_num">{{v.shop_num}}</text>-
						<text v-html="v.shop_name">{{v.shop_name}}</text>
					</view>
				</scroll-view>
			</uni-drawer>
			<u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
				<scroll-view style="max-height: 60vh;" scroll-y="true">
					<view class="shop">
						<view class="list" v-for="(v, i) in stockObj.table0" @tap="popupok(i)">
							<view class="shop-l">{{i+1}}:</view>
							<view class="shop-r">
								<view class="shop-r-t">
									<text class="t-name">{{v.spmc}}</text>
								</view>
								<view class="shop-r-b">
									<view>
										<text class="b-xi">编码:</text>
										<text class="b-cu">{{v.spbm}}</text>
									</view>
									<view>
										<text class="b-xi">条码:</text>
										<text class="b-cu">{{v.spsmm}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="closebtn" @tap="popupShow=false">取消</view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>
			
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		getGoodsStock
	} from "@/network/api.js";
	export default {
		data() {
			return {
				uFormModel: {
					barCode: "",
					fendian: "",
				},
				uFormRules: {
					"barCode": [{
							type: "string",
							required: true,
							message: "请填写条码",
							trigger: ["blur", "change"]
						},
						{
							asyncValidator: (rule, value, callback) => {
								var reg = /^[0-9]{4,18}$/;
								if (reg.test(value)) {
									callback();
								} else {
									callback(new Error("条码不完整或有误，请重输入"));
								}
							}
						}
					]
				},
				fdlist: [],
				stockIndex: 0,
				stockObj: "",
				oneData: true,
				popupShow: false,
			}
		},
		onLoad: function(option) {

		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			radioChange(e) {
				this.uFormModel.fendian = e
				this.$refs.drawer.close();
			},
			searchFd() {
				plus.sqlite.selectSql({
					name: 'downloadDb',
					sql: 'select * from shop',
					success: function(res) {
						this.fdlist = res
						this.$refs.drawer.open();
					}.bind(this),
					fail: function(e) {
						this.toDownload()
						console.log('查询SQL语句失败: ');
					}.bind(this)
				});
			},
			searchStock() {
				this.$refs.uForm.validate().then(resf => {
					let data={
						"access_token": uni.getStorageSync("access_token"),
						"sn": uni.getStorageSync("sn"),
						"vtype": "03",
						"spsmm": this.uFormModel.barCode,
						"ckfdbh": this.uFormModel.fendian.split("-")[0]
					}
					console.log("searchStock data", data)
					getGoodsStock(data).then((res) => {
						console.log("searchStock res", res)
						if(res.error_code==0){
							this.stockObj=res
							if(res.table0.length>1){
								this.popupShow=true
								this.oneData=false
							}else if(res.table0.length=1){
								this.oneData=true
								this.stockIndex=0
							}else{
								
							}
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: res.message
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				}).catch(errors => {
					
				})
			},
			scan() {
				uni.scanCode({
					success: (res) => {
						console.log("扫码内容", res)
						this.uFormModel.barCode = res.result
						this.searchStock()
					}
				});
			},
			popupok(index){
				this.stockIndex=index
				this.popupShow=false
				// cxjg
				// kcl
				// cxkssj
				// cxjssj
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
			padding-bottom: 10px;
			/deep/.uni-card{
				margin:10px 0 0 !important;
				padding: 0 !important;
				
				.b-xi {
					color: #b1b1b1;
					font-weight: 400;
				}
				
				.b-cu {
					color: #717171;
					font-weight: 500;
				}
			}
			/deep/.uni-card__content .uni-row{
				padding: 3px 0;
			}
			
			/deep/.u-form {
				.u-form-item__body {
					padding-top: 8px;
					padding-bottom: 8px;
				}
			
				.u-button {
					margin-top: 10px;
				}
			}
			
			.u-input {
				border-radius: 30px;
			}
			.tabcon>uni-view{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
				border-bottom: 1px solid #EAEBEC;
			}
			
		}
		.box-content>* {
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
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>