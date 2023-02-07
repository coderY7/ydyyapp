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
			<u-form ref="uForm" :model="uFormModel" :rules="uFormRules">
				<u-form-item label="商品编码:" :labelWidth="90" prop="goods_spbm" borderBottom>
					<u-input placeholder="请至少输入一位条码" v-model="uFormModel.goods_spbm" border="none" :disabled="option.orderType=='edit'" @change="spbmChange">
					</u-input>
				</u-form-item>
				<view>
					<view class="shopTishi">
						<view class="shopTishi-view show-dots" v-if="uFormModel.goods_spmc">
							<text class="left-con">名称:</text>
							<text>{{uFormModel.goods_spmc}}</text>
						</view>
					</view>
					<view class="shopTishi">
						<view class="shopTishi-view-half" v-if="uFormModel.goods_spsmm">
							<text class="left-con">条码:</text>
							<text>{{uFormModel.goods_spsmm}}</text>
						</view>
						<view class="shopTishi-view-half" v-if="uFormModel.goods_pdje">
							<text class="left-con">配调金额:</text>
							<text>{{goods_pdje}}</text>
						</view>
					</view>
				</view>
				<u-form-item label="配调数量:" :labelWidth="90" prop="goods_pdsl" borderBottom>
					<u-number-box v-model="uFormModel.goods_pdsl" min="1" inputWidth="100"></u-number-box>
				</u-form-item>
				<u-form-item label="配调价格:" :labelWidth="90" prop="goods_pdjj" borderBottom>
					<u-number-box v-model="uFormModel.goods_pdjj" min="0" inputWidth="100"></u-number-box>
				</u-form-item>
				<u-form-item label="商品备注:" :labelWidth="90" prop="goods_remark" borderBottom>
					<u-input placeholder="商品备注" v-model="uFormModel.goods_remark" border="none">
					</u-input>
				</u-form-item>
				
				<view class="btns">
					<u-button type="primary" text="扫码添加" throttleTime="1000" @tap="getScan" v-if="ispda"></u-button>
					<u-button type="primary" text="保存" throttleTime="1000" @tap="saveGoods"></u-button>
					<u-button type="primary" text="删除" throttleTime="1000" @tap="delGoods" v-if="option.orderType!='add'"></u-button>
				</view>
			</u-form>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
				<scroll-view style="max-height: 60vh;" scroll-y="true">
					<view v-if="ifDrawer=='goods_spbm'" class="shop">
						<view class="list" v-for="(v, i) in list" @tap="radioChange(v,false)">
							<view class="shop-l">{{i+1}}:</view>
							<view class="shop-r">
								<view class="shop-r-t">
									<text class="t-name">{{v.spmc}}</text>
									<text class="t-price">￥{{v.pjjj}}</text>
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
			<movable-area class="movable-area">
				<movable-view class="movable-view" :x="x" :y="y" direction="all" :animation="false" :out-of-bounds="true"
					v-show="!isVoiceMode">
					<view class="iconimgs guideJS2">
						<view class="iconView" @tap="changeSwitch">
							<uni-icons custom-prefix="iconfont" type="icon-yuyin" color="#fff" size="30"></uni-icons>
						</view>
					</view>
				</movable-view>
				<movable-view class="movable-view movable-view-large" :x="x" :y="y" direction="all" :animation="false"
					:out-of-bounds="true" v-show="isVoiceMode">
					<goodsVoice ref="goodsVoice" :step="yuyinModelArr" :list.sync="list" :searchCode="searchCode"
						@changeParentValue="changeParentValue" @changeVoiceShow="changeVoiceShow" @doing="doing">
					</goodsVoice>
				</movable-view>
			</movable-area>
			
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				option:"",
				uFormModel:{
					goods_spbm:"",
					goods_spsmm:"",
					goods_spmc:"",
					goods_pdsl:1,
					goods_pdjj:0,
					goods_pdje:0,
					goods_remark:""
				},
				uFormRules:{
					"goods_spbm": {
						asyncValidator: (rule, value, callback) => {
							if(value.replace(/[^\x00-\xff]/g, "xx").length>=4){
								callback();
							}else{
								callback(new Error("请输入4位及以上的商品编码/名称/条码 查询"));
							}
						}
					}
				},
				goodsinfo:"",
				ifDrawer:"",
				list:[],
				ispda:uni.getStorageSync("pda"),
				popupShow:false,
				// 语音data
				x: 400,
				y: 300,
				isVoiceMode: false,//是否语音模式
				doingId: "",
				doingindex: 100,
				yuyinModelArr:[],
				searchCode: 400,
				yuyinArr:[{
						"tips": "请说出您要搜索的商品",//提示
						"id": "goods_spbm",//需要填充的id
						"fixedId": "shoping",//固定值，部门-depart，分店-fendian，商家-business，商品-shoping，数量-num，价格-price，备注-remarks，开关-switch，保存-save
						"searchFunc": "searchSpbm",//需要搜索的函数名
						"isSearchCon": true,//是否需要搜索内容
						"nextFunc": "radioChange",//是否需要进行搜索 的函数名
						"completeFunc": "",//步骤完成的函数名
						"isSkip": false,//是否可以跳过该步骤，不需要输入
						"isNext": true,//该步骤完成后是否可以自动跳转到下一步
					},
					{
						"tips": "请说出您要输入的配调数量",
						"id": "goods_zpsl",
						"fixedId": "num",
						"searchFunc": "",
						"isSearchCon": false,
						"nextFunc": "",
						"completeFunc": "",
						"isSkip": true,
						"isNext": true,
					},
					{
						"tips": "请说出您要输入的配调价格",
						"id": "goods_zpjj",
						"fixedId": "price",
						"searchFunc": "",
						"isSearchCon": false,
						"nextFunc": "",
						"completeFunc": "",
						"isSkip": true,
						"isNext": true,
					},
					{
						"tips": "请说出您要输入的备注",
						"id": "goods_remark",
						"fixedId": "remarks",
						"searchFunc": "",
						"isSearchCon": false,
						"nextFunc": "",
						"completeFunc": "",
						"isSkip": true,
						"isNext": true,
					},
					{
						"tips": "请确认是否保存商品",
						"id": "",
						"fixedId": "save",
						"searchFunc": "",
						"isSearchCon": false,
						"nextFunc": "",
						"completeFunc": "saveGoods",
						"isSkip": false,
						"isNext": false,
					}
				],
				
			}
		},
		onLoad: function(option) {
			this.option=option
			if(option.orderType=="add"){
				
			}else if(option.orderType=="edit"){
				this.uFormModel.goods_spbm=option.spbm
				this.uFormModel.goods_spsmm=option.spsmm
				this.uFormModel.goods_spmc=option.spmc
				this.uFormModel.goods_pdsl=option.phsl
				this.uFormModel.goods_pdjj=option.phjg
				this.uFormModel.goods_pdje=Number(option.phsl)*Number(option.phjg)
				this.uFormModel.goods_remark=option.remark
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		onShow() {
			
		},
		methods: {
			// 语音模式。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			changeSwitch(){
				this.yuyinModelArr=this.yuyinArr
				this.isVoiceMode=true
				uni.getSystemInfo({
					success: function(res) {
						this.x=0
						this.y=res.screenHeight-res.statusBarHeight-94
					}.bind(this)
				});
			},
			changeVoiceShow(){// 进入普通模式
				this.yuyinModelArr=[]
				this.isVoiceMode=false
				uni.getSystemInfo({
					success: function(res) {
						this.x=res.screenWidth-10
						this.y=res.screenHeight-400
					}.bind(this)
				});
			},
			changeParentValue(obj){
				if(obj.nextFunc){
					if(obj.searchFunc){
						this[obj.nextFunc](obj.val,true)
					}else{//为类似 switch开关时的 操作
						this[obj.nextFunc](obj.val)
					}
				}else{
					if(!obj.isSearchCon){
						this.uFormModel[obj.id]=obj.val
					}
				}
				if(obj.completeFunc){
					this[obj.completeFunc]()
				}
				if(obj.next){
					this.$refs.goodsVoice.stepFunc(obj.next)
				}
			},
			doing(id,index){
				this.doingId=id
				this.doingindex=index
			},
			clickYuyin(id,isnext){//语音 执行顺序跳转
				for(var i in this.yuyinModelArr){
					if(this.yuyinModelArr[i].id==id){
						if(isnext){//从下一步开始顺序执行
							if(i!=this.yuyinModelArr.length-1){
								this.$refs.goodsVoice.stepFunc(Number(i)+1)
								return
							}
						}else{//从本步骤开始顺序执行
							this.$refs.goodsVoice.stepFunc(Number(i))
							return
						}
					}
				}
			},
			
			// 搜索商品编码
			spbmChange(val) {
				setTimeout(() => {
					if (val != "") {
						if (val == this.uFormModel.goods_spbm) {
							this.$refs.uForm.validateField("goods_spbm",(error)=>{
								if(error.length==0){
									this.searchSpbm(val)
									uni.hideKeyboard()
								}
							})
						}
					}
				}, 2000)
			},
			searchSpbm(val){
				this.searchCode=400
				this.ifDrawer="goods_spbm"
				uni.showLoading({
					title: '搜索中，请稍后'
				});
				let userid=uni.getStorageSync("userid")
				let fendian=uni.getStorageSync("fdbh")
				let dataes= JSON.stringify(
					'GOODSCERTIFY${"barcode":"' + val +
						'","filterbz":"T","userid":"' +
						userid +
						'","hideColumns":"true","fdbh":"' +
						fendian +
						'","checkbox":"true"}')
				commonMain(dataes).then((res) => {
					console.log("searchSpbm res",res)
					if(res.retflag==0){
						this.list=res.list.rows.slice(0, 20)
						this.popupShow=true
						this.searchCode=0
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: res.retmsg
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange(event,isauto){
				// console.log("点击商品编码 event",event)
				this.goodsinfo=event
				this.uFormModel.goods_spbm=event.spbm
				this.uFormModel.goods_spsmm=event.spsmm
				this.uFormModel.goods_spmc=event.spmc
				this.uFormModel.goods_pdsl=1
				this.uFormModel.goods_pdjj=event.pjjj
				this.uFormModel.goods_pdje=Number(event.pjjj).toFixed(2)
				this.uFormModel.goods_remark=""
				this.popupShow=false
				if(this.isVoiceMode){
					if(!isauto){//语音模式 手动点击调用函数时
						this.clickYuyin("shoping",true)
					}
				}else{
					setTimeout(()=>{
						
					},300)
				}
			},
			// 扫码添加
			getScan(){
				let reg = /^[0-9]{4,18}$/
				uni.scanCode({
					success: (res) => {
						console.log('商品 扫码内容 res', res)
						if(reg.test(res.result)){
							this.searchSpbm(res.result)
						}else{
							this.$refs.uToast.show({
								type:"error",
								message: "条码识别失败。请重新扫码！"
							})
						}
					},
					fail:(err) => {
						this.$refs.uToast.show({
							type:"error",
							message: "扫码失败"
						})
					}
				});
			},
			saveGoods(){
				let userid=uni.getStorageSync("userid")
				let dataes=""
				if(this.option.orderType=="add"){
					dataes= JSON.stringify(
						'PSDBSAVESPCERTIFY${"vtype":"CHK","guid":"","djh":"' +
						this.option.dh +
						'","spbm":"' +
						this.uFormModel.goods_spbm +
						'","phsl":"' +
						this.uFormModel.goods_pdsl +
						'","phjg":"' +
						this.uFormModel.goods_pdjj +
						'","sppc":"","remark":"' +
						this.uFormModel.goods_remark +
						'","spsmm":"' +
						this.uFormModel.goods_spsmm +
						'","chfd":"' +
						this.option.detail_dcfd +
						'","chck":"' +
						this.option.detail_chck +
						'","shfd":"' +
						this.option.detail_drfd +
						'","shck":"' +
						this.option.detail_shck +
						'","userid":"' +
						userid +'"}'
					)
				}else{
					dataes= JSON.stringify(
						'PSDBSAVESPCERTIFY${"vtype":"EDIT","djh":"' +
							this.option.dh +
							'","guid":"' +
							this.option.guid +
							'","spbm":"' +
							this.option.spbm +
							'","phsl":"' +
							this.uFormModel.goods_pdsl +
							'","phjg":"' +
							this.uFormModel.goods_pdjj +
							'","sppc":"","remark":"' +
							this.uFormModel.goods_remark +
							'","spsmm":"' +
							this.uFormModel.goods_spsmm +
							'","chfd":"' +
							this.option.detail_dcfd +
							'","chck":"' +
							this.option.detail_chck +
							'","shfd":"' +
							this.option.detail_drfd +
							'","shck":"' +
							this.option.detail_shck +
							'","userid":"' +
							userid + '"}'
					)
				}
				console.log("保存商品 "+this.option.orderType+" dataes",dataes)
			},
			delGoods(){
				let userid=uni.getStorageSync("userid")
				let dataes= JSON.stringify(
					'DELDJSPCERTIFY${"djh":"' +
						this.option.dh +
						'","vbmtype":"PHDSORT","spbm":"' +
						this.option.spbm +
						'","spsmm":"' +
						this.uFormModel.goods_spsmm +
						'","guid":"' +
						this.option.guid +
						'","userid":"' +
						userid + '"}'
				)
				commonMain(dataes).then((res) => {
					console.log("删除商品 res",res)
					if(res.retflag==0){
						this.$refs.uToast.show({
							type:"success",
							message: "删除商品成功"
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1800)
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: res.retmsg
						})
					}
				}).catch((err) => {
					console.log(err)
				})
				
			},
			
		},
		watch: {
			// 调配数量
			'uFormModel.goods_pdsl': function(newv, oldv) {
				let xx=Number(this.uFormModel.goods_pdjj)*100
				this.uFormModel.goods_pdje = newv*xx/100
			},
			// 调配价格
			'uFormModel.goods_pdjj': function(newv, oldv) {
				let xx=Number(this.uFormModel.goods_pdsl)
				this.uFormModel.goods_pdje = newv*100*xx/100
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
	.box{
		.status-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		.nav-bar {
			background-image: linear-gradient(to right, var(--nav-left-color), var(--nav-center-color), var(--nav-right-color));
		}
		
		.box-content {
			padding-top: calc(var(--status-bar-height) + 52px);
			
			.form-card {
				.shopTishi {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
			
					.shopTishi-view {
						uni-text {
							font-size: 14px;
							color: #999;
							font-weight: 400;
						}
					}
			
					.shopTishi-view-half {
						width: 50%;
			
						uni-text {
							font-size: 14px;
							color: #999;
							font-weight: 400;
						}
					}
			
					.left-con {
						margin-right: 4px;
					}
			
					.show-dots {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
			
			.btns{
				display: flex;
				justify-content: space-around;
				margin-top: 10px;
				
				/deep/.u-button{
					width: 75px;
					margin: 0;
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
		
		.movable-area {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5001;
			pointer-events: none;
		
			.movable-view {
				height: 56px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				pointer-events: auto;
			}
		
			.movable-view-large {
				width: 100%;
				height: 206px;
				padding: 0 10px;
				box-sizing: border-box;
			}
		
			.iconimgs {
				padding: 0 15px;
				position: relative;
				z-index: 4500;
		
				.iconView {
					width: 52px;
					height: 52px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					background-image: linear-gradient(to right, #48aeed, #3489c7);
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