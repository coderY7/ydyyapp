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
				<text>{{detailData.预付款余额}}</text>
			</view>
			<view class="row-describe">
				<text>未结算金额:</text>
				<text>{{detailData.未结算金额}}(含总仓入库未转应付金额)</text>
			</view>
			<view class="row-describe">
				<text>直配未入账:</text>
				<text>{{detailData.直配未入账}}</text>
			</view>
			<view class="row-describe">
				<text>未结总金额:</text>
				<text>{{detailData.未结总金额}}</text>
			</view>
			<view class="row-describe">
				<text>应付结存额:</text>
				<text>{{detailData.应付结存额}}</text>
			</view>
			<view class="row-describe">
				<text>当前库存额:</text>
				<text>{{detailData.当前库存额}}</text>
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
			<view class="row-describe row-flex">
				<text>审核意见:</text>
				<u-radio-group :value="uForm1Model.radioValue" @change="radioChange2">
					<u-radio key="R" label="同意" name="R"></u-radio>
					<u-radio key="B" label="驳回" name="B"></u-radio>
				</u-radio-group>
			</view>
			<view class="row-describe">
				<text>审核备注:</text>
				<u-textarea v-model="uForm1Model.shRemark" placeholder="备注说明" ></u-textarea>
			</view>
		</view>
		
		<view class="btns sticky-bottom">
			<u-button type="info" text="取消" throttleTime="1000" @tap="uFormCancel"></u-button>
			<u-button type="primary" text="提交" throttleTime="1000" @tap="uForm1Edit"></u-button>
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
				// 审核详情.....................................................
				uForm1Model:{
					radioValue: "",
					shRemark: ""
				},
				
				// .......................
				detailData:"",
				ispda: uni.getStorageSync("pda"),
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
			}
		},
		mounted() {
			this.detail(this.option.pid, "reviewseldetail")
		},
		methods: {
			//审核...........................................................................
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
						if(this.detailData.prepaystatus=="B"){
							this.uForm1Model.radioValue="B"
						}else{
							this.uForm1Model.radioValue="R"
						}
						
						this.getsupdetailinfo(res[0].supplierid)
						this.getsupdetailinfo2(res[0].supplierid)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			radioChange2(event){
				this.uForm1Model.radioValue=event
			},
			uForm1Edit(){
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "review",
					"item1": this.option.pid,
					"item2": this.uForm1Model.radioValue,
					"item3": uni.getStorageSync("userid"),
					"item4": uni.getStorageSync("userid"),
					"item5": this.uForm1Model.shRemark,
					"item6": this.detailData.预付款余额,
					"item7": this.detailData.未结算金额,
					"item8": this.detailData.直配未入账,
					"item9": this.detailData.当前库存额
				}
				businessprepay(dataes).then(res => {
					// console.log("审核单上传 res", res)
					if(res[0].result=="success"){
						this.$refs.uToast.show({
							type: "success",
							message: res[0].message
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
			},
			getsupdetailinfo(supid){
				let datas= {
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "supplierpayinfo",
					"item1": supid
				}
				businessprepay(datas).then(res => {
					console.log("第二次数据 res",res)
					if(this.option.type=="reviewselall"){
						this.$set(this.detailData,"预付款余额",Number(res[0].预付款余额))
						this.$set(this.detailData,"未结算金额",Number(res[0].未结算金额))
						this.$set(this.detailData,"直配未入账",Number(res[0].直配未入账))
						this.$set(this.detailData,"当前库存额",Number(res[0].当前库存额))
						this.$set(this.detailData,"未结总金额",this.detailData.未结算金额+this.detailData.直配未入账-this.detailData.预付款余额)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			getsupdetailinfo2(supid){
				let datas={
					"access_token": uni.getStorageSync("access_token"),
					"vtype": "supplierpayinfo2",
					"item1": supid
				}
				businessprepay(datas).then(res => {
					// console.log("第二次数据2 res",res)
					if(this.option.type=="reviewselall"){
						this.$set(this.detailData,"应付结存额",Number(res[0].期末应付额).toFixed(2))
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			uFormCancel(){
				uni.navigateBack({
					delta: 1
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>