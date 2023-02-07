<template>
	<view class="box">
		<view class="status-bar"></view>
		<uni-nav-bar fixed="true" backgroundColor="#fff" color="#303133">
			<view slot="left">
				<navigator open-type="navigateBack">
					<uni-icons type="back"></uni-icons>
					<view>返回</view>
				</navigator>
			</view>
			<view style="margin:auto;">永续直接分拣</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" :rules="uFormRules" ref="uForm">
				<u-form-item label="选择门店:" :labelWidth="90" prop="fendian" borderBottom @tap="searchFd">
					<u-input v-model="uFormModel.fendian" disabled disabledColor="#fff" placeholder="请选择门店" border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="搜索商品:" :labelWidth="90" prop="goods" borderBottom>
					<u-input v-model="uFormModel.goods" placeholder="请输入至少3位的商品编码或名称" border="none" confirm-type="search"
						@confirm="searchGoods">
						<template slot="suffix">
							<uni-icons type="search" size="24" @tap="searchGoods"></uni-icons>
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			
			<view class="bhorder" v-for="(v,i) in goodlist" @tap="detail(v)">
				<view class="sectionPic"></view>
				<view class="center">
					<view class="cu">{{v.spmc}}</view>
					<view class="ts">
						<text style="margin-right:10px;">商品编码: {{v.spbm}}</text>
						<text>商品进价: {{v.pjjj}}</text>
					</view>
				</view>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<u-checkbox-group iconPlacement="right" placement="column" :value="ALLfdvalue" @change="allChange">
						<u-checkbox name="ALL-所有分店" label="ALL-所有分店">
						</u-checkbox>
					</u-checkbox-group>
					<u-checkbox-group iconPlacement="right" placement="column" :value="fdvalue" @change="checkboxChange">
						<u-checkbox v-for="(v, i) in fdlist" :name="v.fdbh+'-'+v.fdmc" :label="v.fdbh+'-'+v.fdmc">
						</u-checkbox>
					</u-checkbox-group>
				</scroll-view>
			</uni-drawer>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				uFormModel:{
					fendian:"0002",
					goods:"000",
				},
				uFormRules: {
					"fendian": {
						type: "string",
						required: true,
						message: "请选择门店",
						trigger: ["blur", "change"]
					},
					"goods": [{
						asyncValidator: (rule, value, callback) => {
							if (value.length <= 1) {
								callback(new Error("请输入至少3位商品编码或名称"));
							} else {
								callback();
							}
						}
					}]
				},
				fdlist:[],
				ALLfdvalue:[],
				fdvalue:[],
				goodlist:[]
			}
		},
		onLoad: function(option) {

		},
		onReady() {
			
		},
		methods: {
			searchFd(){
				var datas = JSON.stringify('GetALLFDInfo${}')
				commonMain(datas).then((res) => {
					let resl=res.list
					console.log("searchFd resl",resl)
					this.fdlist=resl
					for(var i in this.fdlist){
						if(this.fdlist[i].fdbh=="ALL"){
							this.fdlist.splice(i,1)
						}
					}
					this.$refs.drawer.open();
				}).catch((err) => {
					console.log(err)
				})
			},
			allChange(e) {
				this.fdvalue=[]
				this.uFormModel.fendian=""
				if(e.length>0){
					for(var i in this.fdlist){
						this.fdvalue.push(this.fdlist[i].fdbh+"-"+this.fdlist[i].fdmc)
						this.uFormModel.fendian+=this.fdlist[i].fdbh
						if(i!=this.fdlist.length-1){
							this.uFormModel.fendian+=","
						}
					}
				}
			},
			checkboxChange(e) {
				this.uFormModel.fendian = ""
				this.fdvalue=e
				if(e.length<this.fdlist.length){
					this.ALLfdvalue=[]
				}else if(e.length==this.fdlist.length){
					this.ALLfdvalue=["ALL-所有分店"]
				}
				e.forEach((v,i,arr)=>{
					this.uFormModel.fendian+=v.split("-")[0]
					if(i!=arr.length-1){
						this.uFormModel.fendian+=","
					}
				})
			},
			searchGoods(){
				let _this=this
				this.$refs.uForm.validate().then(res => {
					if(this.uFormModel.goods.length<3){
						uni.showModal({
							content: "输入查询关键字太少可能会导致查询时间过久，数据过大，确定继续查询吗?",
							confirmText: "确定",
							success: function(res) {
								if (res.confirm) {
									_this.goodsFunc(_this.uFormModel.goods)
								} else if (res.cancel) {
									
								}
							}
						});
					}else{
						_this.goodsFunc(_this.uFormModel.goods)
					}
				})
			},
			goodsFunc(goods){
				let userid=uni.getStorageSync("userid")
				let fdbh=uni.getStorageSync("fdbh")
				var datas = JSON.stringify(
					'GOODSKCCERTIFY${"barcode":"' +goods + '","filterbz":"T","userid":"' + userid + '","hideColumns":true,"fdbh":"' +
						fdbh + '","checkbox":false,"shownumber":true}')
				// console.log("datas",datas)
				
				commonMain(datas).then((res) => {
					let resl = res.list
					// console.log("goodsFunc resl",resl)
					this.goodlist=resl.rows
					for(var i in this.goodlist){
						this.goodlist[i].pjjj=Number(this.goodlist[i].pjjj).toFixed(2)
						this.goodlist[i].spkcl=Number(this.goodlist[i].spkcl).toFixed(2)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			detail(val){
				uni.navigateTo({
					url: `/pages/function/component/lct/yxzjjh/detail?pjjj=${val.pjjj}&spkcl=${val.spkcl}&spmc=${val.spmc}&spbm=${val.spbm}&spsmm=${val.spsmm}&fdvalue=${this.fdvalue}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-content{
		padding-left: 0;
		padding-right: 0;
		padding-bottom: 10px;
	}
	/deep/.u-form{
		background-color: #fff;
		padding:0 10px;
	}
	.bhorder{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:10px;
		background-color: #fff;
		margin-bottom: 10px;
		.center{
			width: calc(100% - 42px);
		}
		.ts {
			font-size: 12px;
			font-weight: 400;
			color: #818181;
		}
		
		.cu {
			font-size: 15px;
			font-weight: 600;
		}
	}
	/deep/.uni-drawer {
		.uni-scroll-view-content {
			box-sizing: border-box;
			padding: 10px 10px 0 10px;
	
			.u-checkbox {
				margin-bottom: 14px;
			}
		}
	}
</style>
<style lang="scss">
	page {
		// background-color: #fff;
	}
</style>