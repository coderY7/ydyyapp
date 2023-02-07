<template>
	<view class="box" :style="skin">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="left">
				<navigator open-type="navigateBack" v-show="ifpage">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</navigator>
				<view class="navleftview" v-show="!ifpage" @tap="ifpage=true">
					<uni-icons type="back" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="center">标价签新单</view>
			<view class="right">
				<uni-icons type="plusempty" size="30" color="#fff" @tap="scxd" v-if="ifpage"></uni-icons>
				<uni-icons type="cloud-upload" size="30" color="#fff" @tap="upload" v-else></uni-icons>
			</view>
		</view>
		<view class="box-content" v-show="ifpage">
			<!-- 单头 -->
			<view class="my-collapse">
				<view class="my-collapse-title" @tap="myCollShow=!myCollShow">
					<view class="fold-title">
						<view class="fold-title-t fold-title-flex">
							<text>单号:{{danhao}}</text>
							<text class="dhliang" @tap.stop="ifpage=false">明细:{{dhNum}}</text>
						</view>
						<view class="fold-title-flex fold-title-con">
							<view v-if="notUpData.length==0">{{newtime}}</view>
							<view v-else>{{notUpData[0].labelgoods_date}}</view>
							<text class="cu1" v-if="notUpData.length==0">0个</text>
							<text class="cu1" v-else>{{notUpData[0].total_num}}个</text>
						</view>
					</view>
				</view>
				<view class="my-collapse-con" v-show="myCollShow">
					<u-form class="form-card" labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
						<u-form-item label="价签类型" :labelWidth="74" prop="labelLx" @tap="searchLabelLx">
							<u-input :inputAlign="inputAlign" v-model="uFormModel.labelLx" disabled disabledColor="#fff" placeholder="请选择标价签类型" border="none"></u-input>
							<uni-icons type="clear" size="19" color="#C3C3C3" v-if="labelLxClearShow&&!isVoiceMode" @tap="clearAlone('labelLx')"></uni-icons>
							<text class="inp-right-text" v-if="!labelLxClearShow&&!isVoiceMode"></text>
							<uni-icons custom-prefix="iconfont" type="icon-yuyin" :color="doingId=='labelLx'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode&&state=='add'" @tap="clickYuyin('labelLx',false)"></uni-icons>
						</u-form-item>
						<u-form-item label="分店名称" :labelWidth="74" prop="fendian" @tap="disabledFd">
							<u-input :inputAlign="inputAlign" placeholder="请输入分店编号/名称" :disabled="state=='edit'||state=='pladd'||isVoiceMode" v-model="uFormModel.fendian" border="none" :focus="focusObj.fdFocus" @change="fendianChange">
							</u-input>
							<uni-icons type="clear" size="19" color="#C3C3C3" v-if="fendianClearShow&&!isVoiceMode" @tap="clearAlone('fendian')"></uni-icons>
							<text class="inp-right-text" v-if="!fendianClearShow&&!isVoiceMode"></text>
							<uni-icons custom-prefix="iconfont" type="icon-yuyin" :color="doingId=='fendian'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode&&state=='add'" @tap="clickYuyin('fendian',true)"></uni-icons>
						</u-form-item>
						
					</u-form>
				</view>
			</view>
			<!-- 单子内容 -->
			<u-form class="form-card" labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="商品名称" :labelWidth="74" prop="shoping" class="shoping">
					<u-input inputAlign="right" placeholder="请输入商品编码/名称/简码" :disabled="isVoiceMode" v-model="uFormModel.shoping" border="none" :focus="focusObj.shopingFocus" @change="shopingChange">
					</u-input>
					<uni-icons type="clear" size="19" color="#C3C3C3" v-if="shopingClearShow&&!isVoiceMode" @tap="clearAlone('shoping')"></uni-icons>
					<uni-icons custom-prefix="iconfont" type="icon-yuyin" :color="doingId=='shoping'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode" @tap="clickYuyin('shoping',true)"></uni-icons>
					<uni-icons custom-prefix="iconfont" type="icon-shouye" size="20" color="#606060"
						@tap="scan()" v-if="!isVoiceMode&&!ispda"></uni-icons>
				</u-form-item>
				<view class="shopTishi">
					<view class="" v-if="uFormModel.bm">
						<text class="left-con">编码:</text>
						<text>{{uFormModel.bm}}</text>
					</view>
					<view class="" v-if="uFormModel.sm">
						<text class="left-con">条码:</text>
						<text>{{uFormModel.sm}}</text>
					</view>
				</view>
				<u-form-item label="标签数量" :labelWidth="74" prop="num">
					<u-input inputAlign="right" placeholder="请输入标签数量" type="number" v-model="uFormModel.num" border="none" :focus="focusObj.numFocus">
					</u-input>
					<uni-icons custom-prefix="iconfont" type="icon-yuyin" :color="doingId=='num'?'#358CC9':'#7A7A7A'" size="19" v-if="isVoiceMode" @tap="clickYuyin('num',true)"></uni-icons>
					<text class="inp-right-text" v-else></text>
				</u-form-item>
			</u-form>
			<u-button type="primary" class="my-primary-button" text="保存商品" throttleTime="1000" @tap="save">
			</u-button>
			
		</view>
		<view class="box-content local-page" v-show="!ifpage">
			<uni-collapse class="fold" ref="collapseView" v-for="(v,i) in notUpData">
				<uni-collapse-item :open="true" :show-arrow="false" title-border="none">
					<template v-slot:title>
						<view class="fold-title">
							<view class="fold-title-t fold-title-flex">
								<text>{{v.pricelalist_id}}</text>
								<text class="dhliang">{{v.child.length}}</text>
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
									<uni-icons type="compose" size="20" color="#3183C1" v-if="localState!='editdetail'||editIndex!=index" @tap="toeditDetail(item,index)"></uni-icons>
									<uni-icons type="trash" size="20" color="#F13B44" style="margin-left:10px;" @tap="notUpDel(v,item)" v-if="localState!='editdetail'||editIndex!=index"></uni-icons>
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
									<u-input type="number" v-model="item.labelgoods_num" v-show="localState=='editdetail'&&editIndex==index" :formatter="editFormat"></u-input>
									<text class="right-con" v-show="localState!='editdetail'||editIndex!=index">{{item.labelgoods_num}}</text>
								</view>
							</view>
						</view>
						
						<view class="btns" v-show="localState=='editdetail'&&editIndex==index">
							<u-button type="primary" :plain="true" text="取消" throttleTime="1000" @tap="localState='',editIndex=-1"></u-button>
							<u-button type="primary" text="保存" throttleTime="1000" @tap="editDetailSave(v,item)"></u-button>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		<!-- 弹窗。。。。。。。。。。 -->
		<u-toast ref="uToast"></u-toast>
		<u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="5000">
			<scroll-view style="max-height: 60vh;" scroll-y="true">
				<view v-if="ifDrawer=='labelLx'">
					<view class="list" v-for="(v, i) in list" @tap="radioChange0(v.id+'-'+v.name,false)">
						<text>{{v.id}}</text>-<text>{{v.name}}</text>
					</view>
				</view>
				<view v-else-if="ifDrawer=='fendian'">
					<view class="list" v-for="(v, i) in list" @tap="radioChange1(v.fdbh+'-'+v.fdmc,false)">
						<text v-html="v.fdbh">{{v.fdbh}}</text>-
						<text v-html="v.fdmc">{{v.fdmc}}</text>
					</view>
				</view>
				<view class="shop" v-else-if="ifDrawer=='shoping'">
					<view class="list" v-for="(v, i) in list" @tap="shopingFunc(v,false)">
						<view class="shop-l">{{i+1}}</view>
						<view class="shop-r">
							<view class="shop-r-t">
								<text class="t-name">{{v.spmc}}</text>
								<text class="t-price">库存:{{v.dqkcl}}</text>
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
		<movable-area class="movable-area">
			<movable-view class="movable-view" :x="x" :y="y" direction="all" :animation="false" :out-of-bounds="true" v-show="!isVoiceMode">
				<view class="iconimgs" @tap="changeSwitch">
					<view class="iconView">
						<uni-icons custom-prefix="iconfont" type="icon-yuyin" color="#fff" size="30"></uni-icons>
					</view>
				</view>
			</movable-view>
			<movable-view class="movable-view movable-view-large" :x="x" :y="y" direction="all" :animation="false" :out-of-bounds="true" v-show="isVoiceMode">
				<goodsVoice ref="goodsVoice" :step="yuyinModelArr" :list.sync="list" :searchCode="searchCode" @changeParentValue="changeParentValue" @changeVoiceShow="changeVoiceShow" @doing="doing"></goodsVoice>
			</movable-view>
		</movable-area>
		
		
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		Basic,
		searchGoods,
		uploadLabelList
	} from "@/network/api.js";
	export default {
		data() {
			return {
				newtime: dayjs().format('YYYY-MM-DD HH:mm'),
				x: 400,
				y: 500,
				old: {
					x: 0,
					y: 0
				},
				ifpage:true,
				state: "",
				danhao: "",
				myCollShow: true,
				uFormModel: {
					fendian: "",
					labelLx: "",
					shoping: "",
					num: ""
				},
				fendianClearShow:false,
				labelLxClearShow:false,
				shopingClearShow:false,
				uFormRules: {
					"labelLx": {
						type: "string",
						required: true,
						message: "请选择标价签类型",
						trigger: ["blur", "change"]
					},
					"fendian": {
						type: "string",
						required: true,
						message: "请填写分店",
						trigger: ["blur", "change"]
					},
					"shoping": {
						type: "string",
						required: true,
						message: "请填写商品",
						trigger: ["blur", "change"]
					},
					"num": [{
							type: "string",
							required: true,
							message: "请填写标签数量",
							trigger: ["blur", "change"]
						},
						{
							asyncValidator: (rule, value, callback) => {
								let reg=/^\d+$/
								if(reg.test(value)){
									if (value > 100000) {
										callback(new Error('标签数量过大'));
									} else {
										callback();
									}
								}else{
									callback(new Error('请输入非负整数'));
								}
							}
						}
					],
				},
				completeObj:{
					isFendian:false,
					isShoping:false
				},
				lxlist:[],
				lxIndex: -1,
				list: [],// 搜索的数据
				ifDrawer:"",//固定值，与语音模式的 fixedid 一样
				
				dhNum: 0,
				localState:"",
				editIndex: -1,
				editNum: 0,
				inputAlign:"right",
				notUpData:[],
				upData:[],
				ispda: uni.getStorageSync("pda"),
				focusObj:{
					fdFocus:false,
					shopingFocus:false,
					numFocus:false,
				},
				popupShow: false,
				// 语音data
				isVoiceMode: false,//是否语音模式
				doingId: "",
				yuyinModelArr:[],
				searchCode: 400,
				yuyinArr:[{
						"tips": "请说出您要选择的价签类型",
						"id": "labelLx",
						"fixedId": "labelLx",
						"searchFunc": "searchLabelLx",
						"isSearchCon": false,
						"nextFunc": "radioChange0",
						"completeFunc": "",
						"isNext": true,
					},
					{
						"tips": "请说出您要搜索的分店",
						"id": "fendian",
						"fixedId": "fendian",
						"searchFunc": "searchFd",
						"isSearchCon": true,
						"nextFunc": "radioChange1",
						"completeFunc": "",
						"isNext": true,
					},
					{
						"tips": "请说出您要搜索的商品",
						"id": "shoping",
						"fixedId": "shoping",
						"searchFunc": "searchShoping",
						"isSearchCon": true,
						"nextFunc": "shopingFunc",
						"completeFunc": "",
						"isNext": true,
					},
					{
						"tips": "请说出您要输入的标签数量",
						"id": "num",
						"fixedId": "num",
						"searchFunc": "",
						"isSearchCon": false,
						"nextFunc": "",
						"completeFunc": "",
						"isNext": true,
					},
					{
						"tips": "请确认是否保存商品",
						"id": "",
						"fixedId": "save",
						"searchFunc": "",
						"isSearchCon": false,
						"nextFunc": "",
						"completeFunc": "saveFunc",
						"isNext": false,
					}
				],
				
			}
		},
		onLoad: function(option) {
			if (option.name == "edit") {
				this.danhao = option.pricelalist_id
				this.uFormModel.labelLx = option.label_name
				this.uFormModel.fendian = option.labelshop_name
				this.notUpLoadFunc(option.pricelalist_id)
				this.state = "edit"
			} else {
				this.state = "add"
				this.danhao = option.name
			}
			
			uni.getSystemInfo({
				success: function(res) {
					this.x=res.screenWidth-50
					this.y=res.screenHeight-145
				}.bind(this)
			});
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light");
			// #endif
		},
		methods: {
			// 语音模式。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			changeSwitch(){
				if(this.state=="add"){
					this.yuyinModelArr=this.yuyinArr
				}else if(this.state=="edit"){
					this.yuyinModelArr=this.yuyinArr.slice(2)
				}else if(this.state=="pladd"){
					this.yuyinModelArr=this.yuyinArr.slice(2)
				}
				this.isVoiceMode=true
			},
			changeVoiceShow(){// 进入普通模式
				this.yuyinModelArr=[]
				this.isVoiceMode=false
			},
			changeParentValue(obj){
				if(obj.nextFunc){
					this[obj.nextFunc](obj.val,true)
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
			doing(id){
				this.doingId=id
			},
			clickYuyin(fixid,isnext){//语音 执行顺序跳转
				for(var i in this.yuyinModelArr){
					if(this.yuyinModelArr[i].fixedId==fixid){
						if(isnext){//可以进行下一步
							if(i!=this.yuyinModelArr.length-1){
								this.$refs.goodsVoice.stepFunc(Number(i)+1)
								return
							}
						}else{//只能执行一次 本步骤
							this.$set(this.yuyinModelArr[i], "isNext", false)
							this.$refs.goodsVoice.stepFunc(Number(i))
							return
						}
					}
				}
			},
			
			// 生成新单。。。。。。。。。。。。。。。。。。。。。。。。。
			scxd(){
				this.state = "add"
				this.myCollShow=true
				this.dhNum=0
				var now = dayjs().format('YYYY-MM-DD')
				var numx = parseInt(Math.random() * 100);
				if (numx < 10) {
					numx = "0" + numx;
				}
				var upid = Number(uni.getStorageSync('listupid')) + 1
				var str= "BJ" + now.split("-")[0].slice(2,4) + now.split("-")[1] + now.split("-")[2] + numx + uni.getStorageSync('userid') + upid;
				uni.setStorageSync('listupid', upid)
				this.danhao = str
				this.uFormModel.labelLx = ""
				this.uFormModel.fendian = ""
				this.uFormModel.shoping = ""
				this.uFormModel.num = ""
				this.notUpData=[]
			},
			
			// 搜索标价签类型。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			// 监听标价签类型信息改变
			searchLabelLx(){
				this.searchCode=400
				if(this.state=="add"){
					this.list = [
						{
							"id":"00",
							"name":"正常价签"
						},
						{
							"id":"01",
							"name":"散货价签"
						},
						{
							"id":"02",
							"name":"自定义价签"
						}
					]
					this.ifDrawer="labelLx"
					this.popupShow=true
					this.searchCode=0
				}else if(this.state=="edit"){
					this.$refs.uToast.show({
						type:"error",
						message: "编辑的标价签，不能重新选择"
					})
				}else if(this.state=="pladd"){
					this.$refs.uToast.show({
						type:"error",
						message: "批量新增的标价签，不能重新选择"
					})
				}
			},
			radioChange0(e) {
				this.uFormModel.labelLx = e
				this.popupShow=false
				this.searchCode=400
				if(!this.isVoiceMode){
					setTimeout(()=>{
						this.focusObj.fdFocus=true
					},200)
				}
				if(this.isVoiceMode){//为语音模式时
					if(!isauto){// 手动调用函数时
						this.clickYuyin("labelLx",true)
					}
				}
			},
			
			// 搜索分店。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			// 监听分店信息改变
			fendianChange(val){
				setTimeout(()=>{
					if(!this.completeObj.isFendian){//未点击搜索的数据
						if(val!=""){
							if(val==this.uFormModel.fendian){
								this.searchFd(val)
								uni.hideKeyboard()
							}
						}
					}
				},2000)
			},
			searchFd(fendian) {
				if(this.state=="add"){
					this.ifDrawer = "fendian"
					this.searchCode=400
					uni.showLoading({
						title: '查询中,请稍后...'
					});
					uni.getStorage({
						key: "off",
						success: function(restor) {
							if(restor.data){//离线模式
								plus.sqlite.selectSql({
									name: 'downloadDb',
									sql: "select shop_num as fdbh,shop_name as fdmc from shop where shop_num like '%"+fendian+"%' or shop_name like '%"+fendian+"%'",
									success: function(res) {
										uni.hideLoading();
										this.list = res
										if(restor.length==0){
											this.$refs.uToast.show({
												type:"error",
												message: "搜索内容为空"
											})
										}else if(res.length==1){
											this.uFormModel.fendian=`${res[0].fdbh}-${res[0].fdmc}`
											if(!this.isVoiceMode){
												setTimeout(()=>{
													this.focusObj.shopingFocus=true
												},200)
											}
										}else{
											this.popupShow=true
										}
										this.searchCode=0
									}.bind(this),
									fail: function(e) {
										uni.hideLoading();
										this.toDownload()
										console.log('查询SQL语句失败: ');
									}.bind(this)
								});
								
							}else{//在线模式
								let dataes={
									"access_token": uni.getStorageSync("access_token"),
									"dtype": "FDINFO",
									"companyid": uni.getStorageSync("companyid"),
								}
								Basic(dataes).then((res) => {
									// console.log("基本信息basic res", res)
									if (res.error_code == 0) {
										console.log("在线getFenDian res",res)
										uni.hideLoading();
										this.list = res.data
										if(res.data.length==0){
											this.$refs.uToast.show({
												type:"error",
												message: "搜索内容为空"
											})
										}else if(res.data.length==1){
											this.uFormModel.fendian=`${res.data[0].fdbh}-${res.data[0].fdmc}`
											if(!this.isVoiceMode){
												setTimeout(()=>{
													this.focusObj.shopingFocus=true
												},200)
											}
										}else{
											this.popupShow=true
										}
										this.searchCode=0
									} else {
										this.$refs.uToast.show({
											type: "error",
											message: res.message
										})
									}
								}).catch((err) => {
									console.log(err)
									uni.hideLoading();
								})
							}
						}.bind(this)
					});
				}
			},
			// 禁用分店
			disabledFd(){
				if(this.state=="edit"){
					this.$refs.uToast.show({
						type:"error",
						message: "编辑的分店，不能重新选择"
					})
				}else if(this.state=="pladd"){
					this.$refs.uToast.show({
						type:"error",
						message: "批量新增的分店，不能重新选择"
					})
				}
			},
			// 选择搜索分店
			radioChange1(e,isauto) {
				this.uFormModel.fendian = e
				this.popupShow=false
				this.searchCode=400
				this.completeObj.isFendian=true
				if(!this.isVoiceMode){
					this.startAdd()
				}
				if(this.isVoiceMode){//为语音模式时
					if(!isauto){// 手动调用函数时
						this.clickYuyin("fendian",true)
					}
				}
			},
			
			// 添加商品按钮
			startAdd() {
				this.myCollShow = false
				if(!this.isVoiceMode){
					setTimeout(()=>{
						this.focusObj.shopingFocus=true
					},200)
				}
			},
			
			// 搜索商品。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			// 监听商品信息改变
			shopingChange(val){
				setTimeout(()=>{
					if(!this.completeObj.isShoping){//未点击搜索的数据
						if(val!=""){
							if(val==this.uFormModel.shoping){
								this.searchShoping(val)
								uni.hideKeyboard()
							}
						}
					}
				},2000)
			},
			// 在线与离线 搜索商品
			searchShoping(shoping) {
				this.ifDrawer = "shoping"
				this.searchCode=400
				this.list=[]
				uni.showLoading({
					title: '查询中,请稍后...'
				});
				uni.getStorage({
					key: "off",
					success: function(restor) {
						// goods_sm==spsmm    goods_name==spmc
						if(restor.data){//离线模式
							//根据 商家和商品查找 供货价格与促销类型
							plus.sqlite.selectSql({
								name: 'downloadDb',
								sql: "select b.goods_num as spbm,b.goods_sm as spsmm,b.goods_name as spmc,b.goods_kc as dqkcl,a.relation_jg as ghcbjg,a.relation_cx as cxtype from shoprelation a,goods b where a.relation_sp=b.goods_num and (b.goods_sm like '%"+shoping+"%' or b.goods_name like '%"+shoping+"%' or b.goods_jm like '%"+shoping+"%') limit 10",
								success: function(res) {
									console.log("离线模式 商品信息!!! res",res)
									this.list=res
									if(this.list.length==0){
										this.$refs.uToast.show({
											type:"error",
											message: "搜索内容为空"
										})
									}else if(this.list.length==1){
										this.uFormModel.shoping = this.list[0].spmc
										this.uFormModel.sm = this.list[0].spsmm
										this.uFormModel.bm = this.list[0].spbm
										this.uFormModel.num = this.list[0].dqkcl
										if(!this.isVoiceMode){
											setTimeout(()=>{
												this.focusObj.numFocus=true
											},200)
										}
									}else{
										this.popupShow=true
									}
									this.searchCode=0
									uni.hideLoading();
								}.bind(this),
								fail: function(e) {
									uni.hideLoading();
									this.toDownload()
								}.bind(this)
							});
							
						}else{//在线模式
							searchGoods({
								"access_token": uni.getStorageSync("access_token"),
								"sn": uni.getStorageSync("sn"),
								"condtion": shoping,
								"sjbh": ""
							}).then((res) => {
								if (res.error_code == 0) {
									console.log("在线模式 searchGoods res",res)
									this.list=res.data
									if(this.list.length==0){
										this.$refs.uToast.show({
											type:"error",
											message: "搜索内容为空"
										})
									}else if(this.list.length==1){
										this.uFormModel.shoping = this.list[0].spmc
										this.uFormModel.sm = this.list[0].spsmm
										this.uFormModel.bm = this.list[0].spbm
										this.uFormModel.num = this.list[0].dqkcl
										if(!this.isVoiceMode){
											setTimeout(()=>{
												this.focusObj.numFocus=true
											},200)
										}
									}else{
										this.popupShow=true
									}
									this.searchCode=0
									uni.hideLoading();
								}else{
									this.$refs.uToast.show({
										type:"error",
										message: "查询失败"
									})
								}
							}).catch((err) => {
								uni.hideLoading();
								console.log(err)
							})
						}
					}.bind(this),
				});
			},
			// 扫码 搜索商品
			scan() {
				uni.scanCode({
					success: (res) => {
						console.log('扫码内容', res)
						this.uFormModel.shoping=res.result
						this.searchShoping(this.uFormModel.shoping)
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type:"error",
							message: "识别失败"
						})
					}
				});
			}, 
			shopingFunc(item,isauto) {
				this.uFormModel.shoping = item.spmc
				this.uFormModel.sm = item.spsmm
				this.uFormModel.bm = item.spbm
				
				this.popupShow=false
				this.searchCode=400
				this.completeObj.isShoping=true
				if(!this.isVoiceMode){
					setTimeout(()=>{
						this.focusObj.numFocus=true
					},200)
				}
				if(this.isVoiceMode){//为语音模式时
					if(!isauto){// 手动调用函数时
						this.clickYuyin("shoping",true)
					}
				}
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
			clearFocus(){
				this.focusObj.fdFocus = false
				this.focusObj.shopingFocus = false
				this.focusObj.numFocus = false
			},
			
			// 编辑 未保存单据 的数量和价格
			toeditDetail(item,index){
				this.localState="editdetail"
				this.editIndex=index
				this.editNum=item.addgoods_num
			},
			editFormat(value){
				return value.replace(/^(-)[1-9]*$/,'');
			},
			// 编辑保存
			editDetailSave(bigobj,child){
				
			},
			// 未上传单号 删除
			notUpDel(bigobj, item) {
				plus.sqlite.executeSql({
					name: 'only',
					sql: "delete from pricelabelNotUp where pricelalist_id='" + bigobj.pricelalist_id + "' and labelgoods_sm='" + item.labelgoods_sm +
						"' and labelgoods_bm='"+ item.labelgoods_bm +"'",
					success: function(res) {
						this.notUpLoadFunc(bigobj.pricelalist_id)
						this.$nextTick(()=>{
							this.$refs.collapseView[0].resize();
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
			
			save() {
				this.$refs.uForm.validate().then(resf => {
					uni.showModal({
						content: "确定保存商品？",
						confirmText: "确定",
						success: function(res) {
							if (res.confirm) {
								this.saveFunc()
							} else if (res.cancel) {
								
							}
						}.bind(this)
					});
				})
			},
			saveFunc(){
				if(this.state=="add"){
					this.state="pladd"
				}
				let danhao = this.danhao
				let spsm = this.uFormModel.sm
				let spbm = this.uFormModel.bm
				this.$refs.uForm.validate().then(resform => {
					plus.sqlite.selectSql({
						name: 'only',
						sql: "select * from pricelabelNotUp where pricelalist_id='"+danhao+"' and labelgoods_sm='"+spsm+"' and labelgoods_bm='"+spbm+"'",
						success: function(resel) {
							if(resel.length!=0){
								uni.showModal({
									content: "清单中已存在该商品，是否追加",
									confirmText: "是",
									cancelText:"否",
									success: function(res) {
										if (res.confirm) {
											let updateNum=Number(resel[0].labelgoods_num)+Number(this.uFormModel.num)
											plus.sqlite.executeSql({
												name: 'only',
												sql: "update doshopingNotUp set labelgoods_num ='"+updateNum+"' where pricelalist_id='"+danhao+"' and labelgoods_sm='"+spsm+"' and labelgoods_bm='"+spbm+"'",
												success: function(ress) {
													console.log("更新数据成功")
													this.notUpLoadFunc(danhao)
													this.clearForm1()
													this.clearFocus()
													
													if(this.isVoiceMode){//语音模式时
														this.yuyinModelArr=[]
														setTimeout(()=>{
															this.yuyinModelArr=this.yuyinArr.slice(2)
														},1500)
													}else{
														setTimeout(()=>{
															this.focusObj.shopingFocus=true
														},200)
													}
												}.bind(this),
												fail: function(err) {
													console.log('更新数据失败: ');
												}
											});
										} else if (res.cancel) {
											
										}
									}.bind(this),
								});
							}else{
								console.log("查询SQL语句 成功-failed",resel)
								this.otherSave()
								this.clearForm1()
							}
						}.bind(this),
						fail: function(err) {
							console.log('查询SQL语句失败: ');
							this.otherSave()
							this.clearForm1()
						}.bind(this)
					});
				})
			},
			otherSave() {
				let danhao = this.danhao
				let fendian = this.uFormModel.fendian
				let labelLx = this.uFormModel.labelLx
				let bm = this.uFormModel.bm
				let name = this.uFormModel.shoping
				let sm = this.uFormModel.sm
				let num = this.uFormModel.num
				let dates = dayjs().format('YYYY-MM-DD HH:mm')
				plus.sqlite.executeSql({
					name: 'only',
					//1.单号 2.分店 3.标价签类型 4.商品编号 5.商品id 6.商品名称 7.商品数量 8.日期
					sql: "create table if not exists pricelabelNotUp('pricelalist_id' CHAR(20),'labelshop_name' CHAR(20),'label_name' CHAR(20),'labelgoods_bm' CHAR(20),'labelgoods_sm' CHAR(20),'labelgoods_name' CHAR(20),'labelgoods_num' CHAR(20),'labelgoods_date' CHAR(20))",
					success: function(e) {
						plus.sqlite.executeSql({
							name: 'only',
							sql: "insert into pricelabelNotUp values('" + danhao + "','" + fendian +
								"','" + labelLx + "','" + bm + "','" + sm + "','" +
								name + "','" + num + "','" + dates + "')",
							success: function(e) {
								this.$refs.uToast.show({
									type:"success",
									message: "保存成功"
								})
								this.clearFocus()
								this.notUpLoadFunc(danhao)
								
								if(this.isVoiceMode){//语音模式时
									this.yuyinModelArr=[]
									setTimeout(()=>{
										this.yuyinModelArr=this.yuyinArr.slice(2)
									},1500)
								}else{
									setTimeout(()=>{
										this.focusObj.shopingFocus=true
									},200)
								}
							}.bind(this),
							fail: function(e) {
								this.$refs.uToast.show({
									type:"error",
									message: "保存失败"
								})
								console.log('插入pricelabelNotUp 失败');
							}.bind(this)
						});
					}.bind(this),
					fail: function(e) {
						console.log('创建pricelabelNotUp 失败');
					}
				});
			},
			clearAlone(item){
				if(item=="shoping"){
					this.uFormModel[item]=""
					this.uFormModel.bm=""
					this.uFormModel.sm=""
					this.shopingClearShow=false
				}else{
					if(this.state=="edit"||this.state=="pladd"){
						return
					}
					this.uFormModel[item]=""
					if(item=="fendian"){
						this.fendianClearShow=false
					}
				}
			},
			clearForm1(){
				this.uFormModel.shoping=""
				this.uFormModel.num=""
			},
			// 在线上传数据
			upload() {
				if(this.state=="add"){
					this.$refs.uToast.show({
						type:"error",
						message: "商品信息有误"
					})
					return
				}
				let uploadarr=[]
				let arr=[]
				let danhao=this.danhao
				let sn=uni.getStorageSync("sn")
				plus.sqlite.selectSql({
					name: 'only',
					sql: "select * from pricelabelNotUp where pricelalist_id='"+danhao+"'",
					success: function(resel) {
						for(var i in resel){
							arr+="{spbm:'"+resel[i].labelgoods_sm+"',spsmm:'"+resel[i].labelgoods_bm+"',Bhsl:'"+resel[i].labelgoods_num+"'}"
							if(i!=resel.length-1){
								arr+=","
							}
						}
						arr+="]"
						uploadstr="{danhao:'"+danhao+"',fendian:'"+fendian+"',remark:'"+labelLx+"',isadd:'T',userid:'"+username+"',sn:'"+sn+"',JsonSpxx:"+arr+"}"
						let data=JSON.stringify({
							"sn": sn,
							"upload": uploadstr
						})
						console.log("uploadstr data", data)
						uploadLabelList(data).then((res) => {
							console.log("uploadLabelList res", res)
							if (res.err_code == 0) {
								if (res.data[0].Result == 0) {
									this.$refs.uToast.show({
										type:"error",
										message: "上传成功"
									})
									for(var i in resel){
										//删除未上传的
										plus.sqlite.executeSql({
											name: 'only',
											sql: "delete from pricelabelNotUp where pricelalist_id='" + danhao +
												"' and labelgoods_sm='" + resel[i].labelgoods_sm + "'",
											success: function(resdel) {
												console.log('删除成功')
											}.bind(this),
											fail: function(err) {
												console.log('删除SQL语句失败: ');
											}
										});
										let nowtime = dayjs().format('YYYY-MM-DD HH:mm')
										//已上传记录 写入历史记录
										plus.sqlite.executeSql({
											name: 'only',
											//1.单号 2.分店 3.标价签类型 4.商品编号 5.商品id 6.商品名称 7.商品数量 8.日期
											sql: "create table if not exists pricelabel('pricelalist_id' CHAR(20),'labelshop_name' CHAR(20),'label_name' CHAR(20),'labelgoods_bm' CHAR(20),'labelgoods_sm' CHAR(20),'labelgoods_name' CHAR(20),'labelgoods_num' CHAR(20),'labelgoods_date' CHAR(20))",
											success: function(rescre) {
												plus.sqlite.executeSql({
													name: 'only',
													sql: "insert into pricelabel values('" + danhao + "','" + fendian +
														"','" + labelLx + "','" + resel[i].labelgoods_bm + "','" + resel[i].labelgoods_sm + "','" +
														resel[i].labelgoods_name + "','" + resel[i].labelgoods_num + "','" + nowtime + "')",
													success: function(resins) {
														console.log('插入pricelabel 成功');
													}.bind(this),
													fail: function(err) {
														console.log('插入pricelabel 失败');
													}
												});
											},
											fail: function(err) {
												console.log('创建pricelabel失败: ', JSON.stringify(err));
											}
										});
									}
									
								}
								
							} else {
								this.$refs.uToast.show({
									type:"error",
									message: res.message
								})
							}
						}).catch((err) => {
							console.log(err)
						})
					}.bind(this),
					fail: function(err) {
						console.log('查询SQL语句失败: ');
					}
				});
			},
			// 未上传单号 查询
			notUpLoadFunc(danhao) {
				var temparr=[]
				var sqls=""
				if(this.state=="add"||this.state=="edit"||this.state=="pladd"){
					sqls="select * from pricelabelNotUp where pricelalist_id='"+danhao+"'"
				}else{
					
				}
				plus.sqlite.selectSql({
					name: 'only',
					sql: sqls,
					success: function(res) {
						this.dhNum=res.length
						if(res.length==0){
							this.notUpData=[]
							return
						}else{
							temparr.push({
								"pricelalist_id":danhao,
								"labelshop_name":"",
								"label_name":"",
								"total_num":0,
								"labelgoods_date": "",
								"child":[]
							})
							for(var j in res){
								if(temparr[0].pricelalist_id==res[j].pricelalist_id){
									temparr[0].labelshop_name=res[j].labelshop_name
									temparr[0].label_name=res[j].label_name
									temparr[0].labelgoods_date=res[j].labelgoods_date
									temparr[0].child.push({
										"labelgoods_bm":res[j].labelgoods_bm,
										"labelgoods_sm":res[j].labelgoods_sm,
										"labelgoods_name":res[j].labelgoods_name,
										"labelgoods_num":res[j].labelgoods_num
									})
									temparr[0].total_num+=Number(res[j].labelgoods_num)*10000
								}
							}
							temparr[0].total_num=temparr[0].total_num/10000
							if(this.state=="add"||this.state=="edit"||this.state=="pladd"){
								this.notUpData=temparr
							}else{
								
							}
						}
						console.log("add this.notUpData",this.notUpData)
					}.bind(this),
					fail: function(e) {
						console.log('查询SQL语句失败: ');
					}
				});
			},
			
		},
		computed:{
			skin(){
				return this.$store.state.skin;
			}
		},
		watch: {
			state: function(newv, oldv) {
				if(newv == "edit"||newv=="pladd"){
					this.inputAlign="left"
				}else{
					this.inputAlign="right"
				}
			},
			yuyinModelArr: function(newv, oldv) {
				if (newv.length == 0) {
					this.doingId=""
				}
			},
			"uFormModel.fendian": function(newv, oldv) {
				if(newv.length==0){
					this.completeObj.isFendian=false
					this.fendianClearShow=false
				}else{
					if(this.state == "edit"||this.state=="pladd"){
						
					}else{
						this.fendianClearShow=true
					}
				}
			},
			"uFormModel.shoping": function(newv, oldv) {
				if(newv.length==0){
					this.completeObj.isShoping=false
					this.shopingClearShow=false
					this.uFormModel.bm=""
					this.uFormModel.sm=""
					this.uFormModel.num=""
					this.lxIndex=-1
				}else{
					this.shopingClearShow=true
				}
			},
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
		.box-content{
			padding-left: 15px;
			padding-right: 15px;
			padding-top: 90px;
			padding-bottom: 50px;
			
			.my-collapse{
				.my-collapse-title{
					padding: 10px;
					color: #fff;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					background-color: #358CC9;
					
					.fold-title{
						.fold-title-t{
							font-size: 15px;
							font-weight: 600;
							margin-bottom: 8px;
							
							.dhliang{
								display: block;
								height: 16px;
								line-height: 16px;
								padding:0px 12px;
								background-color: #F13B44;
								border-radius: 15px;
								font-size: 12px;
								font-weight: 500;
							}
						}
						.fold-title-con{
							font-size: 12px;
							font-weight: 400;
						}
						
						.fold-title-flex{
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
				
				.my-collapse-con{
					.form-card{
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
				}
				
			}
			
			.form-card{
				padding: 10px 15px;
				background-color: #fff;
				border-radius: 10px;
				margin-bottom: 10px;
				box-sizing: border-box;
				
				.shopTishi{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					uni-text{
						font-size: 12px;
						color: #999;
						font-weight: 400;
					}
					.left-con{
						margin-right: 4px;
					}
				}
				
				.inp-right-text{
					display: inline-block;
					width: 19px;
				}
				
				.radio-view{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.radio-text{
						padding: 6px 14px;
						background-color: #F5F5F5;
						border-radius: 7px;
					}
					
				}
				
				/deep/.u-textarea{
					background-color: #F5F5F5;
				}
			}
			
			.form-card>*{
				margin-bottom: 10px;
			}
			.u-form.form-card>*{
				margin-bottom: 20px;
			}
			
			.form-card>*:last-child{
				margin-bottom: 0px;
			}
			
			/deep/.u-form{
				.u-form-item.shoping{
					margin-bottom: 0;
				}
				
				.u-form-item__body{
					padding: 0;
				}
				.u-form-item__body__right__message{
					padding-right: 19px;
					text-align: right;
				}
				.u-input__content__subfix-icon{
					flex-direction: row;
				}
				.uni-input-placeholder{
					text-align: right;
				}
			}
			
			//折叠栏。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			.fold{
				padding: 0 10px;
				box-sizing: border-box;
				border-radius: 10px;
				box-shadow: 0px 1px 5px 3px #e8e8e8;
				
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
							padding:0px 9px;
							border: 1px solid #f13b44;
							border-radius: 15px;
							font-size: 12px;
							color: #f13b44;
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
			
			.lxactive{
				background-color: #358CC9 !important;
				color: #fff;
			}
		}
		
		.local-page{
			/deep/.u-input {
				border-radius: 30px;
			}
		}
		
		.movable-area {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5001;
			pointer-events:none;
			
			.movable-view {
				height: 56px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				pointer-events:auto;
			}
			
			.movable-view-large{
				width: 100%;
				height: 206px;
				padding:0 10px;
				box-sizing: border-box;
			}
			
			.iconimgs{
				padding: 0 15px;
				// position: fixed;
				// bottom: 70px;
				// right: 15px;
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
	
	/deep/.u-popup {
		border-radius: 30px;
		
		.u-popup__content{
			padding-left: 15px;
			padding-right: 15px;
			padding-bottom: 10px;
			border-radius: 20px;
		}
		
		.uni-scroll-view-content {
			box-sizing: border-box;
			padding: 10px 0;
	
			.list{
				padding:10px;
				border-bottom: 1px solid #E6E6E6;
			}
			.list>uni-text:first-child{
				color: #4A4A4A;
			}
			.list>uni-text:last-child{
				color: #A9A9A9;
			}
			
			.shop {
				.list{
					display: flex;
					padding: 10px 0;
					
					.shop-l{
						width: 20px;
						color: #060606;
						font-weight: 600;
					}
					.shop-r{
						width: calc(100% - 20px);
						.shop-r-t{
							display: flex;
							justify-content: space-between;
							font-weight: 600;
							margin-bottom: 8px;
							
							.t-name{
								color: #484858;
							}
							.t-price{
								color: #3b9bda;
							}
						}
						.shop-r-b{
							display: flex;
							justify-content: space-between;
							font-size: 12px;
							
							.b-xi{
								color: #b1b1b1;
								font-weight: 400;
							}
							
							.b-cu{
								color: #717171;
								font-weight: 500;
							}
							
						}
					}
				}
			}
		}
		
		.closebtn{
			text-align: center;
			height: 34px;
			line-height: 34px;
			color: #358CC9;
			font-size: 17px;
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>