<template>
	<view class="box-compents">
		
		<view class="sectionTitle">
			<view class="sectionPic"></view>
			<text>申请详情</text>
		</view>
		<view class="describe">
			<view class="row-describe">
				<text>申请人:</text>
				<text>{{detailData.applicantid}}-{{detailData.applicant}}</text>
			</view>
			<view class="row-describe">
				<text>联系电话:</text>
				<text>{{detailData.applicantphone}}</text>
			</view>
			<view class="row-describe">
				<text>采购员:</text>
				<text>{{detailData.sysbuyer}}</text>
			</view>
			<view class="row-describe">
				<text>关联订单:</text>
				<text>{{detailData.linkorder}}</text>
			</view>
			<view class="row-describe">
				<text>关联金额:</text>
				<text>{{detailData.linkmoney}}</text>
			</view>
			<view class="row-describe">
				<text>原始单号:</text>
				<text>{{detailData.originorder}}</text>
			</view>
			<view class="row-describe">
				<text>申请金额:</text>
				<text>{{detailData.applicationmoney}}({{detailData.capitalize}})</text>
			</view>
			<view class="row-describe">
				<text>申请日期:</text>
				<text>{{detailData.applicationdate}}</text>
			</view>
			<view class="row-describe">
				<text>紧急程度:</text>
				<text v-if="detailData.deallevel==1">一般</text>
				<text v-else-if="detailData.deallevel==2">急</text>
				<text v-else-if="detailData.deallevel==3">加急</text>
			</view>
			<view class="row-describe">
				<text>申请回单:</text>
				<text>{{detailData.receiptmark=="T"?"需要":"不需要"}}</text>
			</view>
			<view class="row-describe">
				<text>申请备注:</text>
				<text>{{detailData.applicatmark}}</text>
			</view>
			<view class="row-describe">
				<text>供应商:</text>
				<text>{{detailData.supplierid}}-{{detailData.suppliername}}</text>
			</view>
			<view class="row-describe">
				<text>预付款余额:</text>
				<text>{{detailData.supplierwdkmoney}}</text>
			</view>
			<view class="row-describe">
				<text>未结算金额:</text>
				<text>{{detailData.supplierwcddzmoney}}(含总仓入库未转应付金额)</text>
			</view>
			<view class="row-describe">
				<text>直配未入账:</text>
				<text>{{detailData.supplierwrzmoney}}</text>
			</view>
			<view class="row-describe">
				<text>未结总金额:</text>
				<text>{{detailData.未结总金额}}</text>
			</view>
			<view class="row-describe">
				<text>当前库存额:</text>
				<text>{{detailData.supplierkcemoney}}</text>
			</view>
			
			<view class="row-describe">
				<text>卡开户行:</text>
				<text>{{detailData.supplieraccountopenbank}}</text>
			</view>
			<view class="row-describe">
				<text>收款名称:</text>
				<text>{{detailData.supplieraccountname}}</text>
			</view>
			<view class="row-describe">
				<text>收款卡号:</text>
				<text>{{detailData.supplieraccount}}</text>
			</view>
			<view class="row-describe">
				<text>开户地址:</text>
				<text>{{detailData.supplieraccountaddress}}</text>
			</view>
			<view class="row-describe">
				<text>其他方式:</text>
				<text>{{detailData.supplieraccountother}}</text>
			</view>
			<view class="row-describe">
				<text>转款附言:</text>
				<text v-if="detailData.supplieraccounttype==1">对私</text>
				<text v-else-if="detailData.supplieraccounttype==2">对公</text>
			</view>
			<view class="row-describe">
				<text>转款备注:</text>
				<text>{{detailData.suppliermark}}</text>
			</view>
			
		</view>
		
		<view class="sectionTitle">
			<view class="sectionPic"></view>
			<text>审核详情</text>
		</view>
		<view class="describe">
			<view class="row-describe">
				<text>审核人:</text>
				<text>{{detailData.reviewerid}}-{{detailData.reviewer}}</text>
			</view>
			<view class="row-describe">
				<text>审核日期:</text>
				<text>{{detailData.reviewdate}}</text>
			</view>
			<view class="row-describe">
				<text>审核意见:</text>
				<text>{{detailData.reviewmark}}</text>
			</view>
		</view>
		
		<view class="sectionTitle">
			<view class="sectionPic"></view>
			<text>付款详情</text>
		</view>
		<view class="describe">
			<view class="row-describe">
				<text>转款人:</text>
				<text>{{detailData.paycashierid}}-{{detailData.paycashier}}</text>
			</view>
			<view class="row-describe">
				<text>实付金额:</text>
				<text>{{detailData.paymoney}}</text>
			</view>
			<view class="row-describe">
				<text>差异金额:</text>
				<text>{{detailData.paydiffmoney}}</text>
			</view>
			<view class="row-describe">
				<text>付款日期:</text>
				<text>{{detailData.paydate}}</text>
			</view>
			<view class="row-describe">
				<text>付款方式:</text>
				<text>{{detailData.payway}}</text>
			</view>
			<view class="row-describe">
				<text>付款账号:</text>
				<text>{{detailData.payaccount}}</text>
			</view>
			<view class="row-describe">
				<text>付款名称:</text>
				<text>{{detailData.payaccountname}}</text>
			</view>
			<view class="row-describe">
				<text>开户银行:</text>
				<text>{{detailData.payaccountopenbank}}</text>
			</view>
			<view class="row-describe">
				<text>付款备注:</text>
				<text>{{detailData.paymark}}</text>
			</view>
		</view>
		
		<view class="sectionTitle">
			<view class="sectionPic"></view>
			<text>复核详情</text>
		</view>
		<view class="describe">
			<view class="row-describe row-flex">
				<text>复核意见:</text>
				<u-radio-group :value="uForm3Model.radioValue" @change="radio3Change" :disabled="uForm3State=='edit'">
					<u-radio key="S" label="通过" name="S"></u-radio>
					<u-radio key="C" label="不通过" name="C"></u-radio>
				</u-radio-group>
			</view>
			<view class="row-describe">
				<text>复核备注:</text>
				<u-textarea v-model="uForm3Model.fhRemark" :disabled="uForm3State=='edit'" placeholder="备注说明" ></u-textarea>
			</view>
		</view>
		
		<view class="btns sticky-bottom">
			<u-button type="info" text="取消" throttleTime="1000" @tap="uFormCancel"></u-button>
			<u-button type="warning" text="修改" throttleTime="1000" v-if="uForm3State=='edit'" @tap="uForm3Edit('edit')"></u-button>
			<u-button type="primary" text="提交" throttleTime="1000" v-else @tap="uForm3Edit('up')"></u-button>
		</view>
		
		<u-toast ref="uToast"></u-toast>
		
		
	</view>
