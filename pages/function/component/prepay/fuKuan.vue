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
		<u-form labelPosition="left" :model="uForm2Model" :rules="uForm2Rules" ref="uForm2">
			<u-form-item label="实付金额:" :labelWidth="95" prop="paymoney" borderBottom>
				<u-input v-model="uForm2Model.paymoney" type="number" placeholder="转款实付金额" :disabled="uForm2State=='edit'" border="none" confirm-type="next" @confirm="focusNext('paydiffmoneyFocus')" :focus="focusObj2.paymoneyFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="差异金额:" :labelWidth="95" prop="paydiffmoney" borderBottom>
				<u-input v-model="uForm2Model.paydiffmoney" type="number" placeholder="申请与实付金额差异" :disabled="uForm2State=='edit'" border="none" confirm-type="next" @confirm="focusNext('paydate')" :focus="focusObj2.paydiffmoneyFocus"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="付款日期:" :labelWidth="95" prop="paydate" borderBottom>
				<uni-datetime-picker type="datetime" :border="false" ref="datetimePicker" v-model="uForm2Model.paydate" :disabled="uForm2State=='edit'" @change="datetimeChange"/>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="付款方式:" :labelWidth="95" prop="payway" borderBottom @tap="paywaySel(false)">
				<u-input v-model="uForm2Model.payway" disabled :disabledColor="uForm2State=='edit'?'#F5F7FA':'#fff'" placeholder="请选择付款方式" border="none"></u-input>
				<text slot="right" style="color:red;">*</text>
			</u-form-item>
			<u-form-item label="付款账号:" :labelWidth="95" prop="payaccount" borderBottom>
				<u-input v-model="uForm2Model.payaccount" placeholder="付款账号" :disabled="uForm2State=='edit'" border="none" confirm-type="next" @confirm="focusNext('payaccountnameFocus')" :focus="focusObj2.payaccountFocus"></u-input>
			</u-form-item>
			<u-form-item label="付款名称:" :labelWidth="95" prop="payaccountname" borderBottom>
				<u-input v-model="uForm2Model.payaccountname" placeholder="付款名称" :disabled="uForm2State=='edit'" border="none" confirm-type="next" @confirm="focusNext('payaccountopenbankFocus')" :focus="focusObj2.payaccountnameFocus"></u-input>
			</u-form-item>
			<u-form-item label="开户银行:" :labelWidth="95" prop="payaccountopenbank" borderBottom>
				<u-input v-model="uForm2Model.payaccountopenbank" placeholder="开户银行" :disabled="uForm2State=='edit'" border="none" confirm-type="next" @confirm="focusNext('paymarkFocus')" :focus="focusObj2.payaccountopenbankFocus"></u-input>
			</u-form-item>
			<u-form-item label="付款备注:" :labelWidth="95" prop="paymark" borderBottom>
				<u-input v-model="uForm2Model.paymark" placeholder="付款备注" :disabled="uForm2State=='edit'" border="none" confirm-type="go" :focus="focusObj2.paymarkFocus"></u-input>
			</u-form-item>
		
			<view class="image-title">
				<view class="text-black">
					<uni-icons type="cloud-upload-filled" size="20"></uni-icons>
					<text>上传附件图片</text>
					<text class="text-grey">(选填，最多可上传1张),</text>
					<text class="text-grey">{{imgList.length}}/1</text>
				</view>
			</view>
			<view class="filepicker">
				<mk-upload :sourceType="['camera','album']" :imgList="imgList" @onDelete="onDelete" @onChoose="onChoose" :maxChooseCount="1" :maxCount="1"/>
			</view>
		</u-form>
		<view class="btns sticky-bottom">
			<u-button type="info" text="取消" throttleTime="1000" @tap="uFormCancel"></u-button>
			<u-button type="warning" text="修改" throttleTime="1000" v-if="uForm2State=='edit'" @tap="uForm2Edit('edit')"></u-button>
			<u-button type="primary" text="提交" throttleTime="1000" v-else @tap="uForm2Edit('up')"></u-button>
		</view>
		
		<u-popup :show="paywayShow" mode="center" class="u-popup-center" :closeable="true" @close="paywayclose">
			<scroll-view style="max-height: 80vh;" scroll-y="true">
				<u-radio-group placement="column">
					<u-radio v-for="(v, i) in paywayData" @change="paywayChange" :key="v.paywayid" :name="v.paywayid+'-'+v.paywayname"
						:label="v.paywayid+'-'+v.paywayname">
					</u-radio>
				</u-radio-group>
			</scroll-view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
		
	</view>
</template>

