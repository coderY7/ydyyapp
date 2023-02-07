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
			<view style="margin:auto;">补货预采汇总</view>
			<view slot="right"></view>
		</uni-nav-bar>
		<view class="box-content">
			<u-form labelPosition="left" :model="uFormModel" ref="uForm">
				<u-form-item label="选择分店:" :labelWidth="80" borderBottom @tap="searchFd">
					<u-input placeholder="搜索分店" disabled disabledColor="#fff" v-model="uFormModel.fendian"
						border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="选择补货类型:" :labelWidth="110" borderBottom @tap="searchBhlx">
					<u-input v-model="uFormModel.bhlx" disabled disabledColor="#fff" placeholder="请选择补货类型"
						border="none"></u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>
				<u-form-item label="补货时间:" :labelWidth="80" borderBottom @tap="searchBhtime">
					<u-input placeholder="搜索补货时间" disabled disabledColor="#fff" v-model="uFormModel.bhtime"
						border="none">
					</u-input>
					<uni-icons type="right" size="16"></uni-icons>
				</u-form-item>

				<view class="onlynow">
					<u-checkbox-group placement="column" :value="onlynow" @change="onlynowChange">
						<u-checkbox name="只查当天" label="只查当天">
						</u-checkbox>
					</u-checkbox-group>
					<u-button type="primary" text="刷新" size="mini" @tap="refresh"></u-button>
				</view>
				<u-button type="primary" text="预采合单" @tap="createOrder"></u-button>
			</u-form>
			
			<!-- 弹窗。。。。。。。。。。 -->
			<uni-drawer ref="drawer" mode="left" :mask-click="true">
				<scroll-view style="height: 100%;" scroll-y="true">
					<u-checkbox-group iconPlacement="right" placement="column" :value="ALLfdvalue" @change="checkboxChange0"
						v-if="ifDrawer=='fendian'">
						<u-checkbox name="ALL-所有分店" label="ALL-所有分店">
						</u-checkbox>
					</u-checkbox-group>
					<u-checkbox-group iconPlacement="right" placement="column" :value="fdvalue" @change="checkboxChange"
						v-if="ifDrawer=='fendian'">
						<u-checkbox v-for="(v, i) in list" :name="v.fdbh+'-'+v.fdmc" :label="v.fdbh+'-'+v.fdmc">
						</u-checkbox>
					</u-checkbox-group>
				
					<u-checkbox-group iconPlacement="right" placement="column" :value="ALLbhlxvalue" @change="checkboxChange1"
						v-if="ifDrawer=='bhlx'">
						<u-checkbox name="ALL-所有类型" label="ALL-所有类型">
						</u-checkbox>
					</u-checkbox-group>
					<u-checkbox-group iconPlacement="right" placement="column" :value="bhlxvalue" @change="checkboxChange11"
						v-if="ifDrawer=='bhlx'">
						<u-checkbox v-for="(v, i) in list" :name="v.fcgdno+'-'+v.fcgname" :label="v.fcgdno+'-'+v.fcgname">
						</u-checkbox>
					</u-checkbox-group>
				</scroll-view>
			</uni-drawer>
			<uni-calendar ref="calendar" :insert="false" @confirm="dateConfirm" />

		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		commonMain
	} from "@/network/api.js";
	export default {
		data() {
			return {
				uFormModel: {
					fendian: "ALL",
					bhlx: "ALL",
					bhtime: dayjs().format('YYYY-MM-DD'),
				},
				list:[],
				ALLfdvalue:[],
				fdvalue:[],
				ifDrawer: "",
				ALLbhlxvalue:[],
				bhlxvalue:[],
				onlynow:["只查当天"],
			}
		},
		onLoad: function(option) {

		},
		onReady() {
			
		},
		methods: {
			createOrder(){
				let userid=uni.getStorageSync("userid")
				let djlist=this.uFormModel.bhtime
				let datas=JSON.stringify('SCYXBHHZYCD${"userid":"'+userid+'","djlist":"'+djlist+'"}')
				commonMain(datas).then((res) => {
					console.log("createOrder res",res)
				}).catch((err) => {
					console.log(err)
				})
			},
			refresh(){
				let fdlist=this.uFormModel.fendian
				let rq=this.uFormModel.bhtime
				let typelist=this.uFormModel.bhlx=="ALL"?"":this.uFormModel.bhlx
				let ztbz=this.onlynow.length>0?"T":"F"
				let datas=JSON.stringify('GetKHZBHDList${"fdlist":"'+fdlist+'","rq":"'+fdlist+'","typelist":"'+typelist+'","ztbz":"'+ztbz+'"}')
				commonMain(datas).then((res) => {
					console.log("refrech res",res)
				}).catch((err) => {
					console.log(err)
				})
			},
			searchFd() {
				this.ifDrawer = "fendian"
				let datas = JSON.stringify('GetALLFDInfo${}')
				commonMain(datas).then((res) => {
					console.log("res", res)
					if (res.err_code == 0) {
						this.$refs.drawer.open();
						this.list=res
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			checkboxChange0(e) {
				this.fdvalue=[]
				if(e.length>0){
					for(var i in this.list){
						this.fdvalue.push(this.list[i].fdbh+"-"+this.list[i].fdmc)
					}
				}
			},
			checkboxChange(e) {
				this.uFormModel.fendian = ""
				this.fdvalue=e
				if(e.length<this.list.length){
					this.ALLfdvalue=[]
				}else if(e.length==this.list.length){
					this.ALLfdvalue=["ALL-所有分店"]
				}
				e.forEach((v,i,arr)=>{
					this.uFormModel.fendian+=v.split("-")[0]
					if(i!=arr.length-1){
						this.uFormModel.fendian+=","
					}
				})
			},
			searchBhlx() {
				this.ifDrawer = "bhlx"
				let datas = JSON.stringify('GetCGDForeverType${"userid":""}')
				commonMain(datas).then((res) => {
					console.log("res", res)
					if (res.retflag == 0) {
						this.$refs.drawer.open();
						this.list=res.list
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			checkboxChange1(e) {
				this.bhlxvalue=[]
				if(e.length>0){
					for(var i in this.list){
						this.bhlxvalue.push(this.list[i].fcgdno+"-"+this.list[i].fcgname)
					}
				}
			},
			checkboxChange11(e) {
				this.uFormModel.bhlx = ""
				this.bhlxvalue=e
				if(e.length<this.list.length){
					this.ALLbhlxvalue=[]
				}else if(e.length==this.list.length){
					this.ALLbhlxvalue=["ALL-所有类型"]
				}
				e.forEach((v,i,arr)=>{
					this.uFormModel.bhlx+=v.split("-")[0]
					if(i!=arr.length-1){
						this.uFormModel.bhlx+=","
					}
				})
			},
			searchBhtime() {
				this.$refs.calendar.open();
			},
			dateConfirm(e){
				this.uFormModel.bhtime=e.fulldate
			},
			onlynowChange(e){
				this.onlynow=e
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-drawer {
		.uni-scroll-view-content {
			box-sizing: border-box;
			padding: 10px 10px 0 10px;

			.u-checkbox {
				margin-bottom: 14px;
			}
		}
	}
	/deep/.onlynow{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 44px;
		.u-button{
			width:60px;
			margin-left: 0;
			margin-right: 0;
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