</template>

<script>
	import {
		businessprepay,
		businessUploadImg
	} from "@/network/api.js";
	export default {
		props: {
			option: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				// 付款详情.....................................................
				uForm2Model:{
					paymoney: "",
					paydiffmoney: "",
					paydate: "",
					payway: "", 
					payaccount: "",
					payaccountname: "",
					payaccountopenbank: "",
					paymark: ""
				},
				uForm2Rules: {
					"paymoney": {
						type: "string",
						required: true,
						message: "请输入实付金额",
						trigger: ["blur", "change"]
					},
					"paydiffmoney": {
						type: "string",
						required: true,
						message: "请输入差异金额",
						trigger: ["blur", "change"]
					},
					"paydate": {
						type: "string",
						required: true,
						message: "请选择付款日期",
						trigger: ["blur", "change"]
					},
					"payway": {
						type: "string",
						required: true,
						message: "请选择付款方式",
						trigger: ["blur", "change"]
					},
					"payaccount": {
						type: "string",
						required: true,
						message: "请输入付款账号",
						trigger: ["blur", "change"]
					},
					"payaccountname": {
						type: "string",
						required: true,
						message: "请输入付款名称",
						trigger: ["blur", "change"]
					},
					"payaccountopenbank": {
						type: "string",
						required: true,
						message: "请输入开户银行",
						trigger: ["blur", "change"]
					}
				},
				paywayData:[],
				paywayShow: false,
				uForm2State:"",
				// 复核详情.....................................................
				uForm3Model:{
					radioValue: "",
					fhRemark: ""
				},
				uForm3State:"",
				// .......................
				detailData:"",
				ispda: uni.getStorageSync("pda"),
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
			}
		},
		mounted() {
			if(this.option.prepaystatus!="P"){
				this.uForm3State="edit"
			}
			this.detail(this.option.pid, "checkseldetail")
		},
		methods: {
			//复核...........................................................................
			detail(pid, vtypes) {
				let datas={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": vtypes,
					"item1": pid,
					"item2": uni.getStorageSync("userid")
				}
				businessprepay(datas).then(res => {
					console.log(vtypes+" res", res)
					if (res[0].result == "success") {
						this.detailData=res[0]
						this.detailData.linkmoney=Number(this.detailData.linkmoney).toFixed(2)
						this.detailData.applicationmoney=Number(this.detailData.applicationmoney).toFixed(2)
						this.detailData.capitalize=this.toCapitalize(this.detailData.applicationmoney)
						
						this.detailData.supplierwdkmoney=Number(this.detailData.supplierwdkmoney).toFixed(2)
						this.detailData.supplierwcddzmoney=Number(this.detailData.supplierwcddzmoney).toFixed(2)
						this.detailData.supplierwrzmoney=Number(this.detailData.supplierwrzmoney).toFixed(2)
						this.detailData.supplierkcemoney=Number(this.detailData.supplierkcemoney).toFixed(2)
						this.detailData.未结总金额=Number(this.detailData.supplierwcddzmoney)+Number(this.detailData.supplierwrzmoney)-Number(this.detailData.supplierwdkmoney)
						this.detailData.paymoney=Number(this.detailData.paymoney).toFixed(2)
						this.detailData.paydiffmoney=Number(this.detailData.paydiffmoney).toFixed(2)
						if(this.detailData.prepaystatus=="C"){
							this.uForm3Model.radioValue="C"
						}else{
							this.uForm3Model.radioValue="S"
						}
						this.uForm3Model.fhRemark=this.detailData.reviewckmark
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			radio3Change(event){
				this.uForm3Model.radioValue=event
			},
			uForm3Edit(type){
				if(type=="edit"){
					this.uForm3State=""
				}else{
					let datas={
						"access_token": uni.getStorageSync("access_token"),
						"vtype": "check",
						"item1": this.option.pid,
						"item2": this.uForm3Model.radioValue,
						"item3": uni.getStorageSync("userid"),
						"item4": uni.getStorageSync("userid"),
						"item5": this.uForm3Model.fhRemark
					}
					console.log("复核详情 datas",datas)
					businessprepay(datas).then(res => {
						console.log("复核详情 res",res)
						if(res[0].result=="0"){
							this.$refs.uToast.show({
								type: "success",
								message: "提交成功！"
							})
							setTimeout(()=>{
								this.uFormCancel()
							},1000)
						}else{
							this.$refs.uToast.show({
								type: "error",
								message: res[0].message
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			uFormCancel(){
				uni.navigateBack({
					delta: 1
				})
			},
			
			
		},
	}
</script>

<style lang="scss" scoped>
	
</style>
<style lang="scss">
	
</style>