<script>
	import {
		businessprepay,
		businessUploadImg
	} from "@/network/api.js";
	import mkupload from '@/components/mk-upload/mk-upload.vue';
	export default {
		components: {
			mkupload
		},
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
				// .......................
				imgList:[],
				uploadImgPath:"",
				detailData:"",
				ispda: uni.getStorageSync("pda"),
				focusObj2:{
					paymoneyFocus: false,
					paydiffmoneyFocus: false,
					payaccountFocus: false,
					payaccountnameFocus: false,
					payaccountopenbankFocus: false,
					paymarkFocus: false
				},
				fontStart: getApp().globalData.fontStart,
				fontEnd: getApp().globalData.fontEnd,
			}
		},
		mounted() {
			if(this.option.prepaystatus!="R"){
				this.uForm2State="edit"
			}else{
				this.focusObj2.paymoneyFocus=true
			}
			this.detail(this.option.pid, "payseldetail")
			this.paywaySel(true)
		},
		methods: {
			//付款...........................................................................
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
						
						if(this.option.prepaystatus!="R"){
							this.uForm2Model.paymoney=this.detailData.applicationmoney
							this.uForm2Model.paydiffmoney=Number(res[0].paydiffmoney).toFixed(2)
							this.uForm2Model.paydate=res[0].paydate
							this.uForm2Model.payway=res[0].payway
							this.uForm2Model.payaccount=res[0].payaccount
							this.uForm2Model.payaccountname=res[0].payaccountname
							this.uForm2Model.payaccountopenbank=res[0].payaccountopenbank
							this.uForm2Model.paymark=res[0].paymark
						}
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			datetimeChange(event){
				// console.log("日期时间 event",event)
				this.uForm2Model.paydate=event
				if(this.ispda){
					this.paywaySel(false)
				}
			},
			paywaySel(bol){
				if(this.uForm2State!="edit"){
					let dataes={
						"access_token": uni.getStorageSync("access_token"),
						"vtype": "paywaysel"
					}
					businessprepay(dataes).then(res => {
						// console.log("付款方式 res", res)
						if(res[0].result=="success"){
							if(bol){
								this.uForm2Model.payway=res[0].paywayid+"-"+res[0].paywayname
							}else{
								this.paywayData=res
								this.paywayShow=true
							}
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			paywayChange(event){
				this.uForm2Model.payway=event
				this.paywayShow=false
				if(this.ispda){
					this.focusObj2.payaccountFocus=true
				}
			},
			paywayclose(){
				this.paywayShow=false
			},
			uForm2Edit(type){
				if(type=="edit"){
					this.uForm2State=""
				}else{
					this.$refs.uForm2.validate().then(res => {
						let dataes={
							"access_token": uni.getStorageSync("access_token"),
							"vtype": "paydeal",
							"item1": this.option.pid,
							"item2": uni.getStorageSync("userid"),
							"item3": uni.getStorageSync("userid"),
							"item4": this.uForm2Model.paymoney,
							"item5": this.uForm2Model.paydate,
							"item6": this.uForm2Model.payway,
							"item7": this.uForm2Model.payaccount,
							"item8": this.uForm2Model.payaccountname,
							"item9": this.uForm2Model.payaccountopenbank,
							"item10": "",
							"item11": this.uploadImgPath,
							"item12": this.uForm2Model.paymark,
							"item13": this.uForm2Model.paydiffmoney,
						}
						console.log("付款详情 dataes",dataes)
						businessprepay(dataes).then(res => {
							console.log("付款详情 res",res)
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
					})
				}
			},
			// pda自动聚焦下一项
			focusNext(item){
				if(this.ispda){
					if(this.option.type=="payselall"){
						if(item=="paydate"){
							this.$refs.datetimePicker.show()
						}else{
							this.focusObj2[item]=true
						}
						
					}
				}
			},
			// 选择上传图片
			onDelete(index) {
				this.imgList.splice(index, 1);
			},
			onChoose(e) {
				var tempFilePaths = e.tempFilePaths;
				tempFilePaths.forEach((v,i,arr)=>{
					this.imgList.push(v);
					
				})
				uni.uploadFile({
					url: this.httpUrl+'/mzato/businessprepay/upload', //仅为示例，非真实的接口地址
					filePath: this.imgList[0],
					name: 'file',
					success: (uploadRes) => {
						let uploadResl=JSON.parse(uploadRes.data)
						// console.log("uploadResl",uploadResl)
						if(uploadResl[0].result=="success"){
							this.uploadImgPath= this.httpUrl+"/"+uploadResl[0].path
							this.$refs.uToast.show({
								type: "success",
								message: uploadResl[0].message
							})
							// console.log("上传的图片地址 this.uploadImgPath",this.uploadImgPath)
						}else{
							this.$refs.uToast.show({
								type: "error",
								message: uploadResl[0].message
							})
						}
					}
				});
			},
			uFormCancel(){
				uni.navigateBack({
					delta: 1
				})
			},
			
		},
		watch: {
			imgList: function(newv, oldv) {
				if(newv.length>1){
					this.imgList=this.imgList.splice(0,1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
<style lang="scss">
	
</style>