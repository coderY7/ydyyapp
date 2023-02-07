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
			<view style="margin:auto;">{{option.spmc}}</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<view class="qdlist" v-for="(v,i) in ycqdData">
				<view class="qdlists">
					<view class="title">{{v.spmc}}</view>
					<view>实采商家：{{v.sjsjbh}}</view>
					<view class="con">
						<view>
							<view class="ts">实采价格</view>
							<view class="cu" v-if="editIndex=='-1'&&state==''">{{v.sjcgjg}}</view>
							<u-input v-model="v.sjcgjg" v-if="editIndex==i&&state=='edit'"></u-input>
						</view>
						<view>
							<view class="ts">实采数量</view>
							<view class="cu" v-if="editIndex=='-1'&&state==''">{{v.sjcgsl}}</view>
							<u-input v-model="v.sjcgsl" v-if="editIndex==i&&state=='edit'"></u-input>
						</view>
						<view>
							<view class="ts">实采皮重</view>
							<view class="cu" v-if="editIndex=='-1'&&state==''">{{v.sjpzsl}}</view>
							<u-input v-model="v.sjpzsl" v-if="editIndex==i&&state=='edit'"></u-input>
						</view>
					</view>
				</view>
				<view class="btns" v-if="v.ztbz=='T'">
					<u-button type="primary" text="编辑清单" throttleTime="1000" @tap="edit(i)" v-if="state==''"></u-button>
					<u-button type="primary" text="保存清单" throttleTime="1000" v-if="state=='edit'" @tap="save(v)"></u-button>
					<u-button type="error" text="删除清单" throttleTime="1000" @tap="del(v)"></u-button>
				</view>
				<image src="@/static/images/yys.png" mode="widthFix" class="imgFix" v-else></image>
			</view>

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
				option:"",
				spmc: "",
				ycqdData:[],
				editIndex:"-1",
				state:""
			}
		},
		onLoad: function(option) {
			this.option = option
			this.getycqd(option)
		},
		onReady() {

		},
		methods: {
			getycqd(option) {
				var datas = JSON.stringify('GetYCGSPList${"djh":"' + option.cgdbh +
					'","spbm":"' + option.spbm + '","spsmm":"' + option.spsmm + '"}')
				commonMain(datas).then((res) => {
					console.log("getycqd res", res)
					this.ycqdData=res.list
					for(var i in this.ycqdData){
						this.ycqdData[i].sjcgjg=Number(this.ycqdData[i].sjcgjg).toFixed(2)
						this.ycqdData[i].sjcgsl=Number(this.ycqdData[i].sjcgsl).toFixed(2)
						this.ycqdData[i].sjpzsl=Number(this.ycqdData[i].sjpzsl).toFixed(2)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			edit(index){
				this.state="edit"
				this.editIndex=index
			},
			save(val){
				let userid=uni.getStorageSync("userid")
				var datas = JSON.stringify('EditCGDmxForever${"djh":"' + val.cgdbh + '","sjpzsl":"' + val.sjpzsl +
				    '","sjcgsl":"' + val.sjcgsl + '","sjcgjg":"' + val.sjcgjg + '","sjsjbh":"' +
				    val.sjsjbh + '","spbm":"' + val.spbm + '","spsmm":"' + val.spsmm + '","recordid":"' + val
				    .recordid + '","userid":"' + userid + '"}')
				console.log("datas",datas)
				this.state=""
				this.editIndex=-1
				
				commonMain(datas).then((res) => {
					console.log("保存清单 res", res)
					if(res.retflag==0){
						this.getycqd(this.option)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			del(val){
				let _this=this
				uni.showModal({
					content: "确认删除已采清单吗?",
					confirmText: "确定",
					success: function(resm) {
						if (resm.confirm) {
							let userid=uni.getStorageSync("userid")
							var data = JSON.stringify('DelCGDmxForever${"djh":"' + val.cgdbh + '","spbm":"' + val.spbm + '","spsmm":"' +
							    val.spsmm + '","recordid":"' + val.recordid + '","userid":"' + userid + '"}')
							
							commonMain(datas).then((res) => {
								 console.log("保存清单 res", res)
								_this.getycqd(_this.option)
							}).catch((err) => {
								console.log(err)
							})
						} else if (resm.cancel) {
							
						}
					}
				});
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qdlist {
		padding: 10px 10px 20px;
		background-color: #fff;
		position: relative;
		margin-top: 10px;
	}

	.qdlists {
		position: relative;
		z-index: 10;
	}

	.qdlists>uni-view {
		margin-top: 10px;
	}

	.title {
		font-weight: 600;
		font-size: 16px;
	}

	.ts {
		color: #818181;
	}

	.cu {
		color: #000;
	}

	.con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/deep/.u-input{
			
		}
	}

	.con>uni-view {
		width: 26%;
	}
	.btns{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 14px;
		/deep/.u-button{
			width: 26%;
			margin: 0;
		}
	}
	.imgFix {
		width: 80px;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}
</style>
<style lang="scss">
	page {}
</style>